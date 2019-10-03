import { SourceFile, OptionalKind, MethodDeclarationStructure } from "ts-morph";
import { DMMF } from "@prisma/photon";

import {
  getBaseModelTypeName,
  getFieldTSType,
  getTypeGraphQLType,
  mapSchemaArgToParameterDeclaration,
} from "./helpers";
import { DMMFTypeInfo } from "./types";
import {
  baseKeys,
  ModelKeys,
  supportedMutations as supportedMutationActions,
  supportedQueries as supportedQueryActions,
} from "./config";

export default async function generateCrudResolverClassFromMapping(
  sourceFile: SourceFile,
  mapping: DMMF.Mapping,
  types: DMMF.OutputType[],
  modelNames: string[],
) {
  const modelName = getBaseModelTypeName(mapping.model);
  const actionNames = Object.keys(mapping).filter(
    key => !baseKeys.includes(key as any),
  ) as ModelKeys[];

  sourceFile.addClass({
    name: `${modelName}CrudResolver`,
    isExported: true,
    decorators: [
      {
        name: "Resolver",
        arguments: [`_of => ${modelName}`],
      },
    ],
    methods: actionNames
      .filter(actionName => getOperationKindName(actionName) !== undefined)
      .map<OptionalKind<MethodDeclarationStructure>>(actionName => {
        const operationKind = getOperationKindName(actionName)!;
        const fieldName = mapping[actionName];
        const type = types.find(type =>
          type.fields.some(field => field.name === fieldName),
        );
        if (!type) {
          throw new Error(
            `Cannot find type with field ${fieldName} in root types definitions!`,
          );
        }
        const method = type.fields.find(field => field.name === fieldName);
        if (!method) {
          throw new Error(
            `Cannot find field ${fieldName} in output types definitions!`,
          );
        }

        const returnTSType = getFieldTSType(
          method.outputType as DMMFTypeInfo,
          modelNames,
        );
        const argNames = method.args.map(arg => arg.name).join(", ");

        return {
          name: method.name,
          isAsync: true,
          returnType: `Promise<${returnTSType}>`,
          decorators: [
            {
              name: operationKind,
              arguments: [
                `_returns => ${getTypeGraphQLType(
                  method.outputType as DMMFTypeInfo,
                  modelNames,
                )}`,
                `{
                  nullable: ${!method.outputType.isRequired},
                  description: undefined
                }`,
              ],
            },
          ],
          parameters: [
            {
              name: "ctx",
              // TODO: import custom `ContextType`
              type: "any",
              decorators: [{ name: "Ctx", arguments: [] }],
            },
            ...method.args.map(arg =>
              // TODO: replace with arg classes
              mapSchemaArgToParameterDeclaration(arg, modelNames, true),
            ),
          ],
          statements: [
            `const args = { ${argNames} };`,
            `return ctx.photon.${mapping.plural}.${actionName}(args);`,
          ],
        };
      }),
  });
}

function getOperationKindName(actionName: string): string | undefined {
  if (supportedQueryActions.includes(actionName as any)) return "Query";
  if (supportedMutationActions.includes(actionName as any)) return "Mutation";
}

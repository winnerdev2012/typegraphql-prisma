import { OptionalKind, MethodDeclarationStructure, Project } from "ts-morph";
import { DMMF } from "@prisma/client/runtime";
import path from "path";

import {
  getBaseModelTypeName,
  getFieldTSType,
  getTypeGraphQLType,
  camelCase,
} from "./helpers";
import { DMMFTypeInfo, GeneratedResolverData } from "./types";
import {
  baseKeys,
  ModelKeys,
  supportedMutationActions,
  supportedQueryActions,
  resolversFolderName,
  crudResolversFolderName,
  argsFolderName,
} from "./config";
import generateArgsTypeClassFromArgs from "./args-class";
import {
  generateTypeGraphQLImports,
  generateArgsImports,
  generateModelsImports,
  generateOutputsImports,
  generateArgsBarrelFile,
} from "./imports";
import saveSourceFile from "../utils/saveSourceFile";
import generateActionResolverClass from "./action-resolver-class";

export default async function generateCrudResolverClassFromMapping(
  project: Project,
  baseDirPath: string,
  mapping: DMMF.Mapping,
  types: DMMF.OutputType[],
  modelNames: string[],
): Promise<GeneratedResolverData> {
  const modelName = getBaseModelTypeName(mapping.model);
  const resolverName = `${modelName}CrudResolver`;
  const collectionName = camelCase(mapping.model);

  const resolverDirPath = path.resolve(
    baseDirPath,
    resolversFolderName,
    crudResolversFolderName,
    modelName,
  );
  const filePath = path.resolve(resolverDirPath, `${resolverName}.ts`);
  const sourceFile = project.createSourceFile(filePath, undefined, {
    overwrite: true,
  });

  generateTypeGraphQLImports(sourceFile);

  const actionNames = Object.keys(mapping).filter(
    key => !baseKeys.includes(key as any),
  ) as ModelKeys[];

  const supportedActionNames = actionNames.filter(
    actionName => getOperationKindName(actionName) !== undefined,
  );

  const methodsInfo = await Promise.all(
    supportedActionNames.map(async actionName => {
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
      const outputTypeName = method.outputType.type as string;

      let argsTypeName: string | undefined;
      if (method.args.length > 0) {
        argsTypeName = await generateArgsTypeClassFromArgs(
          project,
          resolverDirPath,
          method.args,
          method.name,
          modelNames,
        );
      }

      return {
        operationKind,
        method,
        actionName,
        outputTypeName,
        argsTypeName,
      };
    }),
  );
  const argTypeNames = methodsInfo
    .filter(it => it.argsTypeName !== undefined)
    .map(it => it.argsTypeName!);

  if (argTypeNames.length) {
    const barrelExportSourceFile = project.createSourceFile(
      path.resolve(resolverDirPath, argsFolderName, "index.ts"),
      undefined,
      { overwrite: true },
    );
    generateArgsBarrelFile(
      barrelExportSourceFile,
      methodsInfo
        .filter(it => it.argsTypeName !== undefined)
        .map(it => it.argsTypeName!),
    );
    await saveSourceFile(barrelExportSourceFile);
  }

  generateArgsImports(sourceFile, argTypeNames, 0);

  const distinctOutputTypesNames = [
    ...new Set(methodsInfo.map(it => it.outputTypeName)),
  ];
  generateModelsImports(
    sourceFile,
    distinctOutputTypesNames.filter(typeName => modelNames.includes(typeName)),
    3,
  );
  generateOutputsImports(
    sourceFile,
    distinctOutputTypesNames.filter(typeName => !modelNames.includes(typeName)),
    2,
  );

  sourceFile.addClass({
    name: resolverName,
    isExported: true,
    decorators: [
      {
        name: "Resolver",
        arguments: [`_of => ${modelName}`],
      },
    ],
    methods: await Promise.all(
      methodsInfo.map<OptionalKind<MethodDeclarationStructure>>(
        ({ operationKind, actionName, method, argsTypeName }) => {
          const returnTSType = getFieldTSType(
            method.outputType as DMMFTypeInfo,
            modelNames,
          );

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
              ...(!argsTypeName
                ? []
                : [
                    {
                      name: "args",
                      type: argsTypeName,
                      decorators: [{ name: "Args", arguments: [] }],
                    },
                  ]),
            ],
            statements: [
              `return ctx.prisma.${collectionName}.${actionName}(${
                argsTypeName ? "args" : ""
              });`,
            ],
          };
        },
      ),
    ),
  });

  const actionResolverNames = await Promise.all(
    methodsInfo.map(
      ({ operationKind, actionName, method, outputTypeName, argsTypeName }) =>
        generateActionResolverClass(
          project,
          baseDirPath,
          modelName,
          operationKind,
          actionName,
          method,
          outputTypeName,
          argsTypeName,
          collectionName,
          modelNames,
        ),
    ),
  );

  await saveSourceFile(sourceFile);
  return { modelName, resolverName, actionResolverNames, argTypeNames };
}

function getOperationKindName(actionName: string): string | undefined {
  if (supportedQueryActions.includes(actionName as any)) return "Query";
  if (supportedMutationActions.includes(actionName as any)) return "Mutation";
}

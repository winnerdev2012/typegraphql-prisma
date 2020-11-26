import {
  PropertyDeclarationStructure,
  OptionalKind,
  Project,
  GetAccessorDeclarationStructure,
  SetAccessorDeclarationStructure,
} from "ts-morph";
import path from "path";

import { outputsFolderName, inputsFolderName } from "./config";
import {
  generateTypeGraphQLImport,
  generateInputsImports,
  generateEnumsImports,
  generateArgsImports,
  generateGraphQLScalarImport,
  generatePrismaJsonTypeImport,
  generateOutputsImports,
} from "./imports";
import { DmmfDocument } from "./dmmf/dmmf-document";
import { DMMF } from "./dmmf/types";
import { GenerateCodeOptions } from "./options";

export function generateOutputTypeClassFromType(
  project: Project,
  dirPath: string,
  type: DMMF.OutputType,
  dmmfDocument: DmmfDocument,
) {
  const fileDirPath = path.resolve(dirPath, outputsFolderName);
  const filePath = path.resolve(fileDirPath, `${type.typeName}.ts`);
  const sourceFile = project.createSourceFile(filePath, undefined, {
    overwrite: true,
  });
  const fieldArgsTypeNames = type.fields
    .filter(it => it.argsTypeName)
    .map(it => it.argsTypeName!);
  const isAggregateOutputType = type.name.includes("Aggregate");

  generateTypeGraphQLImport(sourceFile);
  generateGraphQLScalarImport(sourceFile);
  generatePrismaJsonTypeImport(sourceFile, dmmfDocument.options, 2);
  generateArgsImports(sourceFile, fieldArgsTypeNames, 0);
  generateOutputsImports(
    sourceFile,
    type.fields
      .filter(field => field.outputType.location === "outputObjectTypes")
      .map(field => field.outputType.type),
    1,
  );

  sourceFile.addClass({
    name: type.typeName,
    isExported: true,
    decorators: [
      {
        name: "TypeGraphQL.ObjectType",
        arguments: [
          `{
            isAbstract: true,
            description: undefined,
            simpleResolvers: ${
              dmmfDocument.options.simpleResolvers ? "true" : "undefined"
            },
          }`,
        ],
      },
    ],
    properties: type.fields.map<OptionalKind<PropertyDeclarationStructure>>(
      field => {
        // workaround for non-optional aggregate result fields in Prisma Client
        const isOptional = isAggregateOutputType ? false : !field.isRequired;
        return {
          name: field.name,
          type: field.fieldTSType,
          hasExclamationToken: !isOptional,
          hasQuestionToken: isOptional,
          trailingTrivia: "\r\n",
          decorators: [
            {
              name: "TypeGraphQL.Field",
              arguments: [
                `_type => ${field.typeGraphQLType}`,
                `{
                  nullable: ${!field.isRequired},
                  description: undefined
                }`,
              ],
            },
          ],
        };
      },
    ),
  });
}

export function generateInputTypeClassFromType(
  project: Project,
  dirPath: string,
  inputType: DMMF.InputType,
  _dmmfDocument: DmmfDocument,
  options: GenerateCodeOptions,
) {
  const filePath = path.resolve(
    dirPath,
    inputsFolderName,
    `${inputType.typeName}.ts`,
  );
  const sourceFile = project.createSourceFile(filePath, undefined, {
    overwrite: true,
  });

  generateTypeGraphQLImport(sourceFile);
  generateGraphQLScalarImport(sourceFile);
  generatePrismaJsonTypeImport(sourceFile, options, 2);
  generateInputsImports(
    sourceFile,
    inputType.fields
      .filter(field => field.selectedInputType.location === "inputObjectTypes")
      .map(field => field.selectedInputType.type)
      .filter(fieldType => fieldType !== inputType.typeName),
  );
  generateEnumsImports(
    sourceFile,
    inputType.fields
      .map(field => field.selectedInputType)
      .filter(fieldType => fieldType.location === "enumTypes")
      .map(fieldType => fieldType.type as string),
    2,
  );

  const mappedFields = inputType.fields.filter(field => field.hasMappedName);

  sourceFile.addClass({
    name: inputType.typeName,
    isExported: true,
    decorators: [
      {
        name: "TypeGraphQL.InputType",
        arguments: [
          `{
            isAbstract: true,
            description: undefined,
          }`,
        ],
      },
    ],
    properties: inputType.fields.map<
      OptionalKind<PropertyDeclarationStructure>
    >(field => {
      return {
        name: field.name,
        type: field.fieldTSType,
        hasExclamationToken: !!field.isRequired,
        hasQuestionToken: !field.isRequired,
        trailingTrivia: "\r\n",
        decorators: field.hasMappedName
          ? []
          : [
              {
                name: "TypeGraphQL.Field",
                arguments: [
                  `_type => ${field.typeGraphQLType}`,
                  `{
                      nullable: ${!field.isRequired},
                      description: undefined
                    }`,
                ],
              },
            ],
      };
    }),
    getAccessors: mappedFields.map<
      OptionalKind<GetAccessorDeclarationStructure>
    >(field => {
      return {
        name: field.typeName,
        type: field.fieldTSType,
        hasExclamationToken: field.isRequired,
        hasQuestionToken: !field.isRequired,
        trailingTrivia: "\r\n",
        statements: [`return this.${field.name};`],
        decorators: [
          {
            name: "TypeGraphQL.Field",
            arguments: [
              `_type => ${field.typeGraphQLType}`,
              `{
                  nullable: ${!field.isRequired},
                  description: undefined
                }`,
            ],
          },
        ],
      };
    }),
    setAccessors: mappedFields.map<
      OptionalKind<SetAccessorDeclarationStructure>
    >(field => {
      return {
        name: field.typeName,
        type: field.fieldTSType,
        hasExclamationToken: field.isRequired,
        hasQuestionToken: !field.isRequired,
        trailingTrivia: "\r\n",
        parameters: [{ name: field.name, type: field.fieldTSType }],
        statements: [`this.${field.name} = ${field.name};`],
      };
    }),
  });
}

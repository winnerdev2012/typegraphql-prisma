import { DMMF } from "@prisma/client/runtime/dmmf-types";

import { DMMFTypeInfo } from "./types";
import { ModelKeys } from "./config";

export function noop() {}

export function getBaseModelTypeName(modelName: string) {
  // TODO: add proper support for swapping model types with custom types
  // return `Base${modelName}`;
  return modelName;
}

export function getFieldTSType(typeInfo: DMMFTypeInfo, modelNames: string[]) {
  let TSType: string;
  if (typeInfo.kind === "scalar") {
    TSType = mapScalarToTSType(typeInfo.type);
  } else if (typeInfo.kind === "object") {
    if (modelNames.includes(typeInfo.type)) {
      TSType = getBaseModelTypeName(typeInfo.type);
    } else {
      TSType = typeInfo.type;
    }
  } else if (typeInfo.kind === "enum") {
    TSType = `keyof typeof ${typeInfo.type}`;
  } else {
    throw new Error(`Unsupported field type kind: ${typeInfo.kind}`);
  }
  if (typeInfo.isList) {
    if (TSType.includes(" ")) {
      TSType = `Array<${TSType}>`;
    } else {
      TSType += "[]";
    }
  }
  if (!typeInfo.isRequired) {
    TSType += " | null";
  }
  return TSType;
}

export function mapScalarToTSType(scalar: string) {
  switch (scalar) {
    case "ID":
    case "UUID": {
      return "string";
    }
    case "String": {
      return "string";
    }
    case "Boolean": {
      return "boolean";
    }
    case "DateTime": {
      return "Date";
    }
    case "Int":
    case "Float": {
      return "number";
    }
    default:
      throw new Error(`Unrecognized scalar type: ${scalar}`);
  }
}

export function getTypeGraphQLType(
  typeInfo: DMMFTypeInfo,
  modelNames: string[],
) {
  let GraphQLType: string;
  if (typeInfo.kind === "scalar") {
    GraphQLType = mapScalarToTypeGraphQLType(typeInfo.type);
  } else if (typeInfo.kind === "object") {
    if (modelNames.includes(typeInfo.type)) {
      GraphQLType = getBaseModelTypeName(typeInfo.type);
    } else {
      GraphQLType = typeInfo.type;
    }
  } else {
    GraphQLType = typeInfo.type;
  }
  if (typeInfo.isList) {
    GraphQLType = `[${GraphQLType}]`;
  }
  return GraphQLType;
}

export function mapScalarToTypeGraphQLType(scalar: string) {
  switch (scalar) {
    case "DateTime": {
      return "Date";
    }
    // TODO: use proper uuid graphql scalar
    case "UUID": {
      return "String";
    }
    case "Boolean":
    case "String": {
      return scalar;
    }
    case "ID":
    case "Int":
    case "Float": {
      return `TypeGraphQL.${scalar}`;
    }
    default: {
      throw new Error(`Unrecognized scalar type: ${scalar}`);
    }
  }
}

export function selectInputTypeFromTypes(
  inputTypes: DMMF.SchemaArgInputType[],
): DMMF.SchemaArgInputType {
  return (
    inputTypes.find(it => it.kind === "object") ||
    inputTypes.find(it => it.kind === "enum") ||
    inputTypes[0]
  );
}

export function camelCase(str: string) {
  return str[0].toLowerCase() + str.slice(1);
}

export function pascalCase(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

export function getMappedActionName(
  actionName: ModelKeys,
  methodName: string,
  mapping: DMMF.Mapping,
): string {
  switch (actionName) {
    case "findOne": {
      return camelCase(mapping.model);
    }
    case "findMany": {
      return camelCase(mapping.plural);
    }
    default: {
      return methodName;
    }
  }
}

const attributeRegex = /(@@TypeGraphQL\.)+([A-z])+(\(")+([A-z])+("\))+/;
const attributeArgsRegex = /(?:\(")+([A-Za-z])+(?:"\))+/;
const attributeKindRegex = /(?:\.)+([A-Za-z])+(?:\()+/;

export function parseDocumentationAttributes(
  documentation: string | undefined,
  expectedAttributeKind: string,
) {
  const attribute = documentation?.match(attributeRegex)?.[0];
  const attributeKind = attribute?.match(attributeKindRegex)?.[0]?.slice(1, -1);
  if (attributeKind !== expectedAttributeKind) {
    return;
  }
  const attributeArgs = attribute?.match(attributeArgsRegex)?.[0]?.slice(1, -1);
  return attributeArgs;
}

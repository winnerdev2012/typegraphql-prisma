import { DMMF } from "@prisma/client/runtime/dmmf-types";

export type BaseKeys = keyof Pick<DMMF.Mapping, "model" | "plural">;
export const baseKeys: BaseKeys[] = ["model", "plural"];

export type ModelKeys = keyof Exclude<DMMF.Mapping, BaseKeys>;

export type SupportedQueries = keyof Pick<
  DMMF.Mapping,
  "findOne" | "findMany"
  // TODO: uncomment when dmmf update aggregate details
  // "findOne" | "findMany" | "aggregate"
>;
export const supportedQueryActions: SupportedQueries[] = [
  "findOne",
  "findMany",
  // TODO: uncomment when dmmf update aggregate details
  // "aggregate",
];

export type SupportedMutations = keyof Pick<
  DMMF.Mapping,
  "create" | "delete" | "update" | "deleteMany" | "updateMany" | "upsert"
>;
export const supportedMutationActions: SupportedMutations[] = [
  "create",
  "delete",
  "update",
  "deleteMany",
  "updateMany",
  "upsert",
];

export const modelsFolderName = "models";
export const enumsFolderName = "enums";
export const inputsFolderName = "inputs";
export const outputsFolderName = "outputs";
export const resolversFolderName = "resolvers";
export const argsFolderName = "args";
export const relationsResolversFolderName = "relations";
export const crudResolversFolderName = "crud";

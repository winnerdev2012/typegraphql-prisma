import { EnumMemberStructure, OptionalKind, SourceFile } from "ts-morph";
import { DMMF } from "@prisma/photon/dist/runtime/dmmf-types";

export default async function generateEnum(
  sourceFile: SourceFile,
  enumDef: DMMF.Enum,
) {
  const documentation =
    enumDef.documentation && enumDef.documentation.replace("\r", "");
  sourceFile.addEnum({
    isExported: true,
    name: enumDef.name,
    ...(documentation && {
      docs: [{ description: documentation }],
    }),
    members: enumDef.values.map<OptionalKind<EnumMemberStructure>>(
      enumValue => ({
        name: enumValue,
        // TODO: add support for string enums (values)
        // TODO: add support for enum members docs
      }),
    ),
  });

  sourceFile.addStatements([
    `registerEnumType(${enumDef.name}, {
      name: "${enumDef.name}",
      description: ${documentation ? `"${documentation}"` : "undefined"},
    })`,
  ]);
}

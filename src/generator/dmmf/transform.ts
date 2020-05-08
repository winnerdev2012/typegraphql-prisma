import { DMMF as PrismaDMMF } from "@prisma/client/runtime/dmmf-types";
import { DMMF } from "./types";
import { parseDocumentationAttributes } from "./helpers";

export function transformDatamodel(
  datamodel: PrismaDMMF.Datamodel,
): DMMF.Datamodel {
  return {
    enums: datamodel.enums,
    models: datamodel.models.map(transformModel),
  };
}

function transformModel(model: PrismaDMMF.Model): DMMF.Model {
  const attributeArgs = parseDocumentationAttributes(
    model.documentation,
    "type",
  );
  const typeName = attributeArgs?.slice(1, -1);
  return {
    ...model,
    typeName: typeName ?? model.name,
  };
}

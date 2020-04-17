import * as TypeGraphQL from "type-graphql";
import { SlugNumberCompoundUniqueInput } from "../inputs/SlugNumberCompoundUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class CategoryWhereUniqueInput {
  @TypeGraphQL.Field(_type => SlugNumberCompoundUniqueInput, {
    nullable: true,
    description: undefined
  })
  slug_number?: SlugNumberCompoundUniqueInput | null;
}

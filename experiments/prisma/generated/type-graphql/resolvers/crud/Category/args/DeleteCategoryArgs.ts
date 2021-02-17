import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CategoryWhereUniqueInput } from "../../../inputs/CategoryWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteCategoryArgs {
  @TypeGraphQL.Field(_type => CategoryWhereUniqueInput, {
    nullable: false
  })
  where!: CategoryWhereUniqueInput;
}

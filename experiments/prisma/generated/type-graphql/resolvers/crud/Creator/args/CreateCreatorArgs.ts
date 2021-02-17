import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CreatorCreateInput } from "../../../inputs/CreatorCreateInput";

@TypeGraphQL.ArgsType()
export class CreateCreatorArgs {
  @TypeGraphQL.Field(_type => CreatorCreateInput, {
    nullable: false
  })
  data!: CreatorCreateInput;
}

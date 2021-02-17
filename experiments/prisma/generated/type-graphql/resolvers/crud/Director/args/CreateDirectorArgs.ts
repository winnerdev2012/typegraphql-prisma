import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { DirectorCreateInput } from "../../../inputs/DirectorCreateInput";

@TypeGraphQL.ArgsType()
export class CreateDirectorArgs {
  @TypeGraphQL.Field(_type => DirectorCreateInput, {
    nullable: false
  })
  data!: DirectorCreateInput;
}

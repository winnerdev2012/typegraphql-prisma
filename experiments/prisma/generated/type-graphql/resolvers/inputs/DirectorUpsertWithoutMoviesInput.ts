import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "../../../client";
import { DirectorCreateWithoutMoviesInput } from "../inputs/DirectorCreateWithoutMoviesInput";
import { DirectorUpdateWithoutMoviesDataInput } from "../inputs/DirectorUpdateWithoutMoviesDataInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class DirectorUpsertWithoutMoviesInput {
  @TypeGraphQL.Field(_type => DirectorUpdateWithoutMoviesDataInput, {
    nullable: false,
    description: undefined
  })
  update!: DirectorUpdateWithoutMoviesDataInput;

  @TypeGraphQL.Field(_type => DirectorCreateWithoutMoviesInput, {
    nullable: false,
    description: undefined
  })
  create!: DirectorCreateWithoutMoviesInput;
}

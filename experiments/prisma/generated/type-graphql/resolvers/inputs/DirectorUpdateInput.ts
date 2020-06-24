import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "../../../client";
import { MovieUpdateManyWithoutDirectorInput } from "../inputs/MovieUpdateManyWithoutDirectorInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class DirectorUpdateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  firstName?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  lastName?: string | undefined;

  @TypeGraphQL.Field(_type => MovieUpdateManyWithoutDirectorInput, {
    nullable: true,
    description: undefined
  })
  movies?: MovieUpdateManyWithoutDirectorInput | undefined;
}

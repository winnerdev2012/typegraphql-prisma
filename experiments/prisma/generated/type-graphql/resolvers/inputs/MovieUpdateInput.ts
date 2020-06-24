import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "../../../client";
import { DirectorUpdateOneRequiredWithoutMoviesInput } from "../inputs/DirectorUpdateOneRequiredWithoutMoviesInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class MovieUpdateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  title?: string | undefined;

  @TypeGraphQL.Field(_type => DirectorUpdateOneRequiredWithoutMoviesInput, {
    nullable: true,
    description: undefined
  })
  director?: DirectorUpdateOneRequiredWithoutMoviesInput | undefined;
}

import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "../../../client";
import { PostKind } from "../../enums/PostKind";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class NullablePostKindFilter {
  @TypeGraphQL.Field(_type => PostKind, {
    nullable: true,
    description: undefined
  })
  equals?: keyof typeof PostKind | undefined;

  @TypeGraphQL.Field(_type => PostKind, {
    nullable: true,
    description: undefined
  })
  not?: keyof typeof PostKind | undefined;

  @TypeGraphQL.Field(_type => [PostKind], {
    nullable: true,
    description: undefined
  })
  in?: Array<keyof typeof PostKind> | undefined;

  @TypeGraphQL.Field(_type => [PostKind], {
    nullable: true,
    description: undefined
  })
  notIn?: Array<keyof typeof PostKind> | undefined;
}

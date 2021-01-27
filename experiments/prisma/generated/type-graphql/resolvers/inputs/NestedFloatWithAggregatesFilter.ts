import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "../../../client";
import { NestedFloatFilter } from "../inputs/NestedFloatFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class NestedFloatWithAggregatesFilter {
  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  equals?: number | undefined;

  @TypeGraphQL.Field(_type => [TypeGraphQL.Float], {
    nullable: true
  })
  in?: number[] | undefined;

  @TypeGraphQL.Field(_type => [TypeGraphQL.Float], {
    nullable: true
  })
  notIn?: number[] | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  lt?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  lte?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  gt?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  gte?: number | undefined;

  @TypeGraphQL.Field(_type => NestedFloatWithAggregatesFilter, {
    nullable: true
  })
  not?: NestedFloatWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => NestedIntFilter, {
    nullable: true
  })
  count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field(_type => NestedFloatFilter, {
    nullable: true
  })
  avg?: NestedFloatFilter | undefined;

  @TypeGraphQL.Field(_type => NestedFloatFilter, {
    nullable: true
  })
  sum?: NestedFloatFilter | undefined;

  @TypeGraphQL.Field(_type => NestedFloatFilter, {
    nullable: true
  })
  min?: NestedFloatFilter | undefined;

  @TypeGraphQL.Field(_type => NestedFloatFilter, {
    nullable: true
  })
  max?: NestedFloatFilter | undefined;
}

import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "../../../client";
import { CreatorAvgAggregate } from "../outputs/CreatorAvgAggregate";
import { CreatorCountAggregate } from "../outputs/CreatorCountAggregate";
import { CreatorMaxAggregate } from "../outputs/CreatorMaxAggregate";
import { CreatorMinAggregate } from "../outputs/CreatorMinAggregate";
import { CreatorSumAggregate } from "../outputs/CreatorSumAggregate";

@TypeGraphQL.ObjectType({
  isAbstract: true
})
export class AggregateCreator {
  @TypeGraphQL.Field(_type => CreatorCountAggregate, {
    nullable: true
  })
  count!: CreatorCountAggregate | null;

  @TypeGraphQL.Field(_type => CreatorAvgAggregate, {
    nullable: true
  })
  avg!: CreatorAvgAggregate | null;

  @TypeGraphQL.Field(_type => CreatorSumAggregate, {
    nullable: true
  })
  sum!: CreatorSumAggregate | null;

  @TypeGraphQL.Field(_type => CreatorMinAggregate, {
    nullable: true
  })
  min!: CreatorMinAggregate | null;

  @TypeGraphQL.Field(_type => CreatorMaxAggregate, {
    nullable: true
  })
  max!: CreatorMaxAggregate | null;
}

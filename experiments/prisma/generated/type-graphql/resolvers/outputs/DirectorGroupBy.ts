import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "../../../client";
import { DirectorCountAggregate } from "../outputs/DirectorCountAggregate";
import { DirectorMaxAggregate } from "../outputs/DirectorMaxAggregate";
import { DirectorMinAggregate } from "../outputs/DirectorMinAggregate";

@TypeGraphQL.ObjectType({
  isAbstract: true
})
export class DirectorGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  firstName!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  lastName!: string;

  @TypeGraphQL.Field(_type => DirectorCountAggregate, {
    nullable: true
  })
  count?: DirectorCountAggregate | null;

  @TypeGraphQL.Field(_type => DirectorMinAggregate, {
    nullable: true
  })
  min?: DirectorMinAggregate | null;

  @TypeGraphQL.Field(_type => DirectorMaxAggregate, {
    nullable: true
  })
  max?: DirectorMaxAggregate | null;
}

import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "../../../client";
import { CreatorOrderByInput } from "../inputs/CreatorOrderByInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ProblemOrderByInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  problemText?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => CreatorOrderByInput, {
    nullable: true
  })
  creator?: CreatorOrderByInput | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  creatorId?: "asc" | "desc" | undefined;
}

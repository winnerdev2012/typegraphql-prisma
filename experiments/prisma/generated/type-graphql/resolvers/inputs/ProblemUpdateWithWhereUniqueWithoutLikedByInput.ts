import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "../../../client";
import { ProblemUncheckedUpdateWithoutLikedByInput } from "../inputs/ProblemUncheckedUpdateWithoutLikedByInput";
import { ProblemWhereUniqueInput } from "../inputs/ProblemWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ProblemUpdateWithWhereUniqueWithoutLikedByInput {
  @TypeGraphQL.Field(_type => ProblemWhereUniqueInput, {
    nullable: false
  })
  where!: ProblemWhereUniqueInput;

  @TypeGraphQL.Field(_type => ProblemUncheckedUpdateWithoutLikedByInput, {
    nullable: false
  })
  data!: ProblemUncheckedUpdateWithoutLikedByInput;
}

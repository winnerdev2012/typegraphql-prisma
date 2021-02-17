import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProblemWhereUniqueInput } from "../../../inputs/ProblemWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueProblemArgs {
  @TypeGraphQL.Field(_type => ProblemWhereUniqueInput, {
    nullable: false
  })
  where!: ProblemWhereUniqueInput;
}

import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "../../../client";
import { ProblemCreateManyCreatorInputEnvelope } from "../inputs/ProblemCreateManyCreatorInputEnvelope";
import { ProblemCreateOrConnectWithoutcreatorInput } from "../inputs/ProblemCreateOrConnectWithoutcreatorInput";
import { ProblemCreateWithoutCreatorInput } from "../inputs/ProblemCreateWithoutCreatorInput";
import { ProblemWhereUniqueInput } from "../inputs/ProblemWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ProblemCreateNestedManyWithoutCreatorInput {
  @TypeGraphQL.Field(_type => [ProblemCreateWithoutCreatorInput], {
    nullable: true
  })
  create?: ProblemCreateWithoutCreatorInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProblemCreateOrConnectWithoutcreatorInput], {
    nullable: true
  })
  connectOrCreate?: ProblemCreateOrConnectWithoutcreatorInput[] | undefined;

  @TypeGraphQL.Field(_type => ProblemCreateManyCreatorInputEnvelope, {
    nullable: true
  })
  createMany?: ProblemCreateManyCreatorInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [ProblemWhereUniqueInput], {
    nullable: true
  })
  connect?: ProblemWhereUniqueInput[] | undefined;
}

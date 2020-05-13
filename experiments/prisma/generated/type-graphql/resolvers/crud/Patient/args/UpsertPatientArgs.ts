import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { PatientCreateInput } from "../../../inputs/PatientCreateInput";
import { PatientUpdateInput } from "../../../inputs/PatientUpdateInput";
import { PatientWhereUniqueInput } from "../../../inputs/PatientWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertPatientArgs {
  @TypeGraphQL.Field(_type => PatientWhereUniqueInput, { nullable: false })
  where!: PatientWhereUniqueInput;

  @TypeGraphQL.Field(_type => PatientCreateInput, { nullable: false })
  create!: PatientCreateInput;

  @TypeGraphQL.Field(_type => PatientUpdateInput, { nullable: false })
  update!: PatientUpdateInput;
}

import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "../../../client";
import { MovieListRelationFilter } from "../inputs/MovieListRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class DirectorWhereInput {
  @TypeGraphQL.Field(_type => [DirectorWhereInput], {
    nullable: true
  })
  AND?: DirectorWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [DirectorWhereInput], {
    nullable: true
  })
  OR?: DirectorWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [DirectorWhereInput], {
    nullable: true
  })
  NOT?: DirectorWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  firstName?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  lastName?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => MovieListRelationFilter, {
    nullable: true
  })
  movies?: MovieListRelationFilter | undefined;
}

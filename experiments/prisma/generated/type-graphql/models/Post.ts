import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "../../client";
import { Client } from "../models/Client";
import { PostKind } from "../enums/PostKind";

@TypeGraphQL.ObjectType({
  isAbstract: true
})
export class Post {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  uuid!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  published!: boolean;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  title!: string;

  subtitle?: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  content?: string | null;

  author?: Client;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  authorId!: number;

  editor?: Client | null;

  editorId?: number | null;

  @TypeGraphQL.Field(_type => PostKind, {
    nullable: true
  })
  kind?: "BLOG" | "ADVERT" | null;

  @TypeGraphQL.Field(_type => GraphQLJSON, {
    nullable: false
  })
  metadata!: Prisma.JsonValue;
}

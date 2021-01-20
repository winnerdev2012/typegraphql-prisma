import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "../../../client";
import { PostCreateManyWithoutAuthorInput } from "../inputs/PostCreateManyWithoutAuthorInput";
import { Role } from "../../enums/Role";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ClientCreateWithoutEditorPostsInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  email!: string;

  name?: string | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  age!: number;

  balance!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  amount!: number;

  @TypeGraphQL.Field(_type => Role, {
    nullable: false
  })
  role!: "USER" | "ADMIN";

  posts?: PostCreateManyWithoutAuthorInput | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  get firstName() {
    return this.name;
  }

  set firstName(name: string | undefined) {
    this.name = name;
  }

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  get accountBalance() {
    return this.balance;
  }

  set accountBalance(balance: number) {
    this.balance = balance;
  }

  @TypeGraphQL.Field(_type => PostCreateManyWithoutAuthorInput, {
    nullable: true
  })
  get clientPosts() {
    return this.posts;
  }

  set clientPosts(posts: PostCreateManyWithoutAuthorInput | undefined) {
    this.posts = posts;
  }
}

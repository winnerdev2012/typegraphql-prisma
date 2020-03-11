import "reflect-metadata";
import {
  // ObjectType,
  Resolver,
  Query,
  buildSchema,
  FieldResolver,
  Ctx,
} from "type-graphql";
import { ApolloServer } from "apollo-server";
import path from "path";

import {
  User,
  // User as BaseUser,
  UserRelationsResolver,
  UserCrudResolver,
  Post,
  // Post as BasePost,
  PostRelationsResolver,
  FindOnePostResolver,
  CreateOnePostResolver,
  UpdateManyPostResolver,
  // Category,
  CategoryCrudResolver,
  // Patient,
  PatientCrudResolver,
} from "./prisma/generated/type-graphql";
import { PrismaClient } from "./prisma/generated/client";

// @ObjectType()
// class User extends BaseUser {}

// @ObjectType()
// class Post extends BasePost {}

interface Context {
  prisma: PrismaClient;
}

@Resolver(of => User)
class UserResolver {
  @Query(returns => [User])
  async allUsers(@Ctx() { prisma }: Context): Promise<User[]> {
    return prisma.user.findMany();
  }

  @FieldResolver()
  hello(): string {
    return "world!";
  }
}

@Resolver(of => Post)
class PostResolver {
  @Query(returns => [Post])
  async allPosts(@Ctx() { prisma }: Context): Promise<Post[]> {
    return prisma.post.findMany();
  }
}

async function main() {
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      UserRelationsResolver,
      UserCrudResolver,
      PostResolver,
      PostRelationsResolver,
      FindOnePostResolver,
      CreateOnePostResolver,
      UpdateManyPostResolver,
      CategoryCrudResolver,
      PatientCrudResolver,
    ],
    validate: false,
    emitSchemaFile: path.resolve(__dirname, "./generated-schema.graphql"),
  });

  const prisma = new PrismaClient({
    // see dataloader for relations in action
    log: ["query"],
  });

  const server = new ApolloServer({
    schema,
    playground: true,
    context: (): Context => ({ prisma }),
  });
  const { port } = await server.listen(4000);
  console.log(`GraphQL is listening on ${port}!`);
}

main().catch(console.error);

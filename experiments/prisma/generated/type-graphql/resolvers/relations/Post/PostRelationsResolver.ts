import * as TypeGraphQL from "type-graphql";
import { Client } from "../../../models/Client";
import { Post } from "../../../models/Post";

@TypeGraphQL.Resolver(_of => Post)
export class PostRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Client, {
    nullable: false
  })
  async author(@TypeGraphQL.Root() post: Post, @TypeGraphQL.Ctx() ctx: any): Promise<Client> {
    return ctx.prisma.post.findUnique({
      where: {
        uuid: post.uuid,
      },
    }).author({});
  }
}

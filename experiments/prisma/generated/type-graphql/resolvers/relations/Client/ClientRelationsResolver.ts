import * as TypeGraphQL from "type-graphql";
import { Client } from "../../../models/Client";
import { Post } from "../../../models/Post";
import { ClientPostsArgs } from "./args/ClientPostsArgs";

@TypeGraphQL.Resolver(_of => Client)
export class ClientRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [Post], {
    nullable: true,
    description: undefined,
  })
  async clientPosts(@TypeGraphQL.Root() client: Client, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: ClientPostsArgs): Promise<Post[] | undefined> {
    return ctx.prisma.user.findOne({
      where: {
        id: client.id,
      },
    }).posts(args);
  }
}

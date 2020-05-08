import * as TypeGraphQL from "type-graphql";
import { UpdateDirectorArgs } from "./args/UpdateDirectorArgs";
import { Director } from "../../../models/Director";

@TypeGraphQL.Resolver(_of => Director)
export class UpdateDirectorResolver {
  @TypeGraphQL.Mutation(_returns => Director, {
    nullable: true,
    description: undefined
  })
  async updateDirector(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateDirectorArgs): Promise<Director | null> {
    return ctx.prisma.director.update(args);
  }
}

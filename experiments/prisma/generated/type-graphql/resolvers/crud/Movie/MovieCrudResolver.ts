import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateMovieArgs } from "./args/AggregateMovieArgs";
import { CreateMovieArgs } from "./args/CreateMovieArgs";
import { DeleteManyMovieArgs } from "./args/DeleteManyMovieArgs";
import { DeleteMovieArgs } from "./args/DeleteMovieArgs";
import { FindFirstMovieArgs } from "./args/FindFirstMovieArgs";
import { FindManyMovieArgs } from "./args/FindManyMovieArgs";
import { FindUniqueMovieArgs } from "./args/FindUniqueMovieArgs";
import { GroupByMovieArgs } from "./args/GroupByMovieArgs";
import { UpdateManyMovieArgs } from "./args/UpdateManyMovieArgs";
import { UpdateMovieArgs } from "./args/UpdateMovieArgs";
import { UpsertMovieArgs } from "./args/UpsertMovieArgs";
import { Movie } from "../../../models/Movie";
import { AggregateMovie } from "../../outputs/AggregateMovie";
import { BatchPayload } from "../../outputs/BatchPayload";
import { MovieGroupBy } from "../../outputs/MovieGroupBy";

@TypeGraphQL.Resolver(_of => Movie)
export class MovieCrudResolver {
  @TypeGraphQL.Query(_returns => Movie, {
    nullable: true
  })
  async movie(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueMovieArgs): Promise<Movie | null> {
    return ctx.prisma.movie.findUnique(args);
  }

  @TypeGraphQL.Query(_returns => Movie, {
    nullable: true
  })
  async findFirstMovie(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstMovieArgs): Promise<Movie | null> {
    return ctx.prisma.movie.findFirst(args);
  }

  @TypeGraphQL.Query(_returns => [Movie], {
    nullable: false
  })
  async movies(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyMovieArgs): Promise<Movie[]> {
    return ctx.prisma.movie.findMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Movie, {
    nullable: false
  })
  async createMovie(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateMovieArgs): Promise<Movie> {
    return ctx.prisma.movie.create(args);
  }

  @TypeGraphQL.Mutation(_returns => Movie, {
    nullable: true
  })
  async deleteMovie(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteMovieArgs): Promise<Movie | null> {
    return ctx.prisma.movie.delete(args);
  }

  @TypeGraphQL.Mutation(_returns => Movie, {
    nullable: true
  })
  async updateMovie(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateMovieArgs): Promise<Movie | null> {
    return ctx.prisma.movie.update(args);
  }

  @TypeGraphQL.Mutation(_returns => BatchPayload, {
    nullable: false
  })
  async deleteManyMovie(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyMovieArgs): Promise<BatchPayload> {
    return ctx.prisma.movie.deleteMany(args);
  }

  @TypeGraphQL.Mutation(_returns => BatchPayload, {
    nullable: false
  })
  async updateManyMovie(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyMovieArgs): Promise<BatchPayload> {
    return ctx.prisma.movie.updateMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Movie, {
    nullable: false
  })
  async upsertMovie(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertMovieArgs): Promise<Movie> {
    return ctx.prisma.movie.upsert(args);
  }

  @TypeGraphQL.Query(_returns => AggregateMovie, {
    nullable: false
  })
  async aggregateMovie(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateMovieArgs): Promise<AggregateMovie> {
    function transformFields(fields: Record<string, any>): Record<string, any> {
      return Object.fromEntries(
        Object.entries(fields)
          // remove __typename and others
          .filter(([key, value]) => !key.startsWith("__"))
          .map<[string, any]>(([key, value]) => {
            if (Object.keys(value).length === 0) {
              return [key, true];
            }
            return [key, transformFields(value)];
          }),
      );
    }

    return ctx.prisma.movie.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }

  @TypeGraphQL.Query(_returns => [MovieGroupBy], {
    nullable: false
  })
  async groupByMovie(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByMovieArgs): Promise<MovieGroupBy[]> {
    function transformFields(fields: Record<string, any>): Record<string, any> {
      return Object.fromEntries(
        Object.entries(fields)
          // remove __typename and others
          .filter(([key, value]) => !key.startsWith("__"))
          .map<[string, any]>(([key, value]) => {
            if (Object.keys(value).length === 0) {
              return [key, true];
            }
            return [key, transformFields(value)];
          }),
      );
    }

    const { count, avg, sum, min, max } = transformFields(
      graphqlFields(info as any)
    );
    return ctx.prisma.movie.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ count, avg, sum, min, max }).filter(([_, v]) => v != null)
      ),
    });
  }
}

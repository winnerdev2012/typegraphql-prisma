import { DMMF, DMMFClass, Engine } from './runtime';
/**
 * Utility Types
 */
export declare type Enumerable<T> = T | Array<T>;
export declare type MergeTruthyValues<R extends object, S extends object> = {
    [key in keyof S | keyof R]: key extends false ? never : key extends keyof S ? S[key] extends false ? never : S[key] : key extends keyof R ? R[key] : never;
};
export declare type CleanupNever<T> = {
    [key in keyof T]: T[key] extends never ? never : key;
}[keyof T];
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * A PrismaClientRequestError is an error that is thrown in conjunction to a concrete query that has been performed with PrismaClient.js.
 */
export declare class PrismaClientRequestError extends Error {
    message: string;
    code?: string | undefined;
    meta?: any;
    constructor(message: string, code?: string | undefined, meta?: any);
}
declare class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string, collectTimestamps?: any): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}
/**
 * Client
**/
export declare type Datasources = {
    db?: string;
};
export declare type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientOptions {
    datasources?: Datasources;
    /**
     * @default "pretty"
     */
    errorFormat?: ErrorFormat;
    log?: Array<LogLevel | LogDefinition>;
    debug?: any;
    /**
     * You probably don't want to use this. `__internal` is used by internal tooling.
     */
    __internal?: {
        debug?: boolean;
        hooks?: Hooks;
        engine?: {
            cwd?: string;
            binaryPath?: string;
        };
        measurePerformance?: boolean;
    };
}
export declare type Hooks = {
    beforeRequest?: (options: {
        query: string;
        path: string[];
        rootField?: string;
        typeName?: string;
        document: any;
    }) => any;
};
export declare type LogLevel = 'info' | 'query' | 'warn';
export declare type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export declare type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never;
export declare type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]>;
export declare type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export declare type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;
/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new Prisma()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<T extends PrismaClientOptions = {}, U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never> {
    /**
     * @private
     */
    private fetcher;
    /**
     * @private
     */
    private readonly dmmf;
    /**
     * @private
     */
    private connectionPromise?;
    /**
     * @private
     */
    private disconnectionPromise?;
    /**
     * @private
     */
    private readonly engineConfig;
    /**
     * @private
     */
    private readonly measurePerformance;
    /**
     * @private
     */
    engine: Engine;
    /**
     * @private
     */
    errorFormat: ErrorFormat;
    /**
     * ##  Prisma Client ʲˢ
     *
     * Type-safe database client for TypeScript & Node.js (ORM replacement)
     * @example
     * ```
     * const prisma = new Prisma()
     * // Fetch zero or more Users
     * const users = await prisma.user.findMany()
     * ```
     *
     *
     * Read more in our [docs](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md).
     */
    constructor(optionsArg?: T);
    on<V extends U>(eventType: V, callback: V extends never ? never : (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
    /**
     * Connect with the database
     */
    connect(): Promise<void>;
    /**
     * @private
     */
    private runDisconnect;
    /**
     * Disconnect from the database
     */
    disconnect(): Promise<any>;
    /**
     * `prisma.user`: Exposes CRUD operations for the **User** model.
     * Example usage:
     * ```ts
     * // Fetch zero or more Users
     * const users = await prisma.user.findMany()
     * ```
     */
    get user(): UserDelegate;
    get users(): '"prisma.users" has been renamed to "prisma.user"';
    /**
     * `prisma.post`: Exposes CRUD operations for the **Post** model.
     * Example usage:
     * ```ts
     * // Fetch zero or more Posts
     * const posts = await prisma.post.findMany()
     * ```
     */
    get post(): PostDelegate;
    get posts(): '"prisma.posts" has been renamed to "prisma.post"';
}
export declare const OrderByArg: {
    asc: "asc";
    desc: "desc";
};
export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg];
export declare const Role: {
    USER: "USER";
    ADMIN: "ADMIN";
};
export declare type Role = (typeof Role)[keyof typeof Role];
export declare const PostKind: {
    BLOG: "BLOG";
    ADVERT: "ADVERT";
};
export declare type PostKind = (typeof PostKind)[keyof typeof PostKind];
/**
 * Model User
 */
export declare type User = {
    id: number;
    email: string;
    name: string | null;
    age: number;
    balance: number;
    amount: number;
    role: Role;
};
export declare type UserScalars = 'id' | 'email' | 'name' | 'age' | 'balance' | 'amount' | 'role';
export declare type UserSelect = {
    id?: boolean;
    email?: boolean;
    name?: boolean;
    age?: boolean;
    balance?: boolean;
    amount?: boolean;
    posts?: boolean | FindManyPostSelectArgsOptional;
    role?: boolean;
};
export declare type UserInclude = {
    posts?: boolean | FindManyPostIncludeArgsOptional;
};
declare type UserDefault = {
    id: true;
    email: true;
    name: true;
    age: true;
    balance: true;
    amount: true;
    role: true;
};
export declare type UserGetSelectPayload<S extends boolean | UserSelect> = S extends true ? User : S extends UserSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends UserScalars ? User[P] : P extends 'posts' ? Array<PostGetSelectPayload<ExtractFindManyPostSelectArgs<S[P]>>> : never;
} : never;
export declare type UserGetIncludePayload<S extends boolean | UserInclude> = S extends true ? User : S extends UserInclude ? {
    [P in CleanupNever<MergeTruthyValues<UserDefault, S>>]: P extends UserScalars ? User[P] : P extends 'posts' ? Array<PostGetIncludePayload<ExtractFindManyPostIncludeArgs<S[P]>>> : never;
} : never;
export interface UserDelegate {
    /**
     * Find zero or one User.
     * @param {FindOneUserArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findOne({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findOne<T extends FindOneUserArgs>(args: Subset<T, FindOneUserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneUserSelectArgs ? Promise<UserGetSelectPayload<ExtractFindOneUserSelectArgs<T>> | null> : T extends FindOneUserIncludeArgs ? Promise<UserGetIncludePayload<ExtractFindOneUserIncludeArgs<T>> | null> : UserClient<User | null>;
    /**
     * Find zero or more Users.
     * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ first: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
    **/
    findMany<T extends FindManyUserArgs>(args?: Subset<T, FindManyUserArgs>): T extends FindManyUserArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyUserSelectArgs ? Promise<Array<UserGetSelectPayload<ExtractFindManyUserSelectArgs<T>>>> : T extends FindManyUserIncludeArgs ? Promise<Array<UserGetIncludePayload<ExtractFindManyUserIncludeArgs<T>>>> : Promise<Array<User>>;
    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const user = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
    **/
    create<T extends UserCreateArgs>(args: Subset<T, UserCreateArgs>): T extends UserCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectCreateArgs ? Promise<UserGetSelectPayload<ExtractUserSelectCreateArgs<T>>> : T extends UserIncludeCreateArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeCreateArgs<T>>> : UserClient<User>;
    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const user = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
    **/
    delete<T extends UserDeleteArgs>(args: Subset<T, UserDeleteArgs>): T extends UserDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectDeleteArgs ? Promise<UserGetSelectPayload<ExtractUserSelectDeleteArgs<T>>> : T extends UserIncludeDeleteArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeDeleteArgs<T>>> : UserClient<User>;
    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provider data here
     *   }
     * })
     *
    **/
    update<T extends UserUpdateArgs>(args: Subset<T, UserUpdateArgs>): T extends UserUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectUpdateArgs ? Promise<UserGetSelectPayload<ExtractUserSelectUpdateArgs<T>>> : T extends UserIncludeUpdateArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeUpdateArgs<T>>> : UserClient<User>;
    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
    **/
    deleteMany<T extends UserDeleteManyArgs>(args: Subset<T, UserDeleteManyArgs>): Promise<BatchPayload>;
    /**
     * Update zero or more Users.
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provider data here
     *   }
     * })
     *
    **/
    updateMany<T extends UserUpdateManyArgs>(args: Subset<T, UserUpdateManyArgs>): Promise<BatchPayload>;
    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(args: Subset<T, UserUpsertArgs>): T extends UserUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectUpsertArgs ? Promise<UserGetSelectPayload<ExtractUserSelectUpsertArgs<T>>> : T extends UserIncludeUpsertArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeUpsertArgs<T>>> : UserClient<User>;
    /**
     *
     */
    count(): Promise<number>;
}
export declare class UserClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    private _collectTimestamps?;
    constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';
    posts<T extends FindManyPostArgs = {}>(args?: Subset<T, FindManyPostArgs>): T extends FindManyPostArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyPostSelectArgs ? Promise<Array<PostGetSelectPayload<ExtractFindManyPostSelectArgs<T>>>> : T extends FindManyPostIncludeArgs ? Promise<Array<PostGetIncludePayload<ExtractFindManyPostIncludeArgs<T>>>> : Promise<Array<Post>>;
    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * User findOne
 */
export declare type FindOneUserArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserSelectArgs = {
    select: UserSelect;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserSelectArgsOptional = {
    select?: UserSelect | null;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserIncludeArgs = {
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserIncludeArgsOptional = {
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type ExtractFindOneUserSelectArgs<S extends undefined | boolean | FindOneUserSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneUserSelectArgs ? S['select'] : true;
export declare type ExtractFindOneUserIncludeArgs<S extends undefined | boolean | FindOneUserIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneUserIncludeArgs ? S['include'] : true;
/**
 * User findMany
 */
export declare type FindManyUserArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: number | null;
    before?: number | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: number | null;
    before?: number | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserSelectArgs = {
    select: UserSelect;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: number | null;
    before?: number | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserSelectArgsOptional = {
    select?: UserSelect | null;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: number | null;
    before?: number | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserIncludeArgs = {
    include: UserInclude;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: number | null;
    before?: number | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserIncludeArgsOptional = {
    include?: UserInclude | null;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: number | null;
    before?: number | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyUserSelectArgs<S extends undefined | boolean | FindManyUserSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyUserSelectArgs ? S['select'] : true;
export declare type ExtractFindManyUserIncludeArgs<S extends undefined | boolean | FindManyUserIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyUserIncludeArgs ? S['include'] : true;
/**
 * User create
 */
export declare type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null;
    data: UserCreateInput;
};
export declare type UserCreateArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    data: UserCreateInput;
};
export declare type UserSelectCreateArgs = {
    select: UserSelect;
    data: UserCreateInput;
};
export declare type UserSelectCreateArgsOptional = {
    select?: UserSelect | null;
    data: UserCreateInput;
};
export declare type UserIncludeCreateArgs = {
    include: UserInclude;
    data: UserCreateInput;
};
export declare type UserIncludeCreateArgsOptional = {
    include?: UserInclude | null;
    data: UserCreateInput;
};
export declare type ExtractUserSelectCreateArgs<S extends undefined | boolean | UserSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectCreateArgs ? S['select'] : true;
export declare type ExtractUserIncludeCreateArgs<S extends undefined | boolean | UserIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeCreateArgs ? S['include'] : true;
/**
 * User update
 */
export declare type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserUpdateArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserSelectUpdateArgs = {
    select: UserSelect;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserSelectUpdateArgsOptional = {
    select?: UserSelect | null;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeUpdateArgs = {
    include: UserInclude;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeUpdateArgsOptional = {
    include?: UserInclude | null;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type ExtractUserSelectUpdateArgs<S extends undefined | boolean | UserSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectUpdateArgs ? S['select'] : true;
export declare type ExtractUserIncludeUpdateArgs<S extends undefined | boolean | UserIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeUpdateArgs ? S['include'] : true;
/**
 * User updateMany
 */
export declare type UserUpdateManyArgs = {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput | null;
};
/**
 * User upsert
 */
export declare type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserUpsertArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserSelectUpsertArgs = {
    select: UserSelect;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserSelectUpsertArgsOptional = {
    select?: UserSelect | null;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserIncludeUpsertArgs = {
    include: UserInclude;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserIncludeUpsertArgsOptional = {
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type ExtractUserSelectUpsertArgs<S extends undefined | boolean | UserSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectUpsertArgs ? S['select'] : true;
export declare type ExtractUserIncludeUpsertArgs<S extends undefined | boolean | UserIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeUpsertArgs ? S['include'] : true;
/**
 * User delete
 */
export declare type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type UserDeleteArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type UserSelectDeleteArgs = {
    select: UserSelect;
    where: UserWhereUniqueInput;
};
export declare type UserSelectDeleteArgsOptional = {
    select?: UserSelect | null;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeDeleteArgs = {
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeDeleteArgsOptional = {
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type ExtractUserSelectDeleteArgs<S extends undefined | boolean | UserSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectDeleteArgs ? S['select'] : true;
export declare type ExtractUserIncludeDeleteArgs<S extends undefined | boolean | UserIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeDeleteArgs ? S['include'] : true;
/**
 * User deleteMany
 */
export declare type UserDeleteManyArgs = {
    where?: UserWhereInput | null;
};
/**
 * User without action
 */
export declare type UserArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null;
};
export declare type UserArgsRequired = {
    select: UserSelect;
    include: UserInclude;
};
export declare type UserSelectArgs = {
    select: UserSelect;
};
export declare type UserSelectArgsOptional = {
    select?: UserSelect | null;
};
export declare type UserIncludeArgs = {
    include: UserInclude;
};
export declare type UserIncludeArgsOptional = {
    include?: UserInclude | null;
};
export declare type ExtractUserSelectArgs<S extends undefined | boolean | UserSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectArgs ? S['select'] : true;
export declare type ExtractUserIncludeArgs<S extends undefined | boolean | UserIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeArgs ? S['include'] : true;
/**
 * Model Post
 */
export declare type Post = {
    uuid: string;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    title: string;
    content: string | null;
    kind: PostKind | null;
};
export declare type PostScalars = 'uuid' | 'createdAt' | 'updatedAt' | 'published' | 'title' | 'content' | 'kind';
export declare type PostSelect = {
    uuid?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    published?: boolean;
    title?: boolean;
    content?: boolean;
    author?: boolean | UserSelectArgsOptional;
    kind?: boolean;
};
export declare type PostInclude = {
    author?: boolean | UserIncludeArgsOptional;
};
declare type PostDefault = {
    uuid: true;
    createdAt: true;
    updatedAt: true;
    published: true;
    title: true;
    content: true;
    kind: true;
};
export declare type PostGetSelectPayload<S extends boolean | PostSelect> = S extends true ? Post : S extends PostSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends PostScalars ? Post[P] : P extends 'author' ? UserGetSelectPayload<ExtractUserSelectArgs<S[P]>> : never;
} : never;
export declare type PostGetIncludePayload<S extends boolean | PostInclude> = S extends true ? Post : S extends PostInclude ? {
    [P in CleanupNever<MergeTruthyValues<PostDefault, S>>]: P extends PostScalars ? Post[P] : P extends 'author' ? UserGetIncludePayload<ExtractUserIncludeArgs<S[P]>> : never;
} : never;
export interface PostDelegate {
    /**
     * Find zero or one Post.
     * @param {FindOnePostArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findOne({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findOne<T extends FindOnePostArgs>(args: Subset<T, FindOnePostArgs>): T extends FindOnePostArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOnePostSelectArgs ? Promise<PostGetSelectPayload<ExtractFindOnePostSelectArgs<T>> | null> : T extends FindOnePostIncludeArgs ? Promise<PostGetIncludePayload<ExtractFindOnePostIncludeArgs<T>> | null> : PostClient<Post | null>;
    /**
     * Find zero or more Posts.
     * @param {FindManyPostArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     *
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ first: 10 })
     *
     * // Only select the `uuid`
     * const postWithUuidOnly = await prisma.post.findMany({ select: { uuid: true } })
     *
    **/
    findMany<T extends FindManyPostArgs>(args?: Subset<T, FindManyPostArgs>): T extends FindManyPostArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyPostSelectArgs ? Promise<Array<PostGetSelectPayload<ExtractFindManyPostSelectArgs<T>>>> : T extends FindManyPostIncludeArgs ? Promise<Array<PostGetIncludePayload<ExtractFindManyPostIncludeArgs<T>>>> : Promise<Array<Post>>;
    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const user = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     *
    **/
    create<T extends PostCreateArgs>(args: Subset<T, PostCreateArgs>): T extends PostCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends PostSelectCreateArgs ? Promise<PostGetSelectPayload<ExtractPostSelectCreateArgs<T>>> : T extends PostIncludeCreateArgs ? Promise<PostGetIncludePayload<ExtractPostIncludeCreateArgs<T>>> : PostClient<Post>;
    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const user = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     *
    **/
    delete<T extends PostDeleteArgs>(args: Subset<T, PostDeleteArgs>): T extends PostDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends PostSelectDeleteArgs ? Promise<PostGetSelectPayload<ExtractPostSelectDeleteArgs<T>>> : T extends PostIncludeDeleteArgs ? Promise<PostGetIncludePayload<ExtractPostIncludeDeleteArgs<T>>> : PostClient<Post>;
    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provider data here
     *   }
     * })
     *
    **/
    update<T extends PostUpdateArgs>(args: Subset<T, PostUpdateArgs>): T extends PostUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends PostSelectUpdateArgs ? Promise<PostGetSelectPayload<ExtractPostSelectUpdateArgs<T>>> : T extends PostIncludeUpdateArgs ? Promise<PostGetIncludePayload<ExtractPostIncludeUpdateArgs<T>>> : PostClient<Post>;
    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
    **/
    deleteMany<T extends PostDeleteManyArgs>(args: Subset<T, PostDeleteManyArgs>): Promise<BatchPayload>;
    /**
     * Update zero or more Posts.
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provider data here
     *   }
     * })
     *
    **/
    updateMany<T extends PostUpdateManyArgs>(args: Subset<T, PostUpdateManyArgs>): Promise<BatchPayload>;
    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
    **/
    upsert<T extends PostUpsertArgs>(args: Subset<T, PostUpsertArgs>): T extends PostUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends PostSelectUpsertArgs ? Promise<PostGetSelectPayload<ExtractPostSelectUpsertArgs<T>>> : T extends PostIncludeUpsertArgs ? Promise<PostGetIncludePayload<ExtractPostIncludeUpsertArgs<T>>> : PostClient<Post>;
    /**
     *
     */
    count(): Promise<number>;
}
export declare class PostClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    private _collectTimestamps?;
    constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';
    author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectArgs ? Promise<UserGetSelectPayload<ExtractUserSelectArgs<T>> | null> : T extends UserIncludeArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeArgs<T>> | null> : UserClient<User | null>;
    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * Post findOne
 */
export declare type FindOnePostArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
};
export declare type FindOnePostArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    where: PostWhereUniqueInput;
};
export declare type FindOnePostSelectArgs = {
    select: PostSelect;
    where: PostWhereUniqueInput;
};
export declare type FindOnePostSelectArgsOptional = {
    select?: PostSelect | null;
    where: PostWhereUniqueInput;
};
export declare type FindOnePostIncludeArgs = {
    include: PostInclude;
    where: PostWhereUniqueInput;
};
export declare type FindOnePostIncludeArgsOptional = {
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
};
export declare type ExtractFindOnePostSelectArgs<S extends undefined | boolean | FindOnePostSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOnePostSelectArgs ? S['select'] : true;
export declare type ExtractFindOnePostIncludeArgs<S extends undefined | boolean | FindOnePostIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOnePostIncludeArgs ? S['include'] : true;
/**
 * Post findMany
 */
export declare type FindManyPostArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPostArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPostSelectArgs = {
    select: PostSelect;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPostSelectArgsOptional = {
    select?: PostSelect | null;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPostIncludeArgs = {
    include: PostInclude;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPostIncludeArgsOptional = {
    include?: PostInclude | null;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyPostSelectArgs<S extends undefined | boolean | FindManyPostSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyPostSelectArgs ? S['select'] : true;
export declare type ExtractFindManyPostIncludeArgs<S extends undefined | boolean | FindManyPostIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyPostIncludeArgs ? S['include'] : true;
/**
 * Post create
 */
export declare type PostCreateArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null;
    data: PostCreateInput;
};
export declare type PostCreateArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    data: PostCreateInput;
};
export declare type PostSelectCreateArgs = {
    select: PostSelect;
    data: PostCreateInput;
};
export declare type PostSelectCreateArgsOptional = {
    select?: PostSelect | null;
    data: PostCreateInput;
};
export declare type PostIncludeCreateArgs = {
    include: PostInclude;
    data: PostCreateInput;
};
export declare type PostIncludeCreateArgsOptional = {
    include?: PostInclude | null;
    data: PostCreateInput;
};
export declare type ExtractPostSelectCreateArgs<S extends undefined | boolean | PostSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostSelectCreateArgs ? S['select'] : true;
export declare type ExtractPostIncludeCreateArgs<S extends undefined | boolean | PostIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostIncludeCreateArgs ? S['include'] : true;
/**
 * Post update
 */
export declare type PostUpdateArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type PostUpdateArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type PostSelectUpdateArgs = {
    select: PostSelect;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type PostSelectUpdateArgsOptional = {
    select?: PostSelect | null;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type PostIncludeUpdateArgs = {
    include: PostInclude;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type PostIncludeUpdateArgsOptional = {
    include?: PostInclude | null;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type ExtractPostSelectUpdateArgs<S extends undefined | boolean | PostSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostSelectUpdateArgs ? S['select'] : true;
export declare type ExtractPostIncludeUpdateArgs<S extends undefined | boolean | PostIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostIncludeUpdateArgs ? S['include'] : true;
/**
 * Post updateMany
 */
export declare type PostUpdateManyArgs = {
    data: PostUpdateManyMutationInput;
    where?: PostWhereInput | null;
};
/**
 * Post upsert
 */
export declare type PostUpsertArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type PostUpsertArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type PostSelectUpsertArgs = {
    select: PostSelect;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type PostSelectUpsertArgsOptional = {
    select?: PostSelect | null;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type PostIncludeUpsertArgs = {
    include: PostInclude;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type PostIncludeUpsertArgsOptional = {
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type ExtractPostSelectUpsertArgs<S extends undefined | boolean | PostSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostSelectUpsertArgs ? S['select'] : true;
export declare type ExtractPostIncludeUpsertArgs<S extends undefined | boolean | PostIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostIncludeUpsertArgs ? S['include'] : true;
/**
 * Post delete
 */
export declare type PostDeleteArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
};
export declare type PostDeleteArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    where: PostWhereUniqueInput;
};
export declare type PostSelectDeleteArgs = {
    select: PostSelect;
    where: PostWhereUniqueInput;
};
export declare type PostSelectDeleteArgsOptional = {
    select?: PostSelect | null;
    where: PostWhereUniqueInput;
};
export declare type PostIncludeDeleteArgs = {
    include: PostInclude;
    where: PostWhereUniqueInput;
};
export declare type PostIncludeDeleteArgsOptional = {
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
};
export declare type ExtractPostSelectDeleteArgs<S extends undefined | boolean | PostSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostSelectDeleteArgs ? S['select'] : true;
export declare type ExtractPostIncludeDeleteArgs<S extends undefined | boolean | PostIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostIncludeDeleteArgs ? S['include'] : true;
/**
 * Post deleteMany
 */
export declare type PostDeleteManyArgs = {
    where?: PostWhereInput | null;
};
/**
 * Post without action
 */
export declare type PostArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null;
};
export declare type PostArgsRequired = {
    select: PostSelect;
    include: PostInclude;
};
export declare type PostSelectArgs = {
    select: PostSelect;
};
export declare type PostSelectArgsOptional = {
    select?: PostSelect | null;
};
export declare type PostIncludeArgs = {
    include: PostInclude;
};
export declare type PostIncludeArgsOptional = {
    include?: PostInclude | null;
};
export declare type ExtractPostSelectArgs<S extends undefined | boolean | PostSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostSelectArgs ? S['select'] : true;
export declare type ExtractPostIncludeArgs<S extends undefined | boolean | PostIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostIncludeArgs ? S['include'] : true;
/**
 * Deep Input Types
 */
export declare type PostWhereInput = {
    uuid?: string | StringFilter | null;
    createdAt?: Date | string | DateTimeFilter | null;
    updatedAt?: Date | string | DateTimeFilter | null;
    published?: boolean | BooleanFilter | null;
    title?: string | StringFilter | null;
    content?: string | NullableStringFilter | null | null;
    kind?: PostKind | NullablePostKindFilter | null | null;
    AND?: Enumerable<PostWhereInput> | null;
    OR?: Enumerable<PostWhereInput> | null;
    NOT?: Enumerable<PostWhereInput> | null;
    author?: UserWhereInput | null;
};
export declare type UserWhereInput = {
    id?: number | IntFilter | null;
    email?: string | StringFilter | null;
    name?: string | NullableStringFilter | null | null;
    age?: number | IntFilter | null;
    balance?: number | FloatFilter | null;
    amount?: number | FloatFilter | null;
    posts?: PostFilter | null;
    role?: Role | RoleFilter | null;
    AND?: Enumerable<UserWhereInput> | null;
    OR?: Enumerable<UserWhereInput> | null;
    NOT?: Enumerable<UserWhereInput> | null;
};
export declare type UserWhereUniqueInput = {
    id?: number | null;
    email?: string | null;
};
export declare type PostWhereUniqueInput = {
    uuid?: string | null;
};
export declare type PostCreateWithoutAuthorInput = {
    uuid?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published: boolean;
    title: string;
    content?: string | null;
    kind?: PostKind | null;
};
export declare type PostCreateManyWithoutAuthorInput = {
    create?: Enumerable<PostCreateWithoutAuthorInput> | null;
    connect?: Enumerable<PostWhereUniqueInput> | null;
};
export declare type UserCreateInput = {
    email: string;
    name?: string | null;
    age: number;
    balance: number;
    amount: number;
    role: Role;
    posts?: PostCreateManyWithoutAuthorInput | null;
};
export declare type PostUpdateWithoutAuthorDataInput = {
    uuid?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published?: boolean | null;
    title?: string | null;
    content?: string | null;
    kind?: PostKind | null;
};
export declare type PostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput;
    data: PostUpdateWithoutAuthorDataInput;
};
export declare type PostScalarWhereInput = {
    uuid?: string | StringFilter | null;
    createdAt?: Date | string | DateTimeFilter | null;
    updatedAt?: Date | string | DateTimeFilter | null;
    published?: boolean | BooleanFilter | null;
    title?: string | StringFilter | null;
    content?: string | NullableStringFilter | null | null;
    kind?: PostKind | NullablePostKindFilter | null | null;
    AND?: Enumerable<PostScalarWhereInput> | null;
    OR?: Enumerable<PostScalarWhereInput> | null;
    NOT?: Enumerable<PostScalarWhereInput> | null;
};
export declare type PostUpdateManyDataInput = {
    uuid?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published?: boolean | null;
    title?: string | null;
    content?: string | null;
    kind?: PostKind | null;
};
export declare type PostUpdateManyWithWhereNestedInput = {
    where: PostScalarWhereInput;
    data: PostUpdateManyDataInput;
};
export declare type PostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput;
    update: PostUpdateWithoutAuthorDataInput;
    create: PostCreateWithoutAuthorInput;
};
export declare type PostUpdateManyWithoutAuthorInput = {
    create?: Enumerable<PostCreateWithoutAuthorInput> | null;
    connect?: Enumerable<PostWhereUniqueInput> | null;
    set?: Enumerable<PostWhereUniqueInput> | null;
    disconnect?: Enumerable<PostWhereUniqueInput> | null;
    delete?: Enumerable<PostWhereUniqueInput> | null;
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput> | null;
    updateMany?: Enumerable<PostUpdateManyWithWhereNestedInput> | null;
    deleteMany?: Enumerable<PostScalarWhereInput> | null;
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput> | null;
};
export declare type UserUpdateInput = {
    id?: number | null;
    email?: string | null;
    name?: string | null;
    age?: number | null;
    balance?: number | null;
    amount?: number | null;
    role?: Role | null;
    posts?: PostUpdateManyWithoutAuthorInput | null;
};
export declare type UserUpdateManyMutationInput = {
    id?: number | null;
    email?: string | null;
    name?: string | null;
    age?: number | null;
    balance?: number | null;
    amount?: number | null;
    role?: Role | null;
};
export declare type UserCreateWithoutPostsInput = {
    email: string;
    name?: string | null;
    age: number;
    balance: number;
    amount: number;
    role: Role;
};
export declare type UserCreateOneWithoutPostsInput = {
    create?: UserCreateWithoutPostsInput | null;
    connect?: UserWhereUniqueInput | null;
};
export declare type PostCreateInput = {
    uuid?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published: boolean;
    title: string;
    content?: string | null;
    kind?: PostKind | null;
    author: UserCreateOneWithoutPostsInput;
};
export declare type UserUpdateWithoutPostsDataInput = {
    id?: number | null;
    email?: string | null;
    name?: string | null;
    age?: number | null;
    balance?: number | null;
    amount?: number | null;
    role?: Role | null;
};
export declare type UserUpsertWithoutPostsInput = {
    update: UserUpdateWithoutPostsDataInput;
    create: UserCreateWithoutPostsInput;
};
export declare type UserUpdateOneRequiredWithoutPostsInput = {
    create?: UserCreateWithoutPostsInput | null;
    connect?: UserWhereUniqueInput | null;
    update?: UserUpdateWithoutPostsDataInput | null;
    upsert?: UserUpsertWithoutPostsInput | null;
};
export declare type PostUpdateInput = {
    uuid?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published?: boolean | null;
    title?: string | null;
    content?: string | null;
    kind?: PostKind | null;
    author?: UserUpdateOneRequiredWithoutPostsInput | null;
};
export declare type PostUpdateManyMutationInput = {
    uuid?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published?: boolean | null;
    title?: string | null;
    content?: string | null;
    kind?: PostKind | null;
};
export declare type StringFilter = {
    equals?: string | null;
    not?: string | StringFilter | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string | null;
    lte?: string | null;
    gt?: string | null;
    gte?: string | null;
    contains?: string | null;
    startsWith?: string | null;
    endsWith?: string | null;
};
export declare type DateTimeFilter = {
    equals?: Date | string | null;
    not?: Date | string | DateTimeFilter | null;
    in?: Enumerable<Date | string> | null;
    notIn?: Enumerable<Date | string> | null;
    lt?: Date | string | null;
    lte?: Date | string | null;
    gt?: Date | string | null;
    gte?: Date | string | null;
};
export declare type BooleanFilter = {
    equals?: boolean | null;
    not?: boolean | BooleanFilter | null;
};
export declare type NullableStringFilter = {
    equals?: string | null | null;
    not?: string | null | NullableStringFilter | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string | null;
    lte?: string | null;
    gt?: string | null;
    gte?: string | null;
    contains?: string | null;
    startsWith?: string | null;
    endsWith?: string | null;
};
export declare type NullablePostKindFilter = {
    equals?: PostKind | null | null;
    not?: PostKind | null | NullablePostKindFilter | null;
    in?: Enumerable<PostKind> | null;
    notIn?: Enumerable<PostKind> | null;
};
export declare type IntFilter = {
    equals?: number | null;
    not?: number | IntFilter | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number | null;
    lte?: number | null;
    gt?: number | null;
    gte?: number | null;
};
export declare type FloatFilter = {
    equals?: number | null;
    not?: number | FloatFilter | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number | null;
    lte?: number | null;
    gt?: number | null;
    gte?: number | null;
};
export declare type PostFilter = {
    every?: PostWhereInput | null;
    some?: PostWhereInput | null;
    none?: PostWhereInput | null;
};
export declare type RoleFilter = {
    equals?: Role | null;
    not?: Role | RoleFilter | null;
    in?: Enumerable<Role> | null;
    notIn?: Enumerable<Role> | null;
};
export declare type UserOrderByInput = {
    id?: OrderByArg | null;
    email?: OrderByArg | null;
    name?: OrderByArg | null;
    age?: OrderByArg | null;
    balance?: OrderByArg | null;
    amount?: OrderByArg | null;
    role?: OrderByArg | null;
};
export declare type PostOrderByInput = {
    uuid?: OrderByArg | null;
    createdAt?: OrderByArg | null;
    updatedAt?: OrderByArg | null;
    published?: OrderByArg | null;
    title?: OrderByArg | null;
    content?: OrderByArg | null;
    kind?: OrderByArg | null;
};
/**
 * Batch Payload for updateMany & deleteMany
 */
export declare type BatchPayload = {
    count: number;
};
/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};

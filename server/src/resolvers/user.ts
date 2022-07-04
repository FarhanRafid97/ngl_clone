import argon2 from 'argon2';
import { isAuth } from '../Middleware/isAuth';
import { MyContext } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { User } from '../entities/User';

declare module 'express-session' {
  interface SessionData {
    userId?: number | any;
  }
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
  @Field(() => User, { nullable: true })
  user?: User;
}

Resolver();
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async myAccount(@Ctx() { req }: MyContext) {
    return await User.findOne({ where: { id: req.session.userId } });
  }
  @Mutation(() => UserResponse, { nullable: true })
  async createUser(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const hashPassword = await argon2.hash(password);
    let user;
    try {
      const result = await User.create({
        username,
        password: hashPassword,
      }).save();

      user = result;
    } catch (err) {
      if (err.code === '23505') {
        return {
          error: {
            field: 'username',
            message: 'username alredy taken',
          },
        };
      }
    }
    req.session.userId = user?.id;
    return { user };
  }
  @Mutation(() => UserResponse)
  async loginUser(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return {
        error: {
          field: 'username',
          message: 'username tidak ada',
        },
      };
    }
    const verifyPassword = await argon2.verify(user.password, password);

    if (!verifyPassword) {
      return {
        error: {
          field: 'password',
          message: 'password salah',
        },
      };
    }
    req.session.userId = user.id;
    return { user };
  }
}

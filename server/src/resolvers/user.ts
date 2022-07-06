import argon2 from 'argon2';
import { MyContext } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { COOKIE_NAME } from '../constants';
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
  async myAccount(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    const user = await User.findOne({
      where: { id: req.session.userId },
      relations: ['messages'],
    });
    console.log('useerr', user);
    return user;
  }
  @Query(() => [User], { nullable: true })
  async allUser() {
    return await User.find();
  }
  @Mutation(() => UserResponse)
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
  @Mutation(() => Boolean)
  logOut(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        return resolve(true);
      });
    });
  }
}

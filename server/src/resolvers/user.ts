import argon2 from 'argon2';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../entities/User';

Resolver();
export class UserResolver {
  @Query(() => [User], { nullable: true })
  async findAllUser() {
    return User.find();
  }
  @Mutation(() => User, { nullable: true })
  async createUser(
    @Arg('username') username: string,
    @Arg('password') password: string
  ) {
    const hashPassword = await argon2.hash(password);
    const user = await User.create({ username, password: hashPassword }).save();
    return user;
  }
}

import { Message } from '../entities/Message';

import { MyContext } from 'src/types';
import { Query, Ctx, Resolver, Mutation, Arg, Int } from 'type-graphql';
import { User } from '../entities/User';

Resolver();
export class MessageResolver {
  @Query(() => [Message], { nullable: true })
  async allMessage(): Promise<Message[]> {
    return await Message.find({ relations: ['receiver'] });
  }
  @Query(() => Message, { nullable: true })
  async message(@Arg('id', () => Int) id: number): Promise<Message | null> {
    return await Message.findOne({ where: { id }, relations: ['receiver'] });
  }
  @Mutation(() => Message)
  async sendMessage(
    @Arg('message') message: string,
    @Arg('username') username: string,
    @Ctx() { req }: MyContext
  ): Promise<Message | null> {
    const user = await User.findOne({ where: { username } });
    const data = await Message.create({ message, receiverId: user?.id }).save();

    return await Message.findOne({
      where: { id: data.id },
      relations: ['receiver'],
    });
  }
}

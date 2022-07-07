import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Message } from '../entities/Message';
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
  async openedMessage(
    @Arg('id', () => Int) id: number,
    @Arg('opened') opened: boolean
  ): Promise<Message> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Message)
      .set({ opened })
      .where('id = :id ', {
        id,
      })
      .returning('*')
      .execute();
    console.log(result.raw[0]);
    return result.raw[0];
  }

  @Mutation(() => Message)
  async sendMessage(
    @Arg('message') message: string,
    @Arg('username') username: string
  ): Promise<Message | null> {
    const user = await User.findOne({ where: { username } });
    const data = await Message.create({ message, receiverId: user?.id }).save();

    return await Message.findOne({
      where: { id: data.id },
      relations: ['receiver'],
    });
  }
}

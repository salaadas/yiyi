import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Message } from '@generated/type-graphql';
import { MyContext } from '../types';

@Resolver()
export class MessageResolver {
  @Query(() => [Message])
  async messages(@Ctx() { prisma }: MyContext): Promise<Message[]> {
    return await prisma.message.findMany();
  }

  @Query(() => Message, { nullable: true })
  async message(
    @Ctx() { prisma }: MyContext,
    @Arg('id') id: number
  ): Promise<Message | null> {
    return await prisma.message.findUnique({
      where: {
        id,
      },
    });
  }
}

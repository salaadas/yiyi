// TODO: because I implemented the user too soon,
// I need to finish the user to do mutation with message :(
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Message } from '@generated/type-graphql';
import { MyContext } from '../types';
import { isAuth } from '../middleware/isAuth';

@InputType()
class MessageInput {
  @Field()
  content: string;
  @Field()
  important: boolean;
}

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

  // create message
  //
  @Mutation(() => Message)
  @UseMiddleware(isAuth)
  async createMessage(
    @Arg('input') input: MessageInput,
    @Ctx() { prisma, req }: MyContext
  ): Promise<Message> {
    return await prisma.message.create({
      data: {
        ...input,
        userId: req.session.userId,
      } as any,
    });
  }

  // update message
  //
  // @Mutation(() => Message, { nullable: true })
  // async updateMessage(
  //   @Arg('newContent') newContent: string,
  //   @Arg('id') id: number,
  //   @Ctx() { prisma }: MyContext
  // ): Promise<Message | null> {
  //   try {
  //     const updatedMessage = await prisma.message.update({
  //       where: {
  //         id,
  //       },
  //       data: {
  //         newContent,
  //       },
  //     });
  //     return updatedMessage;
  //   } catch {
  //     return null;
  //   }
  // }

  // delete message
  //
  // @Mutation(() => Boolean)
  // async deleteMessage(
  //   @Arg('id') id: number,
  //   @Ctx() { prisma }: MyContext
  // ): Promise<boolean> {
  //   try {
  //     await prisma.message.delete({
  //       where: {
  //         id,
  //       },
  //     });
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // }
}

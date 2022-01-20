import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from 'type-graphql';
import { User } from '@generated/type-graphql';
import { MyContext } from '../types';
import argon2 from 'argon2';

@InputType()
class RegisterInput {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
class LoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
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
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('input') { name, email, password }: RegisterInput,
    @Ctx() { prisma }: MyContext
  ): Promise<UserResponse> {
    if (name.length <= 2) {
      return {
        errors: [
          {
            field: 'Username',
            message: 'All field must have length greater than 2',
          },
          {
            field: 'Email',
            message: 'All field must have length greater than 2',
          },
          {
            field: 'Password',
            message: 'All field must have length greater than 2',
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(password);

    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      return { user };
    } catch (err) {
      if (err.code === 'P2002') {
        return {
          errors: [
            {
              field: 'Username',
              message: 'Username/Email already taken',
            },
            {
              field: 'Email',
              message: 'Username/Email already taken',
            },
          ],
        };
      } else {
        return {
          errors: [
            {
              field: 'Username',
              message: 'Unhandled error, please report back to us',
            },
            {
              field: 'Email',
              message: 'Unhandled error, please report back to us',
            },
            {
              field: 'Password',
              message: 'Unhandled error, please report back to us',
            },
          ],
        };
      }
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') { email, password }: LoginInput,
    @Ctx() { prisma }: MyContext
  ): Promise<UserResponse> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        errors: [
          {
            field: 'Email',
            message: 'User with that email does not exist',
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return {
        errors: [
          {
            field: 'Password',
            message: 'Password is not valid',
          },
        ],
      };
    }

    return {
      user,
    };
  }
}

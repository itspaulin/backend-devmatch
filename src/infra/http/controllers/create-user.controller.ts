import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error';
import { CreateUserService } from '@/domain/application/use-cases/register-user.service';
import { Public } from '@/infra/auth/public';

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  githubProfile: z.string(),
  bio: z.string(),
  technologies: z.string().array(),
  avatarUrl: z.string(),
});

type CreateUserSchema = z.infer<typeof createUserBodySchema>;

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private readonly createUserUseCase: CreateUserService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async handle(@Body() body: CreateUserSchema) {
    const {
      name,
      email,
      password,
      githubProfile,
      bio,
      technologies,
      avatarUrl,
    } = createUserBodySchema.parse(body);

    const result = await this.createUserUseCase.execute({
      name,
      email,
      password,
      githubProfile,
      bio,
      technologies,
      avatarUrl,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);

        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}

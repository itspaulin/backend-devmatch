import { AuthenticateUserService } from '@/domain/application/use-cases/authenticate-user.service';
import { Public } from '@/infra/auth/public';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { UserAlreadyExistsError } from '@/domain/application/use-cases/errors/user-aready-exist-error';
import { z } from 'zod';

const authenticateUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateUserBodySchema = z.infer<typeof authenticateUserBodySchema>;

@Controller('/sessions')
@Public()
export class AuthenticateUserController {
  constructor(private authenticateUser: AuthenticateUserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateUserBodySchema))
  async handle(@Body() body: AuthenticateUserBodySchema) {
    const { email, password } = body;

    const result = await this.authenticateUser.execute({ email, password });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message);

        default:
          throw new BadRequestException(error.message);
      }
    }
    const { acessToken } = result.value;

    return {
      acess_token: acessToken,
    };
  }
}

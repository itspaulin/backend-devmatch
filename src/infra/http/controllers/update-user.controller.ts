import { UpdateUserService } from '@/domain/application/use-cases/update-user.service';
import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

const updateUserBodySchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  email: z.string().email('Invalid Email'),
  password: z.string().min(10, 'Password must have at least 10 characters'),
  githubProfile: z.string(),
  bio: z.string(),
  technologies: z.array(z.string()),
  avatarUrl: z.string().url('Avatar url invalid'),
});

const bodyValidationPipe = new ZodValidationPipe(updateUserBodySchema);

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>;

@Controller('/users/:id')
export class UpdateUserController {
  constructor(private readonly updateUser: UpdateUserService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') id: string,
    @Body(bodyValidationPipe) body: UpdateUserBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    if (user.sub !== id) {
      throw new ForbiddenException(
        'You do not have permission to edit this user.',
      );
    }

    const {
      name,
      email,
      password,
      githubProfile,
      bio,
      technologies,
      avatarUrl,
    } = body;

    const result = await this.updateUser.execute({
      userId: id,
      name,
      email,
      password,
      githubProfile,
      bio,
      technologies,
      avatarUrl,
    });

    if (result.isLeft()) {
      if (result.value instanceof ResourceNotFoundError) {
        throw new NotFoundException(result.value.message);
      }
      throw new BadRequestException(result.value.message);
    }
  }
}

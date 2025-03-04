import { CreateUserUserUseCase } from '@/domain/application/use-cases/user/register-user.service';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from '@/domain/application/use-cases/user/dto/create-user.dto';
import { User } from '@/domain/enterprise/entities/user.entity';

@Controller('users')
export class CreateAccountController {
  constructor(private readonly createUserUseCase: CreateUserUserUseCase) {
    Logger.log('CreateAccountController carregado!', 'CreateAccountController');
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.createUserUseCase.execute(dto);
  }
}

import { CreateUserUserUseCase } from '@/domain/application/use-cases/user/register-user.service';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { UserEntity } from '@/domain/enterprise/entities/user.entity';
import { CreateUserDto } from '@/domain/application/use-cases/user/dto/create-user.dto';

@Controller('users')
export class CreateAccountController {
  constructor(private readonly createUserUseCase: CreateUserUserUseCase) {
    Logger.log('CreateAccountController carregado!', 'CreateAccountController');
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return this.createUserUseCase.execute(dto);
  }
}

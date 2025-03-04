import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { UserEntity } from 'src/infra/database/repositories/entities/user.entity';
import { CreateUserUseCase } from 'src/modules/use-cases/user/create-user.service';
import { CreateUserDto } from 'src/modules/use-cases/user/dto/create-user.dto';

@Controller('users')
export class CreateAccountController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {
    Logger.log('CreateAccountController carregado!', 'CreateAccountController');
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return this.createUserUseCase.execute(dto);
  }
}

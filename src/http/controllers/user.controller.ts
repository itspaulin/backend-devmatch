import { Body, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/use-cases/user/dto/create-user.dto';

export class CreateAccountController {
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
}

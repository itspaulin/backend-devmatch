import { Module } from '@nestjs/common';
import { CreateAccountController } from './controllers/create-user.controller';
import { CreateUserService } from '@/domain/application/use-cases/register-user.service';
import { DatabaseModule } from '../database/database.module';
import { CryptograpyModule } from '../cryptography/cryptography.module';
import { AuthenticateUserController } from './controllers/authenticate-user.controller';
import { AuthenticateUserService } from '@/domain/application/use-cases/authenticate-user.service';
import { UpdateUserController } from './controllers/update-user.controller';
import { UpdateUserService } from '@/domain/application/use-cases/update-user.service';

@Module({
  imports: [DatabaseModule, CryptograpyModule],
  controllers: [
    CreateAccountController,
    AuthenticateUserController,
    UpdateUserController,
  ],
  providers: [CreateUserService, AuthenticateUserService, UpdateUserService],
})
export class HttpModule {}

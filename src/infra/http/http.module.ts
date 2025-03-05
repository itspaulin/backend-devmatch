import { Module } from '@nestjs/common';
import { CreateAccountController } from './controllers/create-user.controller';
import { CreateUserService } from '@/domain/application/use-cases/register-user.service';
import { DatabaseModule } from '../database/database.module';
import { CryptograpyModule } from '../cryptography/cryptography.module';
import { AuthenticateUserController } from './controllers/authenticate-user.controller';
import { AuthenticateUserService } from '@/domain/application/use-cases/authenticate-user.service';

@Module({
  imports: [DatabaseModule, CryptograpyModule],
  controllers: [CreateAccountController, AuthenticateUserController],
  providers: [CreateUserService, AuthenticateUserService],
})
export class HttpModule {}

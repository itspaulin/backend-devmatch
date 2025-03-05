import { Module } from '@nestjs/common';
import { CreateAccountController } from './controllers/create-user.controller';
import { CreateUserUseCase } from '@/domain/application/use-cases/register-user.service';
import { DatabaseModule } from '../database/database.module';
import { CryptograpyModule } from '../cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, CryptograpyModule],
  controllers: [CreateAccountController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}

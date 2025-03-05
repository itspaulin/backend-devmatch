import { Module } from '@nestjs/common';
import { CreateAccountController } from './controllers/create-user.controller';
import { CreateUserUserUseCase } from '@/domain/application/use-cases/register-user.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateAccountController],
  providers: [CreateUserUserUseCase],
})
export class HttpModule {}

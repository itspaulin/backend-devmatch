import { Module, Logger } from '@nestjs/common';
import { CreateAccountController } from './controllers/create-user.controller';
import { CreateUserUserUseCase } from '@/domain/application/use-cases/user/register-user.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateAccountController],
  providers: [CreateUserUserUseCase],
})
export class HttpModule {
  constructor() {
    Logger.log('HttpModule carregado!', 'HttpModule');
  }
}

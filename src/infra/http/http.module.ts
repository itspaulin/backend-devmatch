import { Module, Logger } from '@nestjs/common';
import { UserRepository } from '../database/repositories/user.repository';
import { PrismaModule } from '../database/prisma/prisma.module';
import { CreateAccountController } from './controllers/create-user.controller';
import { CreateUserUserUseCase } from '@/domain/application/use-cases/user/register-user.service';

@Module({
  imports: [PrismaModule],
  controllers: [CreateAccountController],
  providers: [CreateUserUserUseCase, UserRepository],
})
export class HttpModule {
  constructor() {
    Logger.log('HttpModule carregado!', 'HttpModule');
  }
}

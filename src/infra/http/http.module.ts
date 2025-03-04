import { Module, Logger } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/use-cases/user/create-user.service';
import { UserRepository } from '../database/repositories/user.repository';
import { PrismaModule } from '../database/prisma/prisma.module';
import { CreateAccountController } from './controllers/create-user.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CreateAccountController],
  providers: [CreateUserUseCase, UserRepository],
})
export class HttpModule {
  constructor() {
    Logger.log('HttpModule carregado!', 'HttpModule');
  }
}

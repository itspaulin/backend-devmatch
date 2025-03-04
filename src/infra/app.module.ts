import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [PrismaModule, HttpModule],
})
export class AppModule {}

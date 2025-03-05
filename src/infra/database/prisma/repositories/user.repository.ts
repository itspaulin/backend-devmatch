import { Injectable } from '@nestjs/common';
import { User } from '@/domain/enterprise/entities/user.entity';
import { PrismaService } from '../prisma.service';
import { UserRepository } from '@/domain/application/repositories/user.repository';
import { PrismaUserMapper } from '../mappers/PrismaUserMapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? PrismaUserMapper.toDomain(user) : null;
  }
}

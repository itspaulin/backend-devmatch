import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { User } from '@/domain/enterprise/entities/user.entity';
import { Prisma, User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        githubProfile: raw.githubProfile ?? undefined,
        bio: raw.bio ?? undefined,
        technologies: raw.technologies ?? undefined,
        avatarUrl: raw.avatarUrl ?? undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      githubProfile: user.githubProfile,
      bio: user.bio,
      technologies: user.technologies,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

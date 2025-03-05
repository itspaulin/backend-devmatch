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
        githubProfile: raw.github_profile ?? undefined,
        bio: raw.bio ?? undefined,
        technologies: raw.technologies ?? undefined,
        avatarUrl: raw.avatar_url ?? undefined,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      github_profile: user.githubProfile,
      bio: user.bio,
      technologies: user.technologies,
      avatar_url: user.avatarUrl,
    };
  }
}

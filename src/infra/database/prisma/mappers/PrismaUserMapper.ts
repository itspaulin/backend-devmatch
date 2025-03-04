import { Prisma, User } from '@prisma/client';
import { UserEntity } from '../../repositories/entities/user.entity';

export class PrismaUserMapper {
  static toDomain(raw: User): UserEntity {
    return new UserEntity({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.password ?? undefined,
      githubProfile: raw.github_profile ?? undefined,
      bio: raw.bio ?? undefined,
      technologies: raw.technologies ?? undefined,
      avatarUrl: raw.avatar_url ?? undefined,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
  }

  static toPrisma(user: UserEntity): Prisma.UserUncheckedCreateInput {
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

import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { User } from '@/domain/enterprise/entities/user.entity';
import { HashGenerator } from '../cryptography/hash-generator';

interface UpdateUserServiceRequest {
  userId: string;
  name: string;
  email: string;
  password: string;
  githubProfile: string;
  bio: string;
  technologies: string[];
  avatarUrl: string;
}

type UpdateUserServiceResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    user: User;
  }
>;

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({
    userId,
    name,
    email,
    password,
    githubProfile,
    bio,
    technologies,
    avatarUrl,
  }: UpdateUserServiceRequest): Promise<UpdateUserServiceResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    user.setName(name);
    user.setEmail(email);

    if (password) {
      const hashedPassword = await this.hashGenerator.hash(password);
      user.setPassword(hashedPassword);
    }

    user.setGithubProfile(githubProfile);
    user.setBio(bio);
    user.setTechnologies(technologies ?? []);
    user.setAvatarUrl(avatarUrl);

    await this.userRepository.save(user);

    return right({ user });
  }
}

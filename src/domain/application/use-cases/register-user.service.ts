import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { Either, right } from '@/core/either';
import { User } from '@/domain/enterprise/entities/user.entity';
import { HashGenerator } from '../cryptography/hash-generator';

interface CreateUserUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  githubProfile: string;
  bio: string;
  technologies: string[];
  avatarUrl: string;
}

type CreateUserUserUseCaseResponse = Either<
  BadRequestException,
  {
    user: User;
  }
>;

@Injectable()
export class CreateUserUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
    githubProfile,
    bio,
    technologies,
    avatarUrl,
  }: CreateUserUserUseCaseRequest): Promise<CreateUserUserUseCaseResponse> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Email is already taken');
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
      githubProfile,
      bio,
      technologies,
      avatarUrl,
    });

    await this.userRepository.create(user);

    return right({
      user,
    });
  }
}

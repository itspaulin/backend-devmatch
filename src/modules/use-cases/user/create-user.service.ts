import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infra/database/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from 'src/infra/database/repositories/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new BadRequestException('Email is already taken');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = new UserEntity({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      githubProfile: dto.githubProfile,
      bio: dto.bio,
      technologies: dto.technologies,
      avatarUrl: dto.avatarUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdUser = await this.userRepository.create(user);

    return createdUser.hideSensitiveData();
  }
}

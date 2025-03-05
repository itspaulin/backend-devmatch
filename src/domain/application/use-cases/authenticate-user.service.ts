import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { HashComparer } from '../cryptography/hash-comparer';
import { Encrypter } from '../cryptography/encrypter';
import { Either, left, right } from '@/core/either';
import { WrongCredentialsError } from './errors/wrong-credentials-error';

interface AuthenticateUserServiceRequest {
  email: string;
  password: string;
}

type AuthenticateUserServiceResponse = Either<
  WrongCredentialsError,
  {
    acessToken: string;
  }
>;

@Injectable()
export class AuthenticateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserServiceRequest): Promise<AuthenticateUserServiceResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const acessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    });

    return right({
      acessToken,
    });
  }
}

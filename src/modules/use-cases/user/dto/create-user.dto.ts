import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Email is required' })
  email: string;

  @MinLength(8, { message: 'Password must to be at least 6 characters long' })
  password: string;

  @IsOptional()
  @IsString()
  githubProfile?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsArray()
  @IsString({ each: true })
  technologies: string[];

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}

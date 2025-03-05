import { Optional } from '@/core/@types/optional';
import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  githubProfile?: string;
  bio?: string;
  technologies: string[];
  avatarUrl?: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get githubProfile() {
    return this.props.githubProfile;
  }

  get bio() {
    return this.props.bio;
  }

  get technologies() {
    return this.props.technologies;
  }

  get avatarUrl() {
    return this.props.avatarUrl;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  setName(name: string) {
    if (name) {
      this.props.name = name;
      this.touch();
    }
  }

  setEmail(email: string) {
    if (email) {
      this.props.email = email;
      this.touch();
    }
  }

  setPassword(password: string) {
    if (password) {
      this.props.password = password;
      this.touch();
    }
  }

  setGithubProfile(githubProfile: string | undefined) {
    if (githubProfile) {
      this.props.githubProfile = githubProfile;
      this.touch();
    }
  }

  setBio(bio: string | undefined) {
    if (bio) {
      this.props.bio = bio;
      this.touch();
    }
  }

  setTechnologies(technologies: string[]) {
    if (technologies.length) {
      this.props.technologies = technologies;
      this.touch();
    }
  }

  setAvatarUrl(avatarUrl: string | undefined) {
    this.props.avatarUrl = avatarUrl;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityId) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return user;
  }
}

import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface UserProps {
  name: string;
  email: string;
  password?: string;
  githubProfile?: string;
  bio?: string;
  technologies: string[];
  avatarUrl?: string;
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

  hideSensitive(): User {
    return new User(
      {
        ...this.props,
        password: undefined,
      },
      this.id,
    );
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    const user = new User(props, id);

    return user;
  }
}

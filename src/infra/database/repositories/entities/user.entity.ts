export class UserEntity {
  id: string;
  name: string;
  email: string;
  password?: string;
  githubProfile?: string;
  bio?: string;
  technologies: string[];
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  hideSensitiveData(): UserEntity {
    delete this.password;
    return this;
  }
}

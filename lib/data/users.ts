export class Users {
  private readonly users: UserType[] = [
    {
      username: User.NormalUser001,
      email: `${User.NormalUser001}@example.com`,
      password: '%nBt*!@chTmH7SyZhyhG',
    },
    {
      username: User.NormalUser002,
      email: `${User.NormalUser002}@example.com`,
      password: 'Jm56&GMwMtBFkpRQBd%!',
    },
  ];

  getUser(username: User): UserType {
    return this.users.find((user) => user.username === username);
  }
}

export interface UserType {
  username: string;
  email: string;
  password: string;
}

export enum User {
  NormalUser001 = 'NormalUser001',
  NormalUser002 = 'NormalUser002',
}

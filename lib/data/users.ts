import { User } from '../src/enums/users';
import { UserType } from '../src/interfaces/userType';

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

  getUser(username: User): {
    username: string;
    email: string;
    password: string;
  } {
    return this.users.find((user) => user.username === username);
  }
}

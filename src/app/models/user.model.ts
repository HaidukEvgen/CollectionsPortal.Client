export interface User {
  id: string;
  username: string;
  email: string;
  lastLogin: string;
  status: UserStatus;
}

export enum UserStatus {
  Active = 'Active',
  Blocked = 'Blocked',
}

export interface TableUser extends User {
  checked: boolean;
}

export interface UserLoginModel {
  username: string;
  password: string;
}

export interface UserRegisterModel {
  username: string;
  email: string;
  password: string;
}

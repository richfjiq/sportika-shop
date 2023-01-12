export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserUpdateData {
  userId?: string;
  name: string;
  email: string;
  currentPassword: string;
}

export interface IUserUpdatePassword {
  userId?: string;
  currentPassword: string;
  newPassword: string;
  repeatPassword?: string;
}

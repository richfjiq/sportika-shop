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

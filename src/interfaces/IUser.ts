export interface IUser {
  _id: string;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserInputDTO {
  userName: string;
  email: string;
  password: string;
}

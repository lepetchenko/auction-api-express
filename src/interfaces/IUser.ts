export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserInputDTO {
  userName: string;
  email: string;
  password: string;
}

import { UploadType } from "./upload";

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: UploadType | undefined;
}
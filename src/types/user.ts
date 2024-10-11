import { UploadType } from "./upload";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: UploadType | undefined;
}
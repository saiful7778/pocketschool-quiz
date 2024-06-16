export interface ApiResponseMessage {
  success: boolean;
  message: string;
}
export interface ApiResponseData<T> {
  success: boolean;
  data: T;
}

export interface UserData {
  _id: string | unknown;
  fullName: string;
  email: string;
  image?: string | null;
  uid: string;
  role: "user" | "admin" | "superAdmin";
  access: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDataResponse {
  id: string;
  role: "user" | "admin" | "superAdmin";
  uid: string;
}

export interface LoginUserDataResponse
  extends ApiResponseData<UserDataResponse> {}

export interface Classroom {
  _id: string | unknown;
  title: string;
  admins: string[] | unknown[];
  users: string[] | unknown[];
  createdAt: Date;
  updatedAt: Date;
}

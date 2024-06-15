export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface UserData {
  _id: string;
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

export type UserLoginResponse = {
  token: string;
  userData: UserDataResponse;
};

export interface classroom {
  title: string;
}

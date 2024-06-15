export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
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

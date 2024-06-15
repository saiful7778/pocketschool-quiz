export interface ApiResponseMessage {
  success: boolean;
  message: string;
}
export interface ApiResponseData<T> {
  success: boolean;
  data: T;
}

export interface UserDataResponse {
  id: string;
  role: "user" | "admin" | "superAdmin";
  uid: string;
}

export interface LoginUserDataResponse
  extends ApiResponseData<UserDataResponse> {}

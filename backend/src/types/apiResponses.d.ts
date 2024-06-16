export interface ApiResponseMessage {
  success: boolean;
  message: string;
}

export interface ApiResponseData<T> {
  success: boolean;
  data: T;
}

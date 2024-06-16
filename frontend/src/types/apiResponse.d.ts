export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ApiResponseMessage {
  success: boolean;
  message: string;
}

export interface ApiResponseData<T> {
  success: boolean;
  data: T;
}

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
// TODO: add update response
export interface UpdateDateResponse {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: string | null;
  upsertedCount: number;
  matchedCount: number;
}

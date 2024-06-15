interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export type UserLoginResponse = {
  token: string;
  userData: {
    id: string;
    email: string;
    role: "user" | "admin" | "superAdmin";
    uid: string;
    access: boolean;
  };
};

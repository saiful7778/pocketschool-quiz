interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export type UserLoginResponse = {
  token: string;
  userData: {
    email: string;
    role: "user" | "admin" | "superAdmin";
    uid: string;
    access: boolean;
  };
};

export interface UserType {
  _id: string;
  fullName: string;
  email: string;
  image?: string | null;
  uid: string;
  role: "user" | "admin" | "superAdmin";
  access: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

export interface ClassroomUser {
  user: {
    _id: string;
    fullName: string;
    image?: string | null;
    email: string;
  };
  role: "user" | "admin";
  access: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassroomMainPage {
  _id: string;
  title: string;
  admin: boolean;
  user: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

export interface user {
  _id: string;
  access: boolean;
  user: {
    _id: string;
    fullName: string;
    image?: string | null;
    email: string;
  };
  role: "user" | "admin";
}

export interface Classroom {
  _id: string;
  title: string;
  users: user[];
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

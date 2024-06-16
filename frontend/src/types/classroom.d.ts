export interface ClassroomMainPage {
  _id: string;
  title: string;
  admin: boolean;
  user: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

type user = {
  access: boolean;
  userId: string;
};

export interface Classroom {
  _id: string;
  title: string;
  admins: user[];
  users: user[];
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

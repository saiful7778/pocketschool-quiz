export interface ResponseType {
  user: string;
  message: string;
  close: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportType {
  _id: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
  };
  title: string;
  category: "issue" | "bug" | "improve" | "feature";
  message: string;
  response?: ResponseType | undefined;
  createdAt: Date;
  updatedAt: Date;
}

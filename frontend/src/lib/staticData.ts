import type { UserType } from "@/types";

export const defaultLoginPage = "/classroom";

export const tableRowPerPage = [5, 10, 15, 20];

type dashboardLinkTypes = {
  navName: string;
  path: string;
  access: UserType["role"][];
};

export const dashboardLinks: dashboardLinkTypes[] = [
  {
    navName: "Classroom",
    path: "/classroom",
    access: ["user", "admin", "superAdmin"],
  },
  {
    navName: "Developer",
    path: "/developer",
    access: ["user", "admin", "superAdmin"],
  },
  {
    navName: "Users",
    path: "/users",
    access: ["superAdmin"],
  },
];

export const defaultLoginPage = "/classroom";

export const tableRowPerPage = [5, 10, 15, 20];

type dashboardLinkTypes = {
  navName: string;
  path: string;
  access: "superAdmin" | "admin" | "user";
};

export const dashboardLinks: dashboardLinkTypes[] = [
  {
    navName: "Classroom",
    path: "/classroom",
    access: "user",
  },
  {
    navName: "Users",
    path: "/users",
    access: "superAdmin",
  },
];

export const defaultLoginPage = "/classrooms";

type dashboardLinkTypes = {
  navName: string;
  path: string;
  access: "superAdmin" | "admin" | "user";
};

export const dashboardLinks: dashboardLinkTypes[] = [
  {
    navName: "Classrooms",
    path: "/classrooms",
    access: "user",
  },
  {
    navName: "Users",
    path: "/users",
    access: "superAdmin",
  },
];

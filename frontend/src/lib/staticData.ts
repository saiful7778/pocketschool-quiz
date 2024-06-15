import type { RoutesPath } from "@/types/route";

type dashboardLinkTypes = {
  navName: string;
  path: RoutesPath;
  access: "superAdmin" | "admin" | "user";
};

export const dashboardLinks: dashboardLinkTypes[] = [
  {
    navName: "Classroom",
    path: "/classroom",
    access: "user",
  },
  {
    navName: "User",
    path: "/user",
    access: "superAdmin",
  },
];
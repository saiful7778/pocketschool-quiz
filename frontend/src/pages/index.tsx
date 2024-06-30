import RootLayout from "@/layouts/RootLayout";
import AuthenticationLayout from "@/layouts/AuthenticationLayout";
import PrivateLayout from "@/layouts/PrivateLayout";
import SuperAdminLayout from "@/layouts/SuperAdminLayout";

import Home from "./Home";
import Login from "./authentication/Login";
import Classroom from "./private/classroom/Classroom";
import SingleClassroom from "./private/classroom/SingleClassroom";
import ClassroomAdminLayout from "./private/classroom/admin/ClassroomAdminLayout";
import ClassroomPublic from "./private/classroom/ClassroomPublic";
import Quiz from "./private/classroom/Quiz";

export {
  RootLayout,
  Home,
  AuthenticationLayout,
  Login,
  PrivateLayout,
  Classroom,
  SingleClassroom,
  Quiz,
  ClassroomPublic,
  ClassroomAdminLayout,
  SuperAdminLayout,
};

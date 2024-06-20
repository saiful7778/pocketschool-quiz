import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  lazyRouteComponent,
} from "@tanstack/react-router";
import {
  RootLayout,
  Home,
  AuthenticationLayout,
  PrivateLayout,
  Classrooms,
  SuperAdminLayout,
  Classroom,
  Quizzes,
} from "@/pages";
import { z } from "zod";

interface RouterContext {
  queryClient: QueryClient;
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const authenticationRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "authentication",
  component: AuthenticationLayout,
});

const loginRoute = createRoute({
  getParentRoute: () => authenticationRoute,
  path: "/login",
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  component: lazyRouteComponent(() => import("@/pages/authentication/Login")),
});

const registerRoute = createRoute({
  getParentRoute: () => authenticationRoute,
  path: "/register",
  validateSearch: z.object({
    classroomId: z.string().optional(),
  }),
  component: lazyRouteComponent(
    () => import("@/pages/authentication/Register"),
  ),
});

const privateRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "private",
  component: PrivateLayout,
});

const classroomsRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: "/classrooms",
  component: Classrooms,
});

const singleClassroomRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: "/classroom/$classroomId",
  component: Classroom,
});

const singleClassroomQuizzesRoute = createRoute({
  getParentRoute: () => singleClassroomRoute,
  path: "/",
  component: Quizzes,
});

const singleClassroomQuizRoute = createRoute({
  getParentRoute: () => singleClassroomRoute,
  path: "/quiz/$quizId",
  component: lazyRouteComponent(
    () => import("@/pages/private/classroom/SingleQuiz"),
  ),
});

const classroomCreateRoute = createRoute({
  getParentRoute: () => singleClassroomRoute,
  path: "/create",
  component: lazyRouteComponent(
    () => import("@/pages/private/classroom/Create"),
  ),
});
const classroomCreateQuizRoute = createRoute({
  getParentRoute: () => singleClassroomRoute,
  path: "/create/quiz",
  component: lazyRouteComponent(
    () => import("@/pages/private/classroom/create/Quiz"),
  ),
});

const classroomUsersRoute = createRoute({
  getParentRoute: () => singleClassroomRoute,
  path: "/users",
  component: lazyRouteComponent(
    () => import("@/pages/private/classroom/ClassroomUsers"),
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: "profile",
  component: lazyRouteComponent(() => import("@/pages/private/Profile")),
});

const superAdminRoute = createRoute({
  getParentRoute: () => privateRoute,
  id: "superAdmin",
  component: SuperAdminLayout,
});

const usersRoute = createRoute({
  getParentRoute: () => superAdminRoute,
  path: "/users",
  component: lazyRouteComponent(
    () => import("@/pages/private/superAdmin/Users"),
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  authenticationRoute.addChildren([loginRoute, registerRoute]),
  privateRoute.addChildren([
    classroomsRoute,
    singleClassroomRoute.addChildren([
      singleClassroomQuizzesRoute,
      singleClassroomQuizRoute,
      classroomCreateRoute,
      classroomCreateQuizRoute,
      classroomUsersRoute,
    ]),
    profileRoute,
    superAdminRoute.addChildren([usersRoute]),
  ]),
]);

export default routeTree;

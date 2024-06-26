import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  lazyRouteComponent,
} from "@tanstack/react-router";
import {
  RootLayout,
  AuthenticationLayout,
  PrivateLayout,
  SuperAdminLayout,
  Home,
  Classroom,
  SingleClassroom,
  ClassroomAdminLayout,
} from "@/pages";
import { z } from "zod";
import ErrorPage from "@/components/shared/Error";

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
  errorComponent: ({ error, reset }) => (
    <ErrorPage error={error} reset={reset} fullPage={false} />
  ),
});

const classroomRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: "/classroom",
  component: Classroom,
});

const singleClassroomRoute = createRoute({
  getParentRoute: () => classroomRoute,
  path: "/$classroomId",
  component: SingleClassroom,
});

const singleClassroomAdminRoute = createRoute({
  getParentRoute: () => singleClassroomRoute,
  id: "classroomAdmin",
  component: ClassroomAdminLayout,
});

const singleClassroomUsersRoute = createRoute({
  getParentRoute: () => singleClassroomAdminRoute,
  path: "/users",
  component: lazyRouteComponent(
    () => import("@/pages/private/classroom/admin/ClassroomUsers"),
  ),
});

const singleClassroomAdminQuizzesRoute = createRoute({
  getParentRoute: () => singleClassroomAdminRoute,
  path: "/quizzes",
  component: lazyRouteComponent(
    () => import("@/pages/private/classroom/admin/AdminQuizzes"),
  ),
});

const singleClassroomAdminQuizUpdateRoute = createRoute({
  getParentRoute: () => singleClassroomAdminRoute,
  path: "/update_quiz/$quizId",
  component: lazyRouteComponent(
    () => import("@/pages/private/classroom/admin/UpdateQuiz"),
  ),
});

const singleClassroomAdminCreateQuizRoute = createRoute({
  getParentRoute: () => singleClassroomAdminRoute,
  path: "/create_quiz",
  component: lazyRouteComponent(
    () => import("@/pages/private/classroom/admin/create/CreateQuiz"),
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
    classroomRoute.addChildren([
      singleClassroomRoute.addChildren([
        singleClassroomAdminRoute.addChildren([
          singleClassroomAdminQuizzesRoute,
          singleClassroomAdminCreateQuizRoute,
          singleClassroomAdminQuizUpdateRoute,
          singleClassroomUsersRoute,
        ]),
      ]),
    ]),
    profileRoute,
    superAdminRoute.addChildren([usersRoute]),
  ]),
]);

export default routeTree;

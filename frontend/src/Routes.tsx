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
  SuperAdminLayout,
  ClassroomLayout,
  Classroom,
  ClassroomAdminLayout,
  ClassroomIndex,
  Quiz,
} from "@/pages";
import { z } from "zod";
import ErrorPage from "@/components/shared/Error";

interface RouterContext {
  queryClient: QueryClient;
}

const rootLayoutRoute = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootLayoutRoute,
  path: "/",
  component: Home,
});

const authenticationLayoutRoute = createRoute({
  getParentRoute: () => rootLayoutRoute,
  id: "authentication",
  component: AuthenticationLayout,
});

const loginRoute = createRoute({
  getParentRoute: () => authenticationLayoutRoute,
  path: "/login",
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  component: lazyRouteComponent(() => import("@/pages/authentication/Login")),
});

const registerRoute = createRoute({
  getParentRoute: () => authenticationLayoutRoute,
  path: "/register",
  validateSearch: z.object({
    classroomId: z.string().optional(),
  }),
  component: lazyRouteComponent(
    () => import("@/pages/authentication/Register"),
  ),
});

const privateLayoutRoute = createRoute({
  getParentRoute: () => rootLayoutRoute,
  id: "private",
  component: PrivateLayout,
  errorComponent: ({ error, reset }) => (
    <ErrorPage error={error} reset={reset} fullPage={false} />
  ),
});

const classroomLayoutRoute = createRoute({
  getParentRoute: () => privateLayoutRoute,
  path: "/classroom",
  component: ClassroomLayout,
});

const classroomRoute = createRoute({
  getParentRoute: () => classroomLayoutRoute,
  path: "/$classroomId",
  component: Classroom,
});

const classroomIndexRoute = createRoute({
  getParentRoute: () => classroomRoute,
  path: "/",
  component: ClassroomIndex,
});

const quizRoute = createRoute({
  getParentRoute: () => classroomRoute,
  path: "/quiz/$quizId",
  component: Quiz,
});

const classroomAdminLayoutRoute = createRoute({
  getParentRoute: () => classroomRoute,
  id: "classroomAdmin",
  component: ClassroomAdminLayout,
});

const classroomDetailsRoute = createRoute({
  getParentRoute: () => classroomAdminLayoutRoute,
  path: "/details",
  component: lazyRouteComponent(
    () => import("@/pages/private/classroom/admin/ClassroomDetails"),
  ),
});

const classroomAdminQuizzesRoute = createRoute({
  getParentRoute: () => classroomAdminLayoutRoute,
  path: "/quizzes",
  component: lazyRouteComponent(
    () => import("@/pages/private/classroom/admin/AdminQuizzes"),
  ),
});

const classroomAdminQuizUpdateRoute = createRoute({
  getParentRoute: () => classroomAdminLayoutRoute,
  path: "/update_quiz/$quizId",
  component: lazyRouteComponent(
    () => import("@/pages/private/classroom/admin/UpdateQuiz"),
  ),
});

const classroomAdminCreateQuizRoute = createRoute({
  getParentRoute: () => classroomAdminLayoutRoute,
  path: "/create_quiz",
  component: lazyRouteComponent(
    () => import("@/pages/private/classroom/admin/create/CreateQuiz"),
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => privateLayoutRoute,
  path: "profile",
  component: lazyRouteComponent(() => import("@/pages/private/Profile")),
});

const superAdminRoute = createRoute({
  getParentRoute: () => privateLayoutRoute,
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

const routeTree = rootLayoutRoute.addChildren([
  homeRoute,
  authenticationLayoutRoute.addChildren([loginRoute, registerRoute]),
  privateLayoutRoute.addChildren([
    classroomLayoutRoute.addChildren([
      classroomRoute.addChildren([
        classroomIndexRoute,
        quizRoute,
        classroomAdminLayoutRoute.addChildren([
          classroomAdminQuizzesRoute,
          classroomAdminCreateQuizRoute,
          classroomAdminQuizUpdateRoute,
          classroomDetailsRoute,
        ]),
      ]),
    ]),
    profileRoute,
    superAdminRoute.addChildren([usersRoute]),
  ]),
]);

export default routeTree;

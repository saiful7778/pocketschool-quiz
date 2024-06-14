import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";

export const Route = createFileRoute("/_authentication/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  component: Login,
});

function Login(): JSX.Element {
  const { redirect } = Route.useSearch();
  console.log(redirect);
  return <div>Hello /(authentication)/login!</div>;
}

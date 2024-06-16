import InputField from "@/components/InputField";
import PasswordField from "@/components/PasswordField";
import Spinner from "@/components/Spinner";
import Button from "@/components/ui/button";
import Form from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import useAuth from "@/hooks/useAuth";
import errorStatus from "@/lib/errorStatus";
import { loginSchema } from "@/lib/schemas/authenticationSchema";
import { defaultLoginPage } from "@/lib/staticData";
import toast from "@/lib/toast/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const Route = createFileRoute("/_authentication/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  component: Login,
});

function Login(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const { redirect } = Route.useSearch();
  const naviagate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleReset = () => {
    return () => {
      form.reset();
      setLoading(false);
    };
  };

  const handleSubmit = async (
    e: z.infer<typeof loginSchema>,
  ): Promise<void> => {
    setLoading(true);
    const reset = handleReset();
    try {
      const { user } = await login(e.email, e.password);

      if (!user.emailVerified) {
        const { sendEmailVerification } = await import("firebase/auth");
        toast({
          variant: "destructive",
          title: "Your email is not verified",
          action: (
            <ToastAction
              onClick={async () => {
                try {
                  await sendEmailVerification(user);
                } catch (err) {
                  if (err instanceof Error) {
                    throw new Error(err.message);
                  }
                }
              }}
              altText="send email verification mail"
            >
              Send verify email
            </ToastAction>
          ),
        });
        return;
      }

      if (redirect) {
        await naviagate({ to: redirect });
      } else {
        await naviagate({ to: defaultLoginPage });
      }

      toast({
        title: "Successfully logged in",
        description: `'${user.displayName}' is logged in.`,
      });
    } catch (err) {
      if (err instanceof Error) {
        errorStatus(err.message);
      }
    } finally {
      reset();
    }
  };

  return (
    <>
      <h2 className="text-center text-2xl font-bold">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <Form.field
            control={form.control}
            name="email"
            render={({ field }) => (
              <InputField
                type="email"
                label="Email address"
                placeholder="Your email"
                disabled={loading}
                {...field}
              />
            )}
          />
          <Form.field
            control={form.control}
            name="password"
            render={({ field }) => (
              <PasswordField
                label="Password"
                placeholder="Password"
                disabled={loading}
                {...field}
              />
            )}
          />
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? <Spinner size={20} /> : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-center">
        Don{`'`}t have an account?{" "}
        <Link className="link" to="/register">
          Register
        </Link>
      </p>
    </>
  );
}

import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas/authentication";
import * as z from "zod";
import Form from "@/components/ui/form";
import InputField from "@/components/InputField";
import PasswordField from "@/components/PasswordField";
import Button from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import useAuth from "@/hooks/useAuth";
import toast from "@/lib/toast/toast";
import errorStatus from "@/lib/errorStatus";

export const Route = createFileRoute("/_authentication/register")({
  validateSearch: z.object({
    classroomId: z.string().optional(),
  }),
  component: RegisterPage,
});

function RegisterPage(): JSX.Element {
  const { classroomId } = Route.useSearch();
  const [loading, setLoading] = useState<boolean>(false);
  const { register } = useAuth();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      classroomId: classroomId || "",
      access: true,
      role: classroomId ? "user" : "admin",
      password: "",
      confirmPassword: "",
    },
  });

  const handleReset = () => {
    return () => {
      form.reset();
      setLoading(false);
    };
  };

  const handleSubmit = async (
    e: z.infer<typeof registerSchema>,
  ): Promise<void> => {
    setLoading(true);
    const reset = handleReset();
    try {
      const { user } = await register(e.email, e.password);
      const { updateProfile, sendEmailVerification } = await import(
        "firebase/auth"
      );
      const { collection, addDoc } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebase");

      await updateProfile(user, {
        displayName: e.fullName,
      });

      await sendEmailVerification(user);

      const userData = {
        fullName: e.fullName,
        email: e.email,
        image: user.photoURL,
        uid: user.uid,
        role: e.role,
        access: e.access,
        classroomId: e.classroomId,
        createdAt: user.metadata.creationTime,
        lastSign: user.metadata.lastSignInTime,
      };

      await addDoc(collection(db, "users"), userData);

      toast({
        title: "Successful",
        description: "Your account is created",
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
      <h2 className="text-center text-2xl font-bold">Register your account</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <Form.field
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <InputField
                type="text"
                label="Full name"
                placeholder="Your full name"
                disabled={loading}
                {...field}
              />
            )}
          />
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
          {classroomId || (
            <Form.field
              control={form.control}
              name="classroomId"
              render={({ field }) => (
                <InputField
                  type="text"
                  label="Classroom ID"
                  placeholder="Classroom ID"
                  disabled={loading}
                  {...field}
                />
              )}
            />
          )}
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
          <Form.field
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <PasswordField
                label="Confirm Password"
                placeholder="Confirm Password"
                disabled={loading}
                {...field}
              />
            )}
          />
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? <Spinner size={20} /> : "Register"}
          </Button>
        </form>
      </Form>
      <p className="text-center">
        Do you have an account?{" "}
        <Link className="link" to="/login">
          Login
        </Link>
      </p>
    </>
  );
}

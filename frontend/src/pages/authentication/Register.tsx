import InputField from "@/components/InputField";
import PasswordField from "@/components/PasswordField";
import Spinner from "@/components/Spinner";
import Button from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Switch from "@/components/ui/switch";
import useAuth from "@/hooks/useAuth";
import { useAxios } from "@/hooks/useAxios";
import errorStatus from "@/lib/errorStatus";
import { registerSchema } from "@/lib/schemas/authenticationSchema";
import toast from "@/lib/toast/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, getRouteApi } from "@tanstack/react-router";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const routeData = getRouteApi("/authentication/register");

const Register: FC = () => {
  const { classroomId } = routeData.useSearch();
  const [loading, setLoading] = useState<boolean>(false);
  const axios = useAxios();
  const { register } = useAuth();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      classroomId: classroomId,
      adminAccess: false,
      access: true,
      role: "user",
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

      await updateProfile(user, {
        displayName: e.fullName,
      });

      await sendEmailVerification(user);
      type userDataType = {
        fullName: string;
        email: string;
        uid: string;
        classroomId?: string;
        role: "user" | "admin" | "superAdmin";
        access: boolean;
      };

      const userData: userDataType = {
        fullName: e.fullName,
        email: e.email,
        uid: user.uid,
        role: e?.adminAccess ? "admin" : e.role,
        access: e.access,
      };

      if (e.role === "user") {
        userData.classroomId = e?.classroomId;
      }

      await axios.post("/user", userData);

      toast({
        title: "Successfully account is created",
        description: "Verification mail is sended in your mail",
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
          <FormField
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <InputField
                type="email"
                label="Email address"
                placeholder="Your email"
                autoComplete="username"
                disabled={loading}
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <PasswordField
                label="Password"
                placeholder="Password"
                disabled={loading}
                autoComplete="new-password"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <PasswordField
                label="Confirm Password"
                placeholder="Confirm Password"
                autoComplete="new-password"
                disabled={loading}
                {...field}
              />
            )}
          />
          {typeof classroomId === "undefined" && (
            <FormField
              control={form.control}
              name="adminAccess"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <FormLabel>Request for admin access</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={loading}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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
};

export default Register;

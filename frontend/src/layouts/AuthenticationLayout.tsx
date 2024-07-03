import AuthProtector from "@/protector/AuthProtector";
import { Outlet } from "@tanstack/react-router";
import { FC } from "react";

const AuthenticationLayout: FC = () => {
  return (
    <AuthProtector>
      <div className="flex min-h-[calc(100vh-90px)] w-full items-center justify-center">
        <div className="w-full max-w-sm space-y-4 rounded-md border p-4 shadow">
          <Outlet />
        </div>
      </div>
    </AuthProtector>
  );
};

export default AuthenticationLayout;

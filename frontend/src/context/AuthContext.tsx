import { useAxios } from "@/hooks/useAxios";
import { auth } from "@/lib/firebase";
import toast from "@/lib/toast/toast";
import type { ApiResponse } from "@/types/apiResponse";
import type { LayoutProps } from "@/types/layout";
import { AxiosError } from "axios";
import {
  type User,
  type UserCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { FC, createContext, useEffect, useState } from "react";
import type { User as UserData } from "@/types/user";

interface AuthContextProps {
  user: User | null;
  token: string | null;
  userData: {
    _id: UserData["_id"];
    role: UserData["role"];
    uid: UserData["uid"];
  } | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  forgetPassword: (email: string) => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

const AuthContextProvider: FC<Readonly<LayoutProps>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<AuthContextProps["userData"]>(null);
  const axios = useAxios();

  const register = async (
    email: string,
    password: string,
  ): Promise<UserCredential> => {
    setLoading(true);
    const { createUserWithEmailAndPassword } = await import("firebase/auth");
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (
    email: string,
    password: string,
  ): Promise<UserCredential> => {
    setLoading(true);
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async (): Promise<void> => {
    setLoading(true);
    const { signOut } = await import("firebase/auth");
    return signOut(auth);
  };

  const forgetPassword = async (email: string): Promise<void> => {
    const { sendPasswordResetEmail } = await import("firebase/auth");
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      (async () => {
        try {
          if (currentUser) {
            if (currentUser.emailVerified) {
              const { data } = await axios.post<
                ApiResponse<{
                  token: string;
                  userData: AuthContextProps["userData"];
                }>
              >("/api/users/login", {
                email: currentUser.email,
              });
              if (!data.success) {
                throw new Error(data?.message);
              }
              if (data?.data) {
                setUser(currentUser);
                setToken(`Bearer ${data?.data.token}`);
                setUserData(data?.data.userData);
              }
            }
          } else {
            setUser(null);
            setToken(null);
            setUserData(null);
          }
        } catch (err) {
          if (err instanceof AxiosError) {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: err?.response?.data?.message,
            });
          }
        } finally {
          setLoading(false);
        }
      })();
    });

    return () => {
      unSubscribe();
    };
  }, [axios]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        userData,
        login,
        register,
        forgetPassword,
        logOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

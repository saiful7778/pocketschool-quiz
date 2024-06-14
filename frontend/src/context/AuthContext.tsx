import { useAxios } from "@/hooks/useAxios";
import { auth } from "@/lib/firebase";
import toast from "@/lib/toast/toast";
import type { ApiResponse, UserLoginResponse } from "@/types/apiResponse";
import type { ContextProps } from "@/types/context";
import { AxiosError, AxiosResponse } from "axios";
import {
  type User,
  type UserCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { FC, createContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: User | null;
  token: string | null;
  userData: UserLoginResponse["userData"] | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

const AuthContextProvider: FC<Readonly<ContextProps>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<
    UserLoginResponse["userData"] | null
  >(null);
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

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      (async () => {
        try {
          if (currentUser && currentUser.emailVerified) {
            const { data }: AxiosResponse<ApiResponse<UserLoginResponse>> =
              await axios.post("/authentication/login", {
                email: currentUser.email,
              });
            if (!data.success) {
              throw new Error(data.message);
            }
            if (data?.data) {
              setUser(currentUser);
              setToken(data?.data.token);
              setUserData(data?.data.userData);
            }
          } else {
            setUser(null);
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
      value={{ user, token, userData, login, register, logOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

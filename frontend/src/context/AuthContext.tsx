import { auth } from "@/lib/firebase";
import { type ContextProps } from "@/types/context";
import {
  type User,
  type UserCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { FC, createContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: User | null;
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
      if (currentUser && currentUser.emailVerified) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

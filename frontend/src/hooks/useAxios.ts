import axiosConfig from "@/configs/axios.config";
import { useCallback, useEffect } from "react";
import useAuth from "./useAuth";

export function useAxiosSecure() {
  const { logOut } = useAuth();

  useEffect(() => {
    axiosConfig.interceptors.response.use(
      (data) => {
        return data;
      },
      (err) => {
        const status = err.response.status;
        if (status === 401 || status === 403) {
          logOut()
            .then(() => {})
            .catch((err) => {
              if (err instanceof Error) {
                throw new Error(err.message);
              }
            });
        }
      },
    );
  }, [logOut]);

  return axiosConfig;
}

export function useAxios() {
  return useCallback(axiosConfig, []);
}

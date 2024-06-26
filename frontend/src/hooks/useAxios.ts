import axiosConfig from "@/configs/axios.config";
import { useCallback, useEffect } from "react";
import useAuth from "./useAuth";

export function useAxiosSecure() {
  const { user, userData, token, logOut } = useAuth();
  const axios = useCallback(axiosConfig, []);

  useEffect(() => {
    axios.interceptors.request.use((config) => {
      config.params = {
        ...config.params,
        email: user?.email,
        userId: userData?._id,
      };

      config.headers["Authorization"] = token;
      return config;
    });
  }, [axios, token, user?.email, userData?._id]);

  useEffect(() => {
    axios.interceptors.response.use(
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
  }, [axios, logOut]);

  return axios;
}

export function useAxios() {
  return useCallback(axiosConfig, []);
}

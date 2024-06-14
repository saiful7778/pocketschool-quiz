import axiosConfig from "@/configs/axios.config";
import { useCallback } from "react";

export function useAxios() {
  return useCallback(axiosConfig, []);
}

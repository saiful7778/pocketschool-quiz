"use client";
import dispatch, { listeners, memoryState } from "@/lib/toast/dispatch";
import toast from "@/lib/toast/toast";
import { State } from "@/types/toastTypes";
import { useEffect, useState } from "react";

export default function useToast() {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

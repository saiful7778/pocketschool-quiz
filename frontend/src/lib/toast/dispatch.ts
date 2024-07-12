import type { Action, State } from "@/types";
import reducer from "./reducer";

export let memoryState: State = { toasts: [] };
// eslint-disable-next-line no-unused-vars
export const listeners: Array<(state: State) => void> = [];

export default function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { FC } from "react";

const RouterDevTools: FC = () => {
  return <TanStackRouterDevtools initialIsOpen={false} />;
};

export default RouterDevTools;

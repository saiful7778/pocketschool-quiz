import { FileRoutesByPath } from "@tanstack/react-router";

type ExtractPaths<T> = T extends { [K in keyof T]: { path: infer P } }
  ? P extends ""
    ? never
    : P
  : never;

export type RoutesPath = ExtractPaths<FileRoutesByPath>;

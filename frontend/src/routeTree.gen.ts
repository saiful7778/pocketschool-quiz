/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticationImport } from './routes/_authentication'
import { Route as IndexImport } from './routes/index'
import { Route as AuthenticationRegisterImport } from './routes/_authentication/register'
import { Route as AuthenticationLoginImport } from './routes/_authentication/login'

// Create/Update Routes

const AuthenticationRoute = AuthenticationImport.update({
  id: '/_authentication',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticationRegisterRoute = AuthenticationRegisterImport.update({
  path: '/register',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticationLoginRoute = AuthenticationLoginImport.update({
  path: '/login',
  getParentRoute: () => AuthenticationRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authentication': {
      id: '/_authentication'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticationImport
      parentRoute: typeof rootRoute
    }
    '/_authentication/login': {
      id: '/_authentication/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthenticationLoginImport
      parentRoute: typeof AuthenticationImport
    }
    '/_authentication/register': {
      id: '/_authentication/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof AuthenticationRegisterImport
      parentRoute: typeof AuthenticationImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthenticationRoute: AuthenticationRoute.addChildren({
    AuthenticationLoginRoute,
    AuthenticationRegisterRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authentication"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authentication": {
      "filePath": "_authentication.tsx",
      "children": [
        "/_authentication/login",
        "/_authentication/register"
      ]
    },
    "/_authentication/login": {
      "filePath": "_authentication/login.tsx",
      "parent": "/_authentication"
    },
    "/_authentication/register": {
      "filePath": "_authentication/register.tsx",
      "parent": "/_authentication"
    }
  }
}
ROUTE_MANIFEST_END */

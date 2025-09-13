import {ProtectedRoute} from "./ProtectedRoute.tsx";
import {PublicRoute} from "./PublicRoute.tsx";

export const routes = [
  {
    path: '/register',
    element: (
      <PublicRoute>
        <h1>Register</h1>
      </PublicRoute>
    )
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <h1>Login</h1>
      </PublicRoute>
    )
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <h1>Main App</h1>
      </ProtectedRoute>
    )
  }
]
import {ProtectedRoute} from "./ProtectedRoute.tsx";
import {PublicRoute} from "./PublicRoute.tsx";
import {AuthPage} from "@pages/AuthPage.tsx"

export const routes = [
  {
    path: '/auth',
    element: (
      <PublicRoute>
        <AuthPage/>
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
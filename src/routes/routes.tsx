import {ProtectedRoute} from "./ProtectedRoute.tsx";
import {PublicRoute} from "./PublicRoute.tsx";
import {AuthPage} from "@pages/AuthPage.tsx"
import {DashboardPage} from "@pages/DashboardPage.tsx";

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
        <DashboardPage/>
      </ProtectedRoute>
    )
  }
]
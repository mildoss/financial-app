import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { PublicRoute } from "./PublicRoute.tsx";
import { AuthPage } from "@pages/AuthPage/AuthPage.tsx";
import { DashboardPage } from "@pages/DashboardPage/DashboardPage.tsx";
import { Layout } from "../layout/Layout.tsx";
import { TransactionsPage } from "@pages/TransactionsPage/TransactionsPage.tsx";
import { StatsPage } from "@pages/StatsPage/StatsPage.tsx";

export const routes = [
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthPage />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "transaction",
        element: <TransactionsPage />,
      },
      {
        path: "stats",
        element: <StatsPage />,
      },
    ],
  },
];

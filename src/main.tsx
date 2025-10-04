import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { StoreProvider } from "./providers/StoreProvider.tsx";
import { RouterProvider } from "./providers/RouterProvider.tsx";
import { AuthProvider } from "./providers/AuthProvider.tsx";
import {ToastProvider} from "./providers/ToastProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <AuthProvider>
        <ToastProvider>
          <RouterProvider />
        </ToastProvider>
      </AuthProvider>
    </StoreProvider>
  </StrictMode>,
);

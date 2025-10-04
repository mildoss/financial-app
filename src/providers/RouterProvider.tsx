import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import { routes } from "@routes/routes";

const router = createBrowserRouter(routes);

export const RouterProvider = () => {
  return <ReactRouterProvider router={router} />;
};

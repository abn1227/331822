import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginView from "../views/LoginView";
import LandingView from "../views/LandingView";
import RegisterView from "../views/RegisterView/index";

const RouterCutom = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingView />,
    },
    {
      path: "/about",
      element: <h1>About</h1>,
    },
    {
      path: "/contact",
      element: <h1>Contact</h1>,
    },
    {
      path: "/login",
      element: <LoginView />,
    },
    {
      path: "/register",
      element: <RegisterView />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default RouterCutom;
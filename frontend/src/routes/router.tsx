import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginView from "../views/LoginView";
import LandingView from "../views/LandingView";
import RegisterView from "../views/RegisterView/index";
import HandyManManagementView from "../views/HandyManManagementView/index";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProfileView from "@/views/ProfileView";
import MyJobPetitionsView from "@/views/MyJobPetitionsView";
import JobManagementView from "@/views/JobManagementView";
import JobManagementDetail from "@/views/JobManagementView/JobManagementDetail";

const RouterCustom = () => {
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
    {
      path: "/handyman",
      element: (
        <ProtectedRoute roles={["admin"]}>
          <HandyManManagementView />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <ProfileView />
        </ProtectedRoute>
      ),
    },
    {
      path: "/my-petitions",
      element: (
        <ProtectedRoute>
          <MyJobPetitionsView />
        </ProtectedRoute>
      ),
    },
    {
      path: "/job-petitions",
      element: (
        <ProtectedRoute roles={["admin"]}>
          <JobManagementView />
        </ProtectedRoute>
      ),
    },
    {
      path: "/job-petitions/:id",
      element: (
        <ProtectedRoute roles={["admin"]}>
          <JobManagementDetail />
        </ProtectedRoute>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default RouterCustom;

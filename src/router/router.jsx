import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../Page/Login";
import Register from "../Page/Register";
import Profile from "../Page/Profile";
import RequiredRoute from "../Components/RequiredRoute";
import AdminRoute from "../Components/AdminRoute";
import Dashboard from "../Dashboard/Dashbaord";
import UserInformation from "../Dashboard/UserInformation";
import UserFullInformation from "../Dashboard/UserFullInformation";
import ViewMap from "../Dashboard/ViewMap";
import VerifyOtp from "../Page/VerifyOtp";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequiredRoute>
        <Profile />
      </RequiredRoute>
    ),
  },
  {
    path: "/track-loaction",
    element: (
      <RequiredRoute>
        <Profile />
      </RequiredRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        index: true, // Default child route when navigating to /dashboard
        element: <Navigate to="user-information" replace />,
      },
      {
        path: "user-information",
        element: <UserInformation />,
      },
      {
        path: "user-information/:id",
        element: <UserFullInformation />,
      },
      {
        path: "view-map/:id",
        element: <ViewMap />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "verify-otp",
    element: <VerifyOtp />,
  },
]);

export default router;

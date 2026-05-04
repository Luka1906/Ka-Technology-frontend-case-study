import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Inbox from "./components/userProfile/Inbox";
import "./index.css";

import { loginAction, logoutAction, signUpAction } from "./pages/action";
import { inboxLoader, userStatusLoader } from "./pages/loader";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Signup />,
          action: signUpAction,
        },
        {
          path: "login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "profile",
          element: <Profile />,
          loader: userStatusLoader,
          children: [
            {
              index: true,
              element: <Inbox />,
              loader: inboxLoader,
            },
          ],
        },
        {
          path: "logout",
          action: logoutAction,
        },
      ],
    },
  ]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-violet-950 font-primary text-white">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

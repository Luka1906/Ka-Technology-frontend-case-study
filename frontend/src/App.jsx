import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Inbox from "./components/userProfile/Inbox";
import "./index.css";

import {
  loginAction,
  logoutAction,
  sendEmailAction,
  signUpAction,
} from "./pages/action";
import { inboxLoader, profileLoader, userStatusLoader } from "./pages/loader";
import SentEmails from "./pages/SentEmails";

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
          id: "profile",
          element: <Profile />,
          loader: profileLoader,
          children: [
            {
              index: true,
              element: <Inbox />,
            },
            { path: "send", action: sendEmailAction },
            {
              path: "sent", element: <SentEmails/>
            }
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

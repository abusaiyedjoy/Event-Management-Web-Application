import {
  createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import LandingPage from './../Pages/LandingPage';
import SignIn from './../Pages/SignIn';
import SignUp from './../Pages/SignUp';
import AddEvent from "../Pages/AddEvent";
import NotFoundPage from './../Pages/ErrorPage';
import EventsPage from "../Pages/Events";
import MyEventsPage from "../Pages/MyEventPage";
import PrivateRoute from "../Components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage/>,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: "/add-event",
        element: <PrivateRoute><AddEvent /></PrivateRoute>
      },
      {
        path: "/event",
        element: <PrivateRoute><EventsPage /></PrivateRoute>
      },
      {
        path: "/my-event",
        element: <PrivateRoute><MyEventsPage /></PrivateRoute>
      },
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
    ]
  }
]);

export default router;
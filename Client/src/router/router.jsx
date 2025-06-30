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
        element: <AddEvent />
      },
      {
        path: "/event",
        element: <EventsPage />
      },
      {
        path: "/my-event",
        element: <MyEventsPage />
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
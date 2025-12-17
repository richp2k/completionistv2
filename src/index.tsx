import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import AppLoginLanding from "./components/AppLogin";
import CollectionGenerator from "./pages/collectionsGenerator";
import CollectionsPage from "./pages/collections";
import AdminPage from "./pages/admin";
import RootLayout from "./RootLayout";
import ChangelogPage from "./pages/changelog";
import HomePage from "./pages/home";
import HelpPage from "./pages/help";
import ContactPage from "./pages/contact";
import DonatePage from "./pages/donate";

//have to use hash router for githubpages
const router = createHashRouter([
  {
    path: "*",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/user/:profileId",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/collections",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <CollectionsPage />,
      },
    ],
  },
  {
    path: "/collections/generator",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <CollectionGenerator />,
      },
    ],
  },
  {
    path: "/howtouse",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HelpPage />,
      },
    ],
  },
  {
    path: "/contact",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ContactPage />,
      },
    ],
  },
  {
    path: "/donate",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DonatePage />,
      },
    ],
  },
  {
    path: "/changelog",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ChangelogPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
  // {
  //   path: "/statistics",
  //   element: <Statistics />,
  // },
  {
    path: "/apploginlanding",
    element: <AppLoginLanding />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

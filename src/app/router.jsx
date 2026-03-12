import Layout from "./layout/Layout.jsx";
import Home from "../pages/Home.jsx";
import Services from "../pages/Services.jsx";
import Prices from "../pages/Prices.jsx";
import Articles from "../pages/Articles.jsx";
import Reviews from "../pages/Reviews.jsx";
import Contacts from "../pages/Contacts.jsx";
import NotFound from "../pages/NotFound.jsx";

export const routes = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/services", element: <Services /> },
      { path: "/prices", element: <Prices /> },
      { path: "/articles", element: <Articles /> },
      { path: "/reviews", element: <Reviews /> },
      { path: "/contacts", element: <Contacts /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
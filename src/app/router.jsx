import Layout from "./layout/Layout.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Services from "../pages/Services.jsx";
import Training from "../pages/Training.jsx";
import Prices from "../pages/Prices.jsx";
import Articles from "../pages/Articles.jsx";
import Reviews from "../pages/Reviews.jsx";
import Contacts from "../pages/Contacts.jsx";
import NotFound from "../pages/NotFound.jsx";
import ArticlePage from "../pages/ArticlePage.jsx";

export const routes = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/services", element: <Services /> },
      { path: "/training", element: <Training /> },
      { path: "/prices", element: <Prices /> },
      { path: "/articles", element: <Articles /> },
      { path: "/reviews", element: <Reviews /> },
      { path: "/contacts", element: <Contacts /> },
      { path: "/articles/:slug", element: <ArticlePage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

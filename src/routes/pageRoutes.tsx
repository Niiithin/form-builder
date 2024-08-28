/* Imports */
import { lazy } from "react";

/* Relative Imports */

/* Local Imports */
import { ADMIN_ROUTES, PAGE_ROUTES, ROOT_PATH } from "./paths";

// ----------------------------------------------------------------------
const HomePage = lazy(() => import("views/pages/home"));
const AboutUs = lazy(() => import("views/pages/about-us"));
const Services = lazy(() => import("views/pages/services"));
const ContactUs = lazy(() => import("views/pages/contact-us"));
const MainLayout = lazy(() => import("views/pages/layout/MainLayout"));
// ----------------------------------------------------------------------

/**
 * assign components to routes
 *
 * @return {array}
 */
const PageRoutes: Array<object> = [
  {
    path: ROOT_PATH,
    element: <HomePage />,
  },

  {
    path: PAGE_ROUTES.home.relativePath,
    element: <HomePage />,
  },
  {
    path: PAGE_ROUTES.about.relativePath,
    element: <AboutUs />,
  },
  {
    path: PAGE_ROUTES.contactUs.relativePath,
    element: <ContactUs />,
  },
  {
    path: PAGE_ROUTES.services.relativePath,
    element: <Services />,
  },
];

/**
 * assign component to no found routes
 *
 * @return {array}
 */
// export const NotFoundRoutes: Array<object> = [
//   {
//     path: "*",
//     element: <NotFoundPage />,
//   },
// ];

export default PageRoutes;

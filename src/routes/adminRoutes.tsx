import { lazy } from "react";

/* Relative Imports */

/* Local Imports */
import { ADMIN_ROUTES, ROOT_PATH } from "./paths";

// ----------------------------------------------------------------------
const AdminDashboard = lazy(() => import("views/admin-dashboard/admin-panel"));
const CreateForm = lazy(() => import("views/admin-dashboard/create-form"));
const UserFeedback = lazy(() => import("views/admin-dashboard/user-feedback"));
// ----------------------------------------------------------------------

/**
 * assign components to routes
 *
 * @return {array}
 */
const RootRoutes: Array<object> = [
  {
    path: ADMIN_ROUTES.adminDashboard.relativePath,
    element: <AdminDashboard />,
  },
  {
    path: ADMIN_ROUTES.createForm.relativePath,
    element: <CreateForm />,
  },

  {
    path: ADMIN_ROUTES.useFeedbacks.relativePath,
    element: <UserFeedback />,
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

export default RootRoutes;

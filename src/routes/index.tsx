/* Imports */
import { Suspense, useState } from "react";
import { useRoutes } from "react-router-dom";

/* Relative Imports */
import LoadingScreen from "components/LoadingScreen";

/* Local Imports */
import RootRoutes from "./adminRoutes";
import PageRoutes from "./pageRoutes";

// ----------------------------------------------------------------------

/* Merge Routes */
// const routes = [
//   ...RootRoutes
//   // ...AdminDashboardRoutes,
//   // ...CompanyDashboardRoutes
// ];

/**
 * Create routing with the routes
 *
 * @return {JSX.Element}
 */
const Routing: React.FC = (): JSX.Element => {
  const [routes, setRoutes] = useState([...RootRoutes, ...PageRoutes]);
  const content = useRoutes(routes);

  return <Suspense fallback={<LoadingScreen />}>{content}</Suspense>;
};

export default Routing;

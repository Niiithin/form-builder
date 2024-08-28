/* Imports */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

/* Relative Imports */
import ThemeConfig from "theme";
import Routing from "routes";
import { Provider } from "react-redux";
import store from "store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Routing from "routes";

// ----------------------------------------------------------------------

/**
 * App component to to set all the higher level components and routes.
 *
 * @component
 * @returns {JSX.Element}
 */
const App: React.FC = (): JSX.Element => {
  return (
    <HelmetProvider>
      <ThemeConfig>
        <Provider store={store}>
          <Router>
            <Routing />
          </Router>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Provider>
      </ThemeConfig>
    </HelmetProvider>
  );
};

export default App;

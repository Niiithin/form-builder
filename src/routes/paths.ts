/* Constants */
const ROOT_PATH = "/";
const ADMIN_ROOT = "/admin";
/* Home Page */
export { ROOT_PATH };

/* Root Pages */
export const PAGE_ROUTES = {
  home: {
    relativePath: "home",
    absolutePath: `/${ROOT_PATH}/home`,
  },
  about: {
    relativePath: "about",
    absolutePath: `/${ROOT_PATH}/about`,
  },
  services: {
    relativePath: "services",
    absolutePath: `/${ROOT_PATH}/services`,
  },
  contactUs: {
    relativePath: "contact",
    absolutePath: `/${ROOT_PATH}/contact`,
  },
};

/* ADMIN Pages */
export const ADMIN_ROUTES = {
  adminDashboard: {
    relativePath: "admin-dashboard",
    absolutePath: `${ADMIN_ROOT}/admin-dashboard`,
  },
  createForm: {
    relativePath: "create-form",
    absolutePath: `${ADMIN_ROOT}/create-form`,
  },
  useFeedbacks: {
    relativePath: "user-feedback",
    absolutePath: `${ADMIN_ROOT}/user-feedback`,
  },
};

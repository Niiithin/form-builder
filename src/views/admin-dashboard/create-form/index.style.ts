export default {
  header: (theme: any) => ({
    backgroundColor: "#f5f5f5",
    paddingX: theme.spacing(3),
    paddingY: theme.spacing(1),
    boxShadow: "-2px 0 20px rgba(0,0,0,0.1)",
  }),
  mainPanel: (theme: any) => ({}),

  addFieldsButton: {
    textTransform: "none",
  },
  formContainer: (theme: any) => ({
    backgroundColor: "#f5f5f5",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "auto",
    paddingY: 5,
  }),
  titleContainer: (theme: any) => ({
    display: "flex",
    alignItems: "center",
    width: "500px",
    borderRadius: "8px 8px 0 0",
    backgroundColor: theme.palette.primary.main,
  }),

  formTitle: (theme: any) => ({
    marginX: theme.spacing(2),
    color: theme.palette.common.white,
  }),

  formFields: (theme: any) => ({
    backgroundColor: theme.palette.common.white,
    paddingX: theme.spacing(2),
    width: "500px",
    // paddingY: theme.spacing(1),
    borderRadius: "0 0 8px 8px",
  }),
  formBox: (theme: any) => ({
    elevation: 3,
    borderRadius: 1,
    marginBottom: "20px",
    padding: 1,
    marginTop: "20px",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
  }),
  buttonContainer: {
    display: "flex",
    marginTop: "20px",
  },
  saveButton: (theme: any) => ({
    backgroundColor: theme.palette.primary.main,
  }),
  publishButton: (theme: any) => ({
    backgroundColor: theme.palette.secondary.main,
  }),

  rootComponent: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  contentContainer: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },

  sidebar: {
    width: "300px",
    borderLeft: "1px solid #e0e0e0",
    overflow: "auto",
  },

  emptyFormSpace: {
    padding: "20px",
    textAlign: "center",
    borderRadius: "0 0 8px 8px",
    width: "500px",
    height: "500px",
    backgroundColor: "white",
    elevation: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "-2px 0 20px rgba(0,0,0,0.1)",
  },
};

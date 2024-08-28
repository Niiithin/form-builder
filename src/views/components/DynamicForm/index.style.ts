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
    backgroundColor: "white",
    width: "500px",
    height: "500px",
    borderRadius: 2,
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
  }),
  titleContainer: (theme: any) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // width: "500px",
    borderRadius: "8px 8px 0 0",
    padding: 2,
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
    paddingY: theme.spacing(1),
    borderRadius: "0 0 8px 8px",
    flex: 1,
    overflowY: "auto",
  }),
  formBox: (theme: any) => ({
    elevation: 3,
    borderRadius: 1,
    marginBottom: "20px",
    padding: 1,
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
    border: "2px dashed #ccc",
    borderRadius: "4px",
    width: "500px",
  },
};

export default {
  mainContainer: (theme: any) => ({
    width: 310,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: "8px", // Ensure this is applied correctly
    border: "1px solid #ddd", // For debugging
    backgroundColor: "#fff", // For debugging
    elevation: 3,
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
  }),
  image: (theme: any) => ({
    paddingY: theme.spacing(1),
    backgroundColor: theme.palette.info.main,
    textAlign: "center",
    marginBottom: theme.spacing(2),
    borderRadius: "8px 8px 0 0",
  }),
  textHeading: (theme: any) => ({
    color: theme.palette.secondary.light,
  }),
  textDesc: (theme: any) => ({
    color: theme.palette.common.black,
  }),
  button: (theme: any) => ({
    padding: 2,
    color: theme.palette.common.white,
  }),
};

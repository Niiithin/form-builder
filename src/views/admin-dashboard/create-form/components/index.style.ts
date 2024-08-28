export default {
  mainContainer: (theme: any) => ({
    width: 300,
    height: "100%",
    backgroundColor: "white",
    position: "fixed",
    right: 0,
    top: 65,
    paddingX: theme.spacing(1),
    boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
    marginBottom: 20,
  }),
  heading: (theme: any) => ({
    padding: theme.spacing(2),
  }),
  listContainer: {
    flex: 1,
    overflowY: "auto",
    minHeight: 60,
  },
  sidebarList: (theme: any) => ({
    padding: 0,
    "& .MuiListItemButton-root": {
      [theme.breakpoints.up("md")]: {
        paddingX: 3,
      },
    },
  }),

  container: {
    width: 240,
    flexShrink: 0,
    borderLeft: "1px solid #e0e0e0",
    padding: 2,
    display: "flex",
    flexDirection: "column",
  },
  backButton: {
    alignSelf: "flex-start",
    mb: 2,
  },
  title: {
    mb: 2,
  },
  updateButton: {
    mt: 2,
  },
};

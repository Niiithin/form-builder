export default {
  mainContainer: (theme: any) => ({
    margin: theme.spacing(10),
  }),
  titleBox: (theme: any) => ({
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  }),
  title: (theme: any) => ({
    color: theme.palette.common.white,
  }),
  views: (theme: any) => ({
    color: theme.palette.common.black,
  }),
  viewsTitle: (theme: any) => ({
    color: theme.palette.secondary.light,
  }),
  viewContainer: (theme: any) => ({
    marginX: theme.spacing(15),
    marginY: theme.spacing(3),
  }),
};

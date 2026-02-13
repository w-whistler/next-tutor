import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wheat: {
    width: 32,
    height: 32,
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      left: "50%",
      top: "50%",
      width: 8,
      height: 8,
      marginLeft: -4,
      marginTop: -4,
      borderRadius: "50%",
      backgroundColor: "#9A7B00",
      animation: "$pulse 1s ease-in-out infinite",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      left: "50%",
      top: "50%",
      width: 24,
      height: 24,
      marginLeft: -12,
      marginTop: -12,
      border: "3px solid transparent",
      borderTopColor: "#C9A227",
      borderRightColor: "#E6C547",
      borderRadius: "50%",
      animation: "$spin 0.8s linear infinite",
    },
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  "@keyframes pulse": {
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0.5 },
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(253, 248, 240, 0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
});

export default function CropSpinner({ overlay }) {
  const classes = useStyles();
  const content = (
    <Box className={classes.root}>
      <span className={classes.wheat} aria-hidden="true" />
    </Box>
  );

  if (overlay) {
    return (
      <Box className={classes.overlay} role="progressbar" aria-label="Loading">
        {content}
      </Box>
    );
  }

  return content;
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import cmcLogo from "../assets/cmc.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "rgba(27, 28, 32, 0.9)",
    borderBottom: "1px solid rgba(37, 37, 39)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "flex",
    flexGrow: 1,
  },
  logo: {
    marginRight: theme.spacing(1),
    alignItems: "center",
  },
}));

function Appbar({ onOpen }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={onOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            <img
              className={classes.logo}
              height="28px"
              width="28px"
              alt="logo"
              src={cmcLogo}
            />
            CoinMarketCap
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Appbar;

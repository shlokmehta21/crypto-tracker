import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { List, Typography } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import cmcLogo from "../assets/cmc.svg";
import { Close } from "@material-ui/icons";

const drawerWith = "100%";

const useStyles = makeStyles((theme) => {
  return {
    sideDrawer: {
      width: drawerWith,
    },
    drawerpaper: {
      width: drawerWith,
      backgroundColor: "rgba(23, 25, 36)",
    },
    head: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      display: "flex",
      padding: theme.spacing(4),
    },
    logo: {
      marginRight: theme.spacing(1),
    },
    closeBtn: {
      marginRight: theme.spacing(3),
      padding: theme.spacing(1),
      cursor: "pointer",
      "&:hover": {
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        backgroundColor: "#323546",
      },
    },
  };
});

function SideDrawer({ isOpen, onClose }) {
  const classes = useStyles();
  const list = () => (
    <div onClick={onClose}>
      <List>
        <ListItem button>
          <Typography>Home</Typography>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Drawer
      className={classes.sideDrawer}
      anchor={"left"}
      open={isOpen}
      onClose={onClose}
      classes={{ paper: classes.drawerpaper }}
    >
      <div className={classes.head}>
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
        <Close button onClick={onClose} className={classes.closeBtn} />
      </div>
      {list()}
    </Drawer>
  );
}

export default SideDrawer;

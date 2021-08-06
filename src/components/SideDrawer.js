import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { List, Typography } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const drawerWith = 240;

const useStyles = makeStyles((theme) => {
  return {
    sideDrawer: {
      width: drawerWith,
    },
    drawerpaper: {
      width: drawerWith,
      backgroundColor: "rgba(23, 25, 36)",
    },
    title: {
      padding: theme.spacing(3),
    },
  };
});

function SideDrawer({ isOpen, onClose }) {
  const classes = useStyles();
  const list = () => (
    <div onClick={onClose}>
      <List>
        <ListItem button>It works hell yeah...</ListItem>
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
      <div className={classes.title}>
        <Typography variant="h5">CoinMarketCap</Typography>
      </div>
      {list()}
    </Drawer>
  );
}

export default SideDrawer;

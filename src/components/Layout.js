import React, { useState } from "react";
import Appbar from "./Appbar";
import SideDrawer from "./SideDrawer";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {};
});

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    setIsOpen(open);
  };

  const open = toggleDrawer(true);
  const close = toggleDrawer(false);
  return (
    <>
      <Appbar onOpen={open} />
      <SideDrawer isOpen={isOpen} onClose={close} />
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </>
  );
}

export default Layout;

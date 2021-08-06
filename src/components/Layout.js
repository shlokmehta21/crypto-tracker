import React, { useState } from "react";
import Appbar from "./Appbar";
import SideDrawer from "./SideDrawer";

function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setIsOpen(open);
  };

  const open = toggleDrawer(true);
  const close = toggleDrawer(false);
  return (
    <>
      <Appbar onOpen={open} />
      <SideDrawer isOpen={isOpen} onClose={close} />
    </>
  );
}

export default Layout;

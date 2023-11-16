import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import { useTask } from "../../hooks/useTask";
export default function TaskMenu() {
  const { isTaskMenuOpen, setIsTaskMenuOpen, anchorRef } = useTask();
  const handleCloseTaskMenu = () => {
    setIsTaskMenuOpen(false);
  };
  return (
    <div>
      <Menu
        anchorEl={anchorRef}
        id="basic-menu"
        open={isTaskMenuOpen}
        onClose={handleCloseTaskMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCloseTaskMenu}>Yes</MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseTaskMenu}>Half</MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseTaskMenu}>No</MenuItem>
      </Menu>
    </div>
  );
}

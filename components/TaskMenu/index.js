import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import { useTask } from "../../hooks/useTask";
export default function TaskMenu(props) {
  const {
    isTaskMenuOpen,
    setIsTaskMenuOpen,
    anchorRef,
    selectedTaskInstance,
    setTasks,
  } = useTask();
  const { onUpdateTaskStatus } = props;
  const handleCloseTaskMenu = () => {
    setIsTaskMenuOpen(false);
  };

  // const handleUpdateTaskMenu = (event) => {

  //   handleCloseTaskMenu();
  // };
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
        <MenuItem
          onClick={(event) => onUpdateTaskStatus(event, selectedTaskInstance)}
        >
          Yes
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={(event) => onUpdateTaskStatus(event, selectedTaskInstance)}
        >
          Half
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={(event) => onUpdateTaskStatus(event, selectedTaskInstance)}
        >
          No
        </MenuItem>
      </Menu>
    </div>
  );
}

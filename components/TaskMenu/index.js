import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

export default function TaskMenu(props) {
  const { onUpdateTaskStatus, isOpen, anchorRef, selectedTaskInstance } = props;

  return (
    <div>
      <Menu
        anchorEl={anchorRef}
        id="basic-menu"
        open={isOpen}
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

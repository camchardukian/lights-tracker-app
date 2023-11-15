import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTask } from "../../hooks/useTask";
export default function TaskMenu() {
  const { isTaskMenuOpen, anchorRef } = useTask();
  console.log("anchorRef", anchorRef);
  return (
    <div>
      <Menu
        anchorEl={anchorRef}
        id="basic-menu"
        open={isTaskMenuOpen}
        onClose={() => console.log("closee")}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => console.log("onClose")}>Yes</MenuItem>
      </Menu>
    </div>
  );
}

import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import { useTask } from "../../hooks/useTask";
export default function TaskMenu() {
  const {
    isTaskMenuOpen,
    setIsTaskMenuOpen,
    anchorRef,
    selectedTaskInstance,
    setTasks,
  } = useTask();
  const handleCloseTaskMenu = (event) => {
    setTasks((prevState) => {
      return prevState.map((task) => {
        if (task.id === selectedTaskInstance.task.id) {
          const updatedDays = task.days.map((day) => {
            if (day.day === selectedTaskInstance.day.day) {
              return { ...day, completed: event.target.textContent };
            }
            return day;
          });
          return { ...task, days: updatedDays };
        }
        return task;
      });
    });
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

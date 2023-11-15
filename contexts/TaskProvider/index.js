import React, { useState } from "react";
import TaskContext from "../../hooks/useTask";
function TaskProvider({ children }) {
  const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);
  const [anchorRef, setAnchorRef] = useState(null);
  return (
    <TaskContext.Provider
      value={{ isTaskMenuOpen, setIsTaskMenuOpen, anchorRef, setAnchorRef }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;

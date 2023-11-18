import React, { useState } from "react";
import TaskContext from "../../hooks/useTask";
import { tasks as tasksData } from "../../components/Table/tasks";
function TaskProvider({ children }) {
  const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);
  const [anchorRef, setAnchorRef] = useState(null);
  const [tasks, setTasks] = useState(tasksData);
  const [selectedTaskInstance, setSelectedTaskInstance] = useState({});
  return (
    <TaskContext.Provider
      value={{
        isTaskMenuOpen,
        setIsTaskMenuOpen,
        anchorRef,
        setAnchorRef,
        tasks,
        setTasks,
        selectedTaskInstance,
        setSelectedTaskInstance,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;

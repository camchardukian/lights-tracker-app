import { createContext, useContext } from "react";

const TaskContext = createContext({});

export function useTask() {
  return useContext(TaskContext);
}

export default TaskContext;

import { useEffect, useState } from "react";
import TaskRow from "../TaskRow";
import TaskMenu from "../TaskMenu";
import styles from "./styles.module.scss";

import { tasks as initialTasks } from "./tasks";
import { useTask } from "../../hooks/useTask";
import { Input } from "@mui/material";

export default function Table() {
  const { isTaskMenuOpen, anchorRef, tasks, setTasks } = useTask();
  const [currentText, setCurrentText] = useState("");
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTask(event);
    }
  };
  const handleAddTask = (event) => {
    const { value } = event.target;
    if (!value) return;
    setTasks((prevState) => {
      return prevState.concat({
        name: value,
        days: [
          { day: 1, completed: "no" },
          { day: 2, completed: "no" },
          { day: 3, completed: "no" },
        ],
        id: Math.random(),
      });
    });
    setCurrentText("");
  };

  const handleSetValue = (event) => {
    setCurrentText(event.target.value);
  };

  useEffect(() => {
    setTasks(initialTasks);
  }, []);
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Task</th>
            <th>Day 1</th>
            <th>Day 2</th>
            <th>Day 3</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            return <TaskRow key={index} task={task} />;
          })}
          <tr>
            <td>
              <Input
                placeholder="add task"
                value={currentText}
                onChange={handleSetValue}
                onBlur={handleAddTask}
                onKeyDown={handleKeyDown}
              ></Input>
            </td>
          </tr>
        </tbody>
      </table>
      <TaskMenu
        anchorRef={anchorRef}
        isOpen={isTaskMenuOpen}
        selectedTaskInstance
      />
    </>
  );
}

import { useState } from "react";
import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import TaskRow from "../TaskRow";
import TaskMenu from "../TaskMenu";
import styles from "./styles.module.scss";

import { useTask } from "../../hooks/useTask";

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

  const handleAddDay = () => {
    setTasks((prevState) => {
      return prevState.map((prevTask) => {
        const newDay = {
          day: prevTask.days.length + 1,
          completed: "no",
        };
        const updatedDays = [...prevTask.days, newDay];
        return {
          ...prevTask,
          days: updatedDays,
        };
      });
    });
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>Task</th>
            {tasks[0].days.map((_, index) => {
              return (
                <th style={{ border: "1px solid black" }} key={index}>
                  Day {index + 1}
                </th>
              );
            })}
            <th>
              <Button onClick={handleAddDay} variant="contained">
                Add Day
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            return <TaskRow key={index} task={task} setTasks={setTasks} />;
          })}
          <tr>
            <td>
              <Input
                // style={{ border: "1px solid black" }}
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

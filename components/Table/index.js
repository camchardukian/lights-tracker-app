import { useEffect } from "react";
import TaskRow from "../TaskRow";
import TaskMenu from "../TaskMenu";
import styles from "./styles.module.scss";
import styled from "@emotion/styled";

import { tasks as initialTasks } from "./tasks";
import { useTask } from "../../hooks/useTask";
import { Button } from "@mui/material";

const StyledButton = styled(Button)`
  width: 100px;
`;

export default function Table() {
  const { isTaskMenuOpen, anchorRef, tasks, setTasks } = useTask();
  const handleAddTask = () => {
    setTasks((prevState) => {
      return prevState.concat({
        name: "new task",
        days: [
          { day: 1, completed: "yes" },
          { day: 2, completed: "half" },
          { day: 3, completed: "yes" },
        ],
        id: Math.random(),
      });
    });
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
              <StyledButton onClick={handleAddTask} variant="contained">
                Add Task
              </StyledButton>
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

import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { useTask } from "../../hooks/useTask";
import React, { useRef } from "react";
const StyledButton = styled(Button)`
  color: black;
  width: 70px;
  background-color: ${(props) =>
    props.completed === "yes"
      ? "green"
      : props.completed === "half"
      ? "yellow"
      : "red"};
`;

export default function TaskRow(props) {
  const { setIsTaskMenuOpen, setAnchorRef, setSelectedTaskInstance } =
    useTask();
  const { task } = props;

  const handleOpenMenu = (event, taskAndDay) => {
    setAnchorRef(event.currentTarget);
    setSelectedTaskInstance(taskAndDay);
    setIsTaskMenuOpen(true);
  };

  return (
    <tr>
      <td style={{ border: "1px solid black", width: 100 }}>{task.name}</td>
      {task.days.map((day, index) => {
        const anchorRef = useRef(null);
        const taskAndDay = { task, day };
        return (
          <td key={index}>
            <StyledButton
              completed={day.completed}
              variant="contained"
              onClick={(event) => handleOpenMenu(event, taskAndDay)}
              ref={anchorRef}
            >
              {day.completed}
            </StyledButton>
          </td>
        );
      })}
    </tr>
  );
}

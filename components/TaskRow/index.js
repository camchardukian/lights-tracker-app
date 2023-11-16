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
  const { setIsTaskMenuOpen, setAnchorRef } = useTask();
  const { task } = props;

  const handleOpenMenu = (event) => {
    setAnchorRef(event.currentTarget);
    setIsTaskMenuOpen(true);
  };

  return (
    <tr>
      <td style={{ border: "1px solid black" }}>{task.name}</td>
      {task.days.map((day, index) => {
        const anchorRef = useRef(null);
        return (
          <td key={index}>
            <StyledButton
              completed={day.completed}
              variant="contained"
              onClick={handleOpenMenu}
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

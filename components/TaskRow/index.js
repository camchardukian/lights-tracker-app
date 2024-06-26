import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import React, { useRef } from "react";
import { Input } from "@mui/material";

const StyledButton = styled(Button)`
  color: black;
  width: calc(100% - 4px);
  position: absolute;
  top: 0;
  height: 100%;
  background-color: ${(props) =>
    props.completed === "yes"
      ? "green"
      : props.completed === "half"
      ? "yellow"
      : "red"};
`;

export default function TaskRow(props) {
  const { task, style, firstAndLastIndexToShow, onEdit, onOpenMenu } = props;

  const anchorRef = useRef(null);
  return (
    <tr style={style}>
      <td>
        <Input
          style={{ border: "1px solid black", width: "100%" }}
          onChange={(event) => onEdit(event, task)}
          value={task.name}
          multiline
        ></Input>
      </td>
      {task.days.map((day, index) => {
        const taskAndDay = { task, day };
        if (
          index >= firstAndLastIndexToShow[0] &&
          index <= firstAndLastIndexToShow[1]
        ) {
          return (
            <td style={{ position: "relative" }} key={index}>
              <StyledButton
                completed={day.completed}
                variant="contained"
                onClick={(event) => onOpenMenu(event, taskAndDay)}
                ref={anchorRef}
              >
                {day.completed}
              </StyledButton>
            </td>
          );
        }
      })}
    </tr>
  );
}

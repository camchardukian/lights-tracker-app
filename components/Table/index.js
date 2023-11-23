import React, { useState, useEffect } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import TaskRow from "../TaskRow";
import TaskMenu from "../TaskMenu";
import styles from "./styles.module.scss";
import { useTask } from "../../hooks/useTask";

const dateFormat = "ddd - MMM DD";

export default function Table() {
  const { isTaskMenuOpen, anchorRef, tasks, setTasks } = useTask();
  const [currentText, setCurrentText] = useState("");
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [currentPage, setCurrentPage] = useState(1);
  const [firstAndLastIndexToShow, setFirstAndLastIndexToShow] = useState([
    0, 6,
  ]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTask(event);
    }
  };
  const handleAddTask = (event) => {
    const { value } = event.target;
    if (!value) return;
    setTasks((prevState) => {
      const numOfDays = tasks[0]["days"].length;
      const days = Array.from({ length: numOfDays }, (_, index) => ({
        day: index + 1,
        completed: "no",
      }));
      return prevState.concat({
        name: value,
        days,
        id: Math.random(),
      });
    });
    setCurrentText("");
  };

  const handleSetValue = (event) => {
    setCurrentText(event.target.value);
  };

  const handleAddWeek = () => {
    setTasks((prevState) => {
      return prevState.map((prevTask) => {
        const newDays = [];
        for (let i = 0; i < 7; i++) {
          const newDay = {
            day: prevTask.days.length + i + 1,
            completed: "no",
          };
          newDays.push(newDay);
        }
        const updatedDays = [...prevTask.days, ...newDays];
        return {
          ...prevTask,
          days: updatedDays,
        };
      });
    });
  };

  useEffect(() => {
    const finalItemMaxIndex = currentPage * 7 - 1;
    setFirstAndLastIndexToShow([finalItemMaxIndex - 6, finalItemMaxIndex]);
  }, [currentPage, tasks]);

  const handleSetDate = (dayjsDate) => {
    setStartDate(dayjsDate);
  };

  console.log("Math.ceil(tasks.length / 7", tasks);

  return (
    <div>
      <div style={{ width: "100%", textAlign: "center" }}>
        <DatePicker onChange={handleSetDate} label="Choose start date" />
      </div>
      {/* @TODO - Improve this so that horizontal scrolling works better. */}
      <div style={{ width: "100%", overflowX: "auto", marginTop: 32 }}>
        {/* @TODO - Finish implementing pagination for when there are more than 7 days. */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHead}>
                Task
                {/* @TODO - Add click and drag to adjust column width */}
                <Divider
                  className={styles.divider}
                  orientation="vertical"
                  flexItem
                />
              </th>

              {tasks[0].days.map((_, index) => {
                if (
                  index >= firstAndLastIndexToShow[0] &&
                  index <= firstAndLastIndexToShow[1]
                ) {
                  return (
                    <React.Fragment key={index}>
                      <th className={styles.tableHead}>
                        <Divider
                          className={styles.divider}
                          orientation="vertical"
                          flexItem
                        />
                        {dayjs(startDate.add(index, "day")).format(dateFormat)}
                      </th>
                    </React.Fragment>
                  );
                }
              })}
              <th>
                <Button onClick={handleAddWeek} variant="contained">
                  Add Week
                </Button>
                <Button
                  variant="contained"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  disabled={currentPage === Math.ceil(tasks[0].days.length / 7)}
                  onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                >
                  Next
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => {
              return (
                <TaskRow
                  key={index}
                  task={task}
                  firstAndLastIndexToShow={firstAndLastIndexToShow}
                  setTasks={setTasks}
                />
              );
            })}
            <tr>
              <td>
                <Input
                  style={{ border: "1px solid black", width: 200 }}
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
        {isTaskMenuOpen && (
          <TaskMenu
            anchorRef={anchorRef}
            isOpen={isTaskMenuOpen}
            selectedTaskInstance
          />
        )}
      </div>
    </div>
  );
}

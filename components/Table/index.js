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
  // const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    console.log("start date changed.", startDate);
  }, [startDate]);

  const handleSetDate = (dayjsDate) => {
    setStartDate(dayjsDate);
  };

  return (
    <div>
      <div style={{ width: "100%", textAlign: "center" }}>
        <DatePicker onChange={handleSetDate} label="Choose start date" />
      </div>
      {/* @TODO - Improve this so that horizontal scrolling works better. */}
      <div style={{ width: "100%", overflowX: "auto", marginTop: 32 }}>
        {/* @TODO - Implement pagination for when there are more than 7 days. */}
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

import React, { useState, useEffect } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import CreateUserForm from "../CreateUserForm";
import TaskRow from "../TaskRow";
import TaskMenu from "../TaskMenu";
import styles from "./styles.module.scss";

// @TODO - Add inputs/form to add a user
const dateFormat = "ddd - MMM DD";

export default function Table() {
  const [tasks, setTasks] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [currentPage, setCurrentPage] = useState(1);
  const [firstAndLastIndexToShow, setFirstAndLastIndexToShow] = useState([
    0, 6,
  ]);
  const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);
  const [anchorRef, setAnchorRef] = useState(null);
  const [selectedTaskInstance, setSelectedTaskInstance] = useState({});

  let finalPage;
  console.log("tasks", tasks);
  if (tasks.length) {
    finalPage = Math.ceil(tasks[0].days.length / 7);
  }
  const isFinalPage = currentPage === finalPage;

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

  const handleSetTaskText = (event) => {
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

  const handlePageChange = (_, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditTask = (event, task) => {
    const { value } = event.target;
    setTasks((prevState) => {
      if (!value) return prevState;
      const updatedTask = { ...task, name: value };
      return prevState.map((prevTask) =>
        prevTask.id === task.id ? updatedTask : prevTask
      );
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setTasks(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsMounted(true);
    };

    getData();
  }, []);

  useEffect(() => {
    const finalItemMaxIndex = currentPage * 7 - 1;
    setFirstAndLastIndexToShow([finalItemMaxIndex - 6, finalItemMaxIndex]);
  }, [currentPage, tasks]);

  const handleSetDate = (dayjsDate) => {
    setStartDate(dayjsDate);
  };

  const handleOpenMenu = (event, taskAndDay) => {
    setAnchorRef(event.currentTarget);
    setSelectedTaskInstance(taskAndDay);
    setIsTaskMenuOpen(true);
  };

  const handleUpdateTaskStatus = (event, selectedTaskInstance) => {
    setTasks((prevState) => {
      return prevState.map((task) => {
        if (task.id === selectedTaskInstance.task.id) {
          const updatedDays = task.days.map((day) => {
            const text = event.target.textContent.toLowerCase();
            if (
              day.day === selectedTaskInstance.day.day &&
              ["yes", "no", "half"].includes(text)
            ) {
              return { ...day, completed: text };
            }
            return day;
          });
          return { ...task, days: updatedDays };
        }
        return task;
      });
    });
    setIsTaskMenuOpen(false);
  };

  const handleCreateUser = async () => {
    console.log("create");
    try {
      // @TODO - replace this with real data later.
      const postData = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
      };

      const createUserResponse = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      // Check if user creation was successful
      if (createUserResponse.ok) {
        const newUser = await createUserResponse.json();
        console.log("New user created:", newUser);
      } else {
        console.error("Error creating user:", createUserResponse.statusText);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      {!isMounted ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <CreateUserForm onCreateUser={handleCreateUser} />

          <div style={{ width: "100%", textAlign: "center" }}>
            <DatePicker onChange={handleSetDate} label="Choose start date" />
          </div>
          {/* @TODO - Improve this so that horizontal scrolling works better. */}
          <div style={{ width: "100%", overflowX: "auto", marginTop: 32 }}>
            <h2 style={{ textAlign: "center" }}>Week {currentPage}</h2>
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
                            {dayjs(startDate.add(index, "day")).format(
                              dateFormat
                            )}
                          </th>
                        </React.Fragment>
                      );
                    }
                  })}
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => {
                  return (
                    <TaskRow
                      key={index}
                      task={task}
                      firstAndLastIndexToShow={firstAndLastIndexToShow}
                      onEdit={handleEditTask}
                      onOpenMenu={(e, taskAndDay) =>
                        handleOpenMenu(e, taskAndDay, anchorRef)
                      }
                    />
                  );
                })}
                <tr>
                  <td>
                    <Input
                      style={{ border: "1px solid black", width: 200 }}
                      placeholder="add task"
                      value={currentText}
                      onChange={handleSetTaskText}
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
                onUpdateTaskStatus={handleUpdateTaskStatus}
                selectedTaskInstance={selectedTaskInstance}
              />
            )}
          </div>
          <Stack spacing={2}>
            <Pagination
              count={finalPage}
              page={currentPage}
              disabled={finalPage === 1}
              color="primary"
              onChange={handlePageChange}
            />
            <Button
              disabled={!isFinalPage}
              onClick={handleAddWeek}
              variant="contained"
              style={{ margin: "0 auto" }}
            >
              Add Week
            </Button>
          </Stack>
        </div>
      )}
    </>
  );
}

import styles from "./styles.module.scss";

const tasks = [
  {
    name: "wake up before 8am",
    days: [
      { day: 1, completed: "yes" },
      { day: 2, completed: "no" },
      { day: 3, completed: "yes" },
    ],
  },
  {
    name: "exercise",
    days: [
      { day: 1, completed: "yes" },
      { day: 2, completed: "no" },
      { day: 3, completed: "yes" },
    ],
  },
  {
    name: "meditate 10 minutes",
    days: [
      { day: 1, completed: "no" },
      { day: 2, completed: "no" },
      { day: 3, completed: "yes" },
    ],
  },
  {
    name: "30 minute nap",
    days: [
      { day: 1, completed: "yes" },
      { day: 2, completed: "yes" },
      { day: 3, completed: "yes" },
    ],
  },
];

export default function Table() {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Percentage</th>
          <th>Day 1</th>
          <th>Day 2</th>
          <th>Day 3</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => {
          console.log("task", task);
          return (
            <tr>
              <td style={{ border: "1px solid black" }} key={index}>
                {task.name}
              </td>
              {task.days.map((day, index) => {
                return (
                  <td
                    key={index}
                    style={{
                      backgroundColor: `${
                        day.completed === "yes" ? "green" : "red"
                      }`,
                    }}
                  >
                    {day.completed}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

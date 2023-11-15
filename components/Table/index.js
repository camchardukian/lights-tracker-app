import TaskRow from "../TaskRow";
import TaskMenu from "../TaskMenu";
import styles from "./styles.module.scss";
import { tasks } from "./tasks";
import { useTask } from "../../hooks/useTask";

export default function Table() {
  const { isTaskMenuOpen, anchorRef } = useTask();
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
        </tbody>
      </table>
      <TaskMenu anchorRef={anchorRef} isOpen={isTaskMenuOpen} />
    </>
  );
}

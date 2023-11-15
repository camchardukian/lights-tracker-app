import Table from "../Table";
import TaskProvider from "../../contexts/TaskProvider";

export default function App() {
  return (
    <TaskProvider>
      <Table />
    </TaskProvider>
  );
}

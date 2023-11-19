import Table from "../Table";
import TaskProvider from "../../contexts/TaskProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TaskProvider>
        <Table />
      </TaskProvider>
    </LocalizationProvider>
  );
}

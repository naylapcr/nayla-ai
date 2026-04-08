import { createRoot } from "react-dom/client";
import Tailwindcss from "./Tailwindcss";
import './tailwind.css';  
import UserForm from "./UserForm";
import BugReportForm from "./BugReportForm";

createRoot(document.getElementById("root"))
  .render(
    <div>
      {/* <Tailwindcss /> */}
      <BugReportForm/>
      {/* <UserForm/> */}
    </div>
  );
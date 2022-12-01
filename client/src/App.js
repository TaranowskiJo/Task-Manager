import { Link, Navigate, Route, Routes } from "react-router-dom";

import Tasks from "./views/AllTasks";
import Task from "./views/OneTask";
import EditTask from "./views/EditTask";
import { NewTask } from "./views/NewTask";
import { NotFound } from "./views/NotFound";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top justify-content-between mb-4">
        <h1 className="navbar-brand mb-0 logo">Task Manager</h1>
        <div className="navbar-nav justify-content-between nav-buttons">
          <Link to="/tasks" className="btn btn-sm btn-outline-light mx-1">
            All Tasks
          </Link>
          <Link to="/tasks/new" className="btn btn-sm btn-outline-info mx-1">
            New Task
          </Link>
        </div>
      </nav>

      {/* FRONT END ROUTES to display VIEWS */}
      {/* SEPERATTE FROM SERVER ROUTES */}
      <Routes>
        {/* Redirect example */}
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:id/edit" element={<EditTask />} />
        <Route path="/tasks/:id" element={<Task />} />
        <Route path="/tasks/new" element={<NewTask />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

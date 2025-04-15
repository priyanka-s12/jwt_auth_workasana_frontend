import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TaskProvider } from './contexts/TaskContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import ProtectedRoute from './components/ProtectedRoute';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Tasks from './pages/Tasks';
import CreateProject from './pages/CreateProject';
import CreateTeam from './pages/CreateTeam';
import CreateTask from './pages/CreateTask';
import AddTag from './pages/AddTag';
import ProjectDetails from './pages/ProjectDetails';
import TeamDetails from './pages/TeamDetails';
import TaskDetails from './pages/TaskDetails';
import Report from './pages/Report';

function App() {
  return (
    <>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/account" element={<Account />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/teams" element={<Team />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/add-project" element={<CreateProject />} />
              <Route path="/add-team" element={<CreateTeam />} />
              <Route path="/add-task" element={<CreateTask />} />
              <Route path="/add-tag" element={<AddTag />} />
              <Route path="/project-details/:id" element={<ProjectDetails />} />
              <Route path="/team-details/:id" element={<TeamDetails />} />
              <Route path="/task-details/:id" element={<TaskDetails />} />
              <Route path="/report" element={<Report />} />
            </Route>
          </Routes>
        </Router>
      </TaskProvider>
    </>
  );
}

export default App;

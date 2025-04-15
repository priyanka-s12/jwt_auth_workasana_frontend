import { NavLink, Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  return (
    <div>
      {location.pathname === '/dashboard' ? (
        <nav className="navbar justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item d-flex">
              <i
                className="bi bi-house-door-fill ms-2"
                style={{ fontSize: '1.5rem' }}
              ></i>
              <NavLink className="nav-link ms-3" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item d-flex">
              <i
                className="bi bi-grid-3x3-gap ms-2"
                style={{ fontSize: '1.5rem' }}
              ></i>
              <NavLink className="nav-link ms-3" to="/projects">
                Project
              </NavLink>
            </li>
            <li className="nav-item d-flex">
              <i
                className="bi bi-people ms-2"
                style={{ fontSize: '1.5rem' }}
              ></i>
              <NavLink className="nav-link ms-3" to="/teams">
                Team
              </NavLink>
            </li>
            <li className="nav-item d-flex">
              <i
                className="bi bi-card-list ms-2"
                style={{ fontSize: '1.5rem' }}
              ></i>
              <NavLink className="nav-link ms-3" to="/tasks">
                Tasks
              </NavLink>
            </li>
            <li className="nav-item d-flex">
              <i
                className="bi bi-bar-chart-fill ms-2"
                style={{ fontSize: '1.5rem' }}
              ></i>
              <NavLink className="nav-link ms-3" to="/report">
                Reports
              </NavLink>
            </li>
            <li className="nav-item d-flex">
              <i
                className="bi bi-gear-fill ms-2"
                style={{ fontSize: '1.5rem' }}
              ></i>
              <NavLink className="nav-link ms-3" to="/account">
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="navbar justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item d-flex justify-content-center">
              <i
                className="bi bi-arrow-left me-2"
                style={{ fontSize: '1.5rem' }}
              ></i>
              <Link to="/dashboard" className="nav-link">
                <h6>Back to Dashboard</h6>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Sidebar;

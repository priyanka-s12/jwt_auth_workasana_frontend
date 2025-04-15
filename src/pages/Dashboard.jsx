import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useTask from '../contexts/TaskContext';

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedStatus = searchParams.get('status') || 'To Do';

  const {
    users,
    fetchUsers,
    projects,
    projectsLoading,
    projectsError,
    fetchProjects,
    tasks,
    tasksLoading,
    tasksError,
    fetchTasks,
  } = useTask();
  //   console.log(tasks);

  const taskStatuses = ['To Do', 'In Progress', 'Completed', 'Blocked'];

  const myFilteredTasks = tasks.filter((task) =>
    task.owners.some((owner) => owner.name === users.name)
  );
  //   console.log(myFilteredTasks);

  const getDueDate = (createdAt, timeToComplete) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + timeToComplete);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  const filteredTasks = tasks?.filter((task) => task.status === selectedStatus);

  useEffect(() => {
    fetchUsers();
    fetchProjects();
    fetchTasks();
  }, []);

  return (
    <>
      <div>
        <Header />
        <div className="row">
          <div className="col-md-2 min-vh-100 p-3 mb-3 shadow bg-body-tertiary rounded ">
            <Sidebar />
          </div>
          <div className="col-md-10 p-3">
            <main className="container-fluid">
              <div className="row">
                <section className="mb-3">
                  <h3>
                    Welcome <span className="text-primary">{users.name}</span>
                  </h3>
                </section>
                <hr />
                <section className="container">
                  <div className="d-flex justify-content-between mb-3">
                    <h4>Projects: </h4>
                    <Link className="btn btn-outline-dark" to="/add-project">
                      Add New Project
                    </Link>
                  </div>

                  {projectsLoading && <p>Loading...</p>}
                  <div className="row">
                    {projects?.map((project) => (
                      <div key={project._id} className="col-md-3 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <Link
                              className="card-title text-decoration-none text-black fs-5 fw-medium"
                              to={`/project-details/${project._id}`}
                            >
                              {project.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                <hr />

                <section>
                  <div className="d-flex justify-content-between mb-3">
                    <h4>My Tasks: </h4>
                    <Link className="btn btn-outline-dark" to="/add-task">
                      Add New Task
                    </Link>
                  </div>
                  <table className="table table-bordered w-75 mt-3">
                    <thead className="table-primary">
                      <tr>
                        <th scope="col">Task Name</th>
                        <th scope="col">Due Date</th>
                        <th scopes="col">Owners</th>
                      </tr>
                    </thead>
                    {tasks?.length > 0 ? (
                      <tbody>
                        {myFilteredTasks?.map((task) => (
                          <tr key={task._id}>
                            <td>
                              <Link
                                to={`/task-details/${task._id}`}
                                className="text-decoration-none text-black link-body-emphasis"
                              >
                                {task.name}
                              </Link>
                            </td>
                            <td>
                              {getDueDate(task.createdAt, task.timeToComplete)}
                            </td>
                            <td>
                              {task?.owners
                                ?.map((owner) => owner?.name)
                                .join(', ')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td> No task found.</td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </section>
                <hr />

                <section className="container">
                  <h4 className="mb-3">Quick Filters: </h4>
                  <ul className="nav nav-pills">
                    {taskStatuses.map((taskStatus) => (
                      <li className="nav-item" key={taskStatus}>
                        <button
                          className={`btn me-3 mb-3 ${
                            selectedStatus === taskStatus
                              ? 'btn-dark'
                              : 'btn-outline-dark'
                          }`}
                          onClick={() =>
                            setSearchParams({ status: taskStatus })
                          }
                          value={taskStatus}
                        >
                          {taskStatus}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div>
                    {tasks && tasks.length > 0 ? (
                      <ul className="list-group ">
                        {filteredTasks.length > 0 ? (
                          <div>
                            {filteredTasks.map((task) => (
                              <li
                                className="list-group-item w-75"
                                key={task._id}
                              >
                                {task.name}
                              </li>
                            ))}
                          </div>
                        ) : (
                          <p>No "{selectedStatus}" task found.</p>
                        )}
                      </ul>
                    ) : (
                      <p className="mt-3">No task found.</p>
                    )}
                  </div>
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

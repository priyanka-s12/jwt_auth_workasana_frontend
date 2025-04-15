import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import useTask from '../contexts/TaskContext';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TeamDetails() {
  const { id } = useParams();

  const { tasks, fetchTasks } = useTask();
  console.log(tasks);

  const [searchParams, setSearchParams] = useSearchParams();

  const findTeam = tasks.find((task) => task?.team?._id === id);
  console.log(findTeam);

  const filteredTasks = tasks.filter(
    (task) => task.team.name === findTeam.team.name
  );
  console.log(filteredTasks);

  const taskStatuses = ['To Do', 'In Progress', 'Completed', 'Blocked'];
  const selectedStatus = searchParams.get('status') || '';

  const updateFilter = (key, value) => {
    // console.log(key, value);

    setSearchParams((prevParams) => {
      if (value === '') {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  };

  const filterByStatus =
    selectedStatus === ''
      ? filteredTasks
      : filteredTasks.filter((task) => task.status === selectedStatus);

  useEffect(() => {
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
              <section>
                <h3>Team: {findTeam?.team.name}</h3>
                <hr />

                <section className="d-flex justify-content-between mb-4">
                  <div>
                    <h5 className="mb-3">Filter by: </h5>
                    <div className="d-flex">
                      <select
                        className="me-3 form-select"
                        onChange={(e) => updateFilter('status', e.target.value)}
                      >
                        <option value="">Select Status</option>
                        {taskStatuses.map((status, index) => (
                          <option value={status} key={index}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                <table className="table table-bordered w-75 mt-3">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col">Project</th>
                      <th scope="col">Task Name</th>
                      <th scopes="col">Owners</th>
                      <th scopes="col">Status</th>
                    </tr>
                  </thead>
                  {filterByStatus?.length > 0 ? (
                    <tbody>
                      {filterByStatus?.map((task) => (
                        <tr key={task._id}>
                          <td>{task.project.name}</td>
                          <td>{task.name}</td>
                          <td>
                            {task?.owners
                              ?.map((owner) => owner?.name)
                              .join(', ')}
                          </td>
                          <td>{task.status}</td>
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
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamDetails;

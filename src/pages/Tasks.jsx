import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import useTask from '../contexts/TaskContext';
import { useSearchParams, Link } from 'react-router-dom';

function Tasks() {
  const {
    tasks,
    tasksLoading,
    tasksError,
    fetchTasks,
    owners,
    ownersLoading,
    ownersError,
    fetchOwners,
    tags,
    tagsLoading,
    tagsError,
    fetchTags,
  } = useTask();
  console.log(tasks, owners, tags);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedStatus = searchParams.get('status') || '';
  const selectedOwner = searchParams.get('owner') || '';
  const selectedTag = searchParams.get('tag') || '';
  const selectedTeam = searchParams.get('team') || '';
  const selectedDueDate = searchParams.get('dueDate') || '';

  const taskStatuses = ['To Do', 'In Progress', 'Completed', 'Blocked'];

  const teamsArray = tasks
    .map((task) => task.team.name)
    .reduce((acc, curr) => {
      if (!acc.includes(curr)) {
        acc.push(curr);
      }
      return acc;
    }, []);

  console.log(teamsArray);

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

  const getDueDate = (createdAt, timeToComplete) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + timeToComplete);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  const filterByStatus =
    selectedStatus === ''
      ? tasks
      : tasks.filter((task) => task.status === selectedStatus);

  const filteredByOwner =
    selectedOwner === ''
      ? filterByStatus
      : filterByStatus.filter((task) =>
          task.owners.find((owner) => owner.name === selectedOwner)
        );

  const filteredByTag =
    selectedTag === ''
      ? filteredByOwner
      : filteredByOwner.filter((task) =>
          task.tags.find((tag) => tag === selectedTag)
        );

  const filteredByTeam =
    selectedTeam === ''
      ? filteredByTag
      : filteredByTag.filter((task) => task.team.name === selectedTeam);

  const sortByDueDate =
    selectedDueDate === ''
      ? filteredByTeam
      : filteredByTeam.sort((a, b) => {
          const dueDateA = new Date(a.createdAt);
          dueDateA.setDate(dueDateA.getDate() + a.timeToComplete);

          const dueDateB = new Date(b.createdAt);
          dueDateB.setDate(dueDateB.getDate() + b.timeToComplete);
          console.log(dueDateA, dueDateB);

          if (selectedDueDate === 'asc') {
            return dueDateA - dueDateB;
          } else if (selectedDueDate === 'desc') {
            return dueDateB - dueDateA;
          }
        });

  useEffect(() => {
    fetchTasks();
    fetchOwners();
    fetchTags();
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
                <div className="d-flex justify-content-between mb-3">
                  <h3>All Tasks</h3>
                  <Link className="btn btn-outline-dark" to="/add-task">
                    Add New Task
                  </Link>
                </div>

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

                      <select
                        className="form-select me-3"
                        onChange={(e) => updateFilter('owner', e.target.value)}
                      >
                        <option value="">Select Owner</option>
                        {owners?.map((owner) => (
                          <option value={owner.name} key={owner._id}>
                            {owner.name}
                          </option>
                        ))}
                      </select>

                      <select
                        className="form-select me-3"
                        onClick={(e) => updateFilter('tag', e.target.value)}
                      >
                        <option value="">Select Tag</option>
                        {tags.map((tag) => (
                          <option value={tag.name} key={tag._id}>
                            {tag.name}
                          </option>
                        ))}
                      </select>

                      <select
                        className="form-select me-3"
                        onClick={(e) => updateFilter('team', e.target.value)}
                      >
                        <option value="">Select Team</option>
                        {teamsArray.map((team, index) => (
                          <option value={team} key={index}>
                            {team}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <h5 className="mb-3">Sort by: </h5>
                    <select
                      className="form-select"
                      onChange={(e) => updateFilter('dueDate', e.target.value)}
                    >
                      <option value="">Select Option</option>
                      <option value="asc">Due Date- Asc to Desc</option>
                      <option value="desc">Due Date - Desc to Asc</option>
                    </select>
                  </div>
                </section>

                <table className="table table-bordered w-75 mt-3">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col">Task Name</th>
                      <th scope="col">Project</th>
                      <th scope="col">Team</th>
                      <th scope="col">Status</th>
                      <th scopes="col">Owners</th>
                      <th scopes="col">Due Date</th>
                      <th scopes="col">Time to Complete</th>
                      <th scopes="col">Tags</th>
                    </tr>
                  </thead>
                  {sortByDueDate?.length > 0 ? (
                    <tbody>
                      {sortByDueDate?.map((task) => (
                        <tr key={task._id}>
                          <td>
                            {' '}
                            <Link
                              to={`/task-details/${task._id}`}
                              className="text-decoration-none text-black link-body-emphasis"
                            >
                              {task.name}
                            </Link>
                          </td>
                          <td>{task.project.name}</td>
                          <td>{task.team.name}</td>
                          <td>{task.status}</td>
                          <td>
                            {task?.owners
                              ?.map((owner) => owner?.name)
                              .join(', ')}
                          </td>
                          <td>
                            {getDueDate(task.createdAt, task.timeToComplete)}
                          </td>
                          <td>{task.timeToComplete}</td>
                          <td>{task.tags.map((tag) => tag).join(', ')}</td>
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

export default Tasks;

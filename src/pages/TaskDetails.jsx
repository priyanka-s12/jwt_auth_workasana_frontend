import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import useTask from '../contexts/TaskContext';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function TaskDetails() {
  const { id } = useParams();
  console.log(id);

  const { tasks, tasksLoading, tasksError, fetchTasks } = useTask();

  const findTask = tasks?.find((task) => task._id === id);
  console.log(findTask);

  const getDueDate = (createdAt, timeToComplete) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + timeToComplete);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  // const getRemainingDays = (createdAt, timeToComplete) => {
  //   const dueDate = new Date(getDueDate(createdAt, timeToComplete));
  //   const currentDate = new Date();
  //   const day_secs = 24 * 60 * 60 * 1000;
  //   const findDays = Math.ceil((dueDate - currentDate) / day_secs);

  //   console.log(findDays);

  //   if (findDays <= 0) {
  //     return 0;
  //   }
  //   return findDays;
  // };

  const handleTaskStatus = async (task) => {
    console.log(task);

    const token = JSON.parse(localStorage.getItem('userToken'));

    const headers = {
      headers: {
        Authorization: token,
      },
    };

    try {
      // const response = await axios.put(
      //   `https://workasana-task-mgt-backend.vercel.app/tasks/${task._id}`,
      //   { ...task, status: 'Completed', timeToComplete: 0 }
      // );
      const response = await axios.put(
        `https://jwt-auth-workasana-backend.vercel.app/tasks/${task._id}`,
        { ...task, status: 'Completed' },
        headers
      );

      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <>
      <div>
        <Header />
        <div className="row">
          <div className="col-md-2 min-vh-100 shadow p-3 mb-3 bg-body-tertiary rounded">
            <Sidebar />
          </div>
          <div className="col-md-10 p-3 mb-5">
            <main className="container-fluid">
              <section>
                {findTask ? (
                  <div>
                    <h3 className="mb-3">Task Name - {findTask.name}</h3>
                    <hr />
                    <h4 className="mb-3">Task Details</h4>
                    <table className="table table-bordered w-75">
                      <tbody>
                        <tr>
                          <th>Project: </th>
                          <td>{findTask.project.name}</td>
                        </tr>
                        <tr>
                          <th>Team: </th>
                          <td>{findTask.team.name}</td>
                        </tr>
                        <tr>
                          <th>Owners: </th>
                          <td>
                            {findTask.owners
                              .map((owner) => owner.name)
                              .join(', ')}
                          </td>
                        </tr>
                        <tr>
                          <th>Due Date: </th>
                          <td>
                            {getDueDate(
                              findTask.createdAt,
                              findTask.timeToComplete
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Tags: </th>
                          <td>
                            {findTask.tags.map((tag, index) => (
                              <button
                                className="btn btn-outline-primary me-2"
                                key={index}
                              >
                                {tag}
                              </button>
                            ))}
                          </td>
                        </tr>
                        <tr>
                          <th>Status: </th>
                          <td>{findTask.status}</td>
                        </tr>
                        <tr>
                          <th>Time Remaining: </th>
                          <td>{findTask.timeToComplete} days</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <button
                              className="btn btn-primary"
                              onClick={() => handleTaskStatus(findTask)}
                            >
                              {findTask.status !== 'Completed'
                                ? 'Mark as Complete'
                                : 'Task is already completed'}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <>{tasksLoading && <p>Loading...</p>}</>
                )}
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetails;

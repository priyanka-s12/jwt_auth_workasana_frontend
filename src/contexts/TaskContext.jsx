import { createContext, useContext, useState, useEffect } from 'react';
import useAxios from '../custom/useAxios';

const TaskContext = createContext();

const useTask = () => useContext(TaskContext);
export default useTask;

export const TaskProvider = ({ children }) => {
  const token = JSON.parse(localStorage.getItem('userToken'));
  console.log(token);

  const {
    data: users,
    loading: usersLoading,
    error: usersError,
    fetchData: fetchUsers,
  } = useAxios('https://jwt-auth-workasana-backend.vercel.app/auth/me');

  const {
    data: projects,
    loading: projectsLoading,
    error: projectsError,
    fetchData: fetchProjects,
  } = useAxios('https://jwt-auth-workasana-backend.vercel.app/projects');

  const {
    data: tasks,
    loading: tasksLoading,
    error: tasksError,
    fetchData: fetchTasks,
  } = useAxios('https://jwt-auth-workasana-backend.vercel.app/tasks');

  const {
    data: teams,
    loading: teamsLoading,
    error: teamsError,
    fetchData: fetchTeams,
  } = useAxios('https://jwt-auth-workasana-backend.vercel.app/teams');

  const {
    data: tags,
    loading: tagsLoading,
    error: tagsError,
    fetchData: fetchTags,
  } = useAxios('https://jwt-auth-workasana-backend.vercel.app/tags');

  const {
    data: owners,
    loading: ownersLoading,
    error: ownersError,
    fetchData: fetchOwners,
  } = useAxios('https://jwt-auth-workasana-backend.vercel.app/users');

  const { data: tasksClosed, fetchData: getTaskClosed } = useAxios(
    'https://jwt-auth-workasana-backend.vercel.app/report/last-week-completed'
  );

  const { data: pendingTasks, fetchData: getPendingTasks } = useAxios(
    'https://jwt-auth-workasana-backend.vercel.app/report/pending'
  );

  const { data: tasksClosedByTeam, fetchData: getTasksClosedByTeam } = useAxios(
    'https://jwt-auth-workasana-backend.vercel.app/report/closed-by-team'
  );

  const { data: tasksClosedByOwner, fetchData: getTasksClosedByOwner } =
    useAxios(
      'https://jwt-auth-workasana-backend.vercel.app/report/closed-by-owner'
    );

  return (
    <TaskContext.Provider
      value={{
        token,
        users,
        usersLoading,
        usersError,
        fetchUsers,
        projects,
        projectsLoading,
        projectsError,
        fetchProjects,
        tasks,
        tasksLoading,
        tasksError,
        fetchTasks,
        teams,
        teamsLoading,
        teamsError,
        fetchTeams,
        tags,
        tagsLoading,
        tagsError,
        fetchTags,
        owners,
        ownersLoading,
        ownersError,
        fetchOwners,
        tasksClosed,
        getTaskClosed,
        pendingTasks,
        getPendingTasks,
        tasksClosedByTeam,
        getTasksClosedByTeam,
        tasksClosedByOwner,
        getTasksClosedByOwner,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

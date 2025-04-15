import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useTask from '../contexts/TaskContext';

function CreateTask() {
  const {
    projects,
    teams,
    owners,
    tags,
    fetchProjects,
    fetchTeams,
    fetchOwners,
    fetchTags,
  } = useTask();
  console.log(projects, teams, owners, tags);

  const [formData, setFormData] = useState({
    name: '',
    project: '',
    team: '',
    timeToComplete: 0,
    status: '',
  });

  const [dueDate, setDueDate] = useState('');

  const [selectedOwners, setSelectedOwners] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const ownerList = owners?.map((owner) => ({
    label: owner.name,
    value: owner._id,
  }));
  //   console.log(ownerList);

  const tagList = tags.map((tag) => ({
    label: tag.name,
    value: tag._id,
  }));
  //   console.log(tagList);

  const taskStatuses = ['To Do', 'In Progress', 'Completed', 'Blocked'];

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'timeToComplete' ? Number(value) : value,
    }));
  };

  const handleOwnerSelect = (selected) => {
    setSelectedOwners(selected);
    console.log(selected);

    setFormData((prevVal) => ({
      ...prevVal,
      owners: selected.map((owner) => owner.value),
    }));
  };

  const handleTagSelect = (selected) => {
    setSelectedTags(selected);
    console.log(selected);

    setFormData((prevVal) => ({
      ...prevVal,
      tags: selected.map((tag) => tag.label),
    }));
  };

  const token = JSON.parse(localStorage.getItem('userToken'));

  const headers = {
    headers: {
      Authorization: token,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, dueDate);
    try {
      const response = await axios.post(
        'https://jwt-auth-workasana-backend.vercel.app/tasks',
        formData,
        headers
      );

      console.log(response.data);
      toast.success('Task added successfully!!!', { position: 'top-right' });
      setFormData({
        name: '',
        project: '',
        team: '',
        timeToComplete: 0,
        status: '',
      });
      setSelectedOwners([]);
      setSelectedTags([]);
      setDueDate('');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchOwners();
    fetchTags();
    fetchTeams();
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
              <form className="w-50 mb-5" onSubmit={handleSubmit}>
                <h3 className="mb-3">Add New Task</h3>
                <div>
                  <label className="form-label me-3">Project:</label>
                  <Link to="/add-project">Add New Project</Link>
                  <select
                    className="form-select"
                    name="project"
                    value={formData.project}
                    onChange={handleInput}
                    required
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
                <br />
                <div>
                  <label className="form-label">Task Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    required
                    onChange={handleInput}
                  />
                </div>
                <br />
                <div>
                  <label className="form-label me-3">Team:</label>
                  <Link to="/add-team">Add New Team</Link>
                  <select
                    className="form-select"
                    name="team"
                    value={formData.team}
                    onChange={handleInput}
                    required
                  >
                    <option value="">Select Team</option>
                    {teams.map((team) => (
                      <option key={team._id} value={team._id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>
                <br />
                <div>
                  <label className="form-label me-3">Select Owners:</label>
                  <Select
                    name="owners"
                    required
                    options={ownerList}
                    isMulti
                    value={selectedOwners}
                    onChange={handleOwnerSelect}
                  />
                </div>
                <br />
                <div>
                  <label className="form-label me-3">Select Tags:</label>
                  <Link to="/add-tag">Add New Tag</Link>
                  <Select
                    name="tags"
                    options={tagList}
                    isMulti
                    value={selectedTags}
                    onChange={handleTagSelect}
                  />
                </div>
                <br />
                <div>
                  <label className="form-label">Status: </label>
                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleInput}
                  >
                    <option>Select a Status</option>
                    {taskStatuses.map((status, index) => (
                      <option value={status} key={index}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <br />
                <div>
                  <label className="form-label">Select Due Date: </label>
                  <input
                    type="date"
                    className="form-control"
                    name="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <br />
                <div>
                  {' '}
                  <label className="form-label">
                    Estimated Time (in days):{' '}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    name="timeToComplete"
                    value={formData.timeToComplete}
                    onChange={handleInput}
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-primary mx-auto">
                  Add Task
                </button>
              </form>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTask;

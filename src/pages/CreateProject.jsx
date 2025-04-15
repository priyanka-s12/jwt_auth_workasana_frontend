import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function CreateProject() {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const token = JSON.parse(localStorage.getItem('userToken'));

    const headers = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        'https://jwt-auth-workasana-backend.vercel.app/projects',
        formData,
        headers
      );
      console.log(response.data);
      toast.success('Project added successfully!!!', { position: 'top-right' });
      setFormData({ name: '', description: '' });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: 'top-right',
      });
    }
  };
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
                <form className="w-50 mb-5" onSubmit={handleSubmit}>
                  <h3 className="mb-3">Add New Project</h3>
                  <label className="form-label">Project Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    className="form-control"
                    onChange={handleInput}
                    required
                  />
                  <br />
                  <label className="form-label">Project Description:</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={formData.description}
                    required
                    onChange={handleInput}
                  ></textarea>
                  <br />
                  <button type="submit" className="btn btn-primary mx-auto">
                    Add Project
                  </button>
                </form>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProject;

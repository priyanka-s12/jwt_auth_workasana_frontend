import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useTask from '../contexts/TaskContext';

function AddTag() {
  const { tags, fetchTags } = useTask();
  const [formData, setFormData] = useState({ name: '' });

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
        'https://jwt-auth-workasana-backend.vercel.app/tags',
        formData,
        headers
      );

      console.log(response);
      toast.success('Tag added successfully!!!', { position: 'top-right' });
      setFormData({ name: '' });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    fetchTags();
  }, [tags]);
  return (
    <>
      <div>
        <Header />
        <div className="row">
          <div className="col-md-2 min-vh-100 shadow p-3 mb-3 bg-body-tertiary rounded">
            <Sidebar />
          </div>
          <div className="col-md-10 p-3">
            <main className="container-fluid">
              <section>
                <form className="w-50 mb-5" onSubmit={handleSubmit}>
                  <h3 className="mb-3">Add New Tag</h3>

                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    className="form-control"
                    onChange={handleInput}
                    required
                  />
                  <br />

                  <button type="submit" className="btn btn-primary mx-auto">
                    Add Tag
                  </button>
                </form>
              </section>

              <section>
                <h4 className="mb-3">All Tags</h4>

                {tags.length > 0 ? (
                  <ul className="list-group w-50">
                    {tags.map((tag, index) => (
                      <li key={index} className="list-group-item">
                        {tag.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No tag added</p>
                )}
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTag;

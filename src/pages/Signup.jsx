import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        'https://jwt-auth-workasana-backend.vercel.app/auth/signup',
        formData
      );
      console.log(response.data);

      toast.success(response.data.message, { position: 'top-right' });

      setFormData({
        name: '',
        email: '',
        password: '',
      });

      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.response.data.error, {
        position: 'top-right',
      });
    }
  };
  return (
    <>
      <div
        className="container p-3 border mt-5 align-items-center"
        style={{ width: '50%' }}
      >
        <form onSubmit={handleSubmit}>
          <h3 className="mb-3">Sign Up</h3>
          <div className="mb-3">
            <label className="form-label">Name: </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              required
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email: </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              required
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password: </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              className="form-control"
              placeholder="********"
              required
              onChange={handleInput}
            />
          </div>
          <div className="d-grid gap-2 mb-3">
            <button className="btn btn-primary" type="submit">
              Sign Up
            </button>
          </div>
          <div className="text-center">
            <p>
              Already a User? <Link to="/">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;

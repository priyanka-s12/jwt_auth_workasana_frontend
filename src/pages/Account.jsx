import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import useTask from '../contexts/TaskContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Account() {
  const { users, usersLoading, fetchUsers } = useTask();
  console.log(users, usersLoading);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    toast.success('User logout successfully!', { position: 'top-right' });
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
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
              <h3 className="mb-3">Account Details</h3>
              <hr />
              {usersLoading && <p>Loading...</p>}
              {users ? (
                <div className="card w-50">
                  <div className="card-header">
                    <h4>Name: {users.name}</h4>
                  </div>
                  <div className="card-body">
                    <p>Email: {users.email}</p>
                  </div>
                </div>
              ) : (
                <p>User not found.</p>
              )}
              <button className="btn btn-primary mt-3" onClick={handleLogout}>
                Logout
              </button>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import useTask from '../contexts/TaskContext';
import { Link } from 'react-router-dom';

function Projects() {
  const { projects, projectsLoading, projectsError, fetchProjects } = useTask();
  console.log(projects);

  useEffect(() => {
    fetchProjects();
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
                  <h4>All Projects </h4>
                  <Link className="btn btn-outline-dark" to="/add-project">
                    Add New Project
                  </Link>
                </div>
                {projectsLoading && <p>Loading...</p>}
                <table className="table table-bordered w-75 mt-3">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col">Project Name</th>
                      <th scopes="col">Description</th>
                    </tr>
                  </thead>
                  {projects?.length > 0 ? (
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project._id}>
                          <td>
                            <Link
                              to={`/project-details/${project._id}`}
                              className="text-decoration-none text-black link-body-emphasis"
                            >
                              {project.name}
                            </Link>
                          </td>
                          <td>{project.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td>No project added.</td>
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

export default Projects;

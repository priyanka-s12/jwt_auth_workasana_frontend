import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import useTask from '../contexts/TaskContext';
import { Link } from 'react-router-dom';

function Team() {
  const { teams, teamsLoading, teamsError, fetchTeams } = useTask();
  console.log(teams);

  useEffect(() => {
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
              <section>
                <div className="d-flex justify-content-between mb-3">
                  <h4>All Teams </h4>
                  <Link className="btn btn-outline-dark" to="/add-team">
                    Add New Team
                  </Link>
                </div>

                {teamsLoading && <p>Loading...</p>}

                {teams.length > 0 ? (
                  <div className="row">
                    {teams.map((team) => (
                      <div className="col-md-3" key={team._id}>
                        <div className="card">
                          <div className="card-header">
                            <Link
                              className="fw-medium text-decoration-none fs-5 text-black"
                              to={`/team-details/${team._id}`}
                            >
                              {team.name}
                            </Link>
                          </div>
                          <div className="card-body">
                            <p>{team.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No team added</p>
                )}
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Team;

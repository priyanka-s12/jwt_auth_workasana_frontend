import LastWeekWork from '../components/LastWeekWork';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ClosedByTeam from '../components/ClosedByTeam';
import ClosedByOwner from '../components/ClosedByOwner';
import PendingWork from '../components/PendingWork';

function Report() {
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
              <h3 className="mb-3">Reports Overview</h3>
              <hr />

              <div className="row">
                <section className="col-md-6 mb-5">
                  <h4 className="text-center mb-5">Tasks Closed Last Week</h4>
                  <LastWeekWork />
                </section>
                <section className="col-md-6 mb-5">
                  <h4 className="text-center">Total Days of Work Pending</h4>
                  <PendingWork />
                </section>
              </div>

              <div className="row">
                <section className="col-md-6 mb-5">
                  <h4 className="text-center">Tasks Closed by Team</h4>
                  <ClosedByTeam />
                </section>
                <section className="col-md-6 mb-5">
                  <h4 className="text-center">Tasks Closed by Owner</h4>
                  <ClosedByOwner />
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;

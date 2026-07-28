import { useState, useEffect } from "react";
import API from "./services/api";
import "./App.css";

function App() {
  const [page, setPage] = useState("dashboard");

  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const [leaveRequests, setLeaveRequests] = useState([]);

  // Fetch Leave Requests
  const fetchLeaveRequests = () => {
    API.get("/leave")
      .then((response) => {
        setLeaveRequests(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (page === "requests") {
      fetchLeaveRequests();
    }
  }, [page]);

  // Apply Leave
  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      employeeName,
      employeeId: Number(employeeId),
      leaveType,
      fromDate,
      toDate,
      reason,
    };

    API.post("/leave", newRequest)
      .then((response) => {
        alert(response.data.message);

        setEmployeeName("");
        setEmployeeId("");
        setLeaveType("");
        setFromDate("");
        setToDate("");
        setReason("");

        setPage("requests");
        fetchLeaveRequests();
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to submit leave request");
      });
  };

  // Approve Leave
  const approveLeave = (id) => {
    API.put(`/leave/${id}/approve`)
      .then(() => fetchLeaveRequests())
      .catch(() => alert("Failed to approve leave"));
  };

  // Reject Leave
  const rejectLeave = (id) => {
    API.put(`/leave/${id}/reject`)
      .then(() => fetchLeaveRequests())
      .catch(() => alert("Failed to reject leave"));
  };

  // Cancel Leave
  const cancelLeave = (id) => {
    API.put(`/leave/${id}/cancel`)
      .then(() => fetchLeaveRequests())
      .catch(() => alert("Failed to cancel leave"));
  };

  // Delete Leave
  const deleteLeave = (id) => {
    API.delete(`/leave/${id}`)
      .then(() => fetchLeaveRequests())
      .catch(() => alert("Failed to delete leave"));
  };

  return (
    <div className="container">
      <h1>Employee Leave Management System</h1>

      {page === "dashboard" && (
        <div>
          <h2>Employee Dashboard</h2>

          <button onClick={() => setPage("apply")}>Apply for Leave</button>

          <button onClick={() => setPage("requests")}>
            View Leave Requests
          </button>
        </div>
      )}

      {page === "apply" && (
        <div>
          <h2>Apply for Leave</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Employee Name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />

            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Earned Leave">Earned Leave</option>
            </select>

            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />

            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />

            <textarea
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />

            <button type="submit">Submit Leave</button>

            <button type="button" onClick={() => setPage("dashboard")}>
              Back
            </button>
          </form>
        </div>
      )}

      {page === "requests" && (
        <div>
          <h2>My Leave Requests</h2>

          {leaveRequests.length === 0 ? (
            <p>No leave requests found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {leaveRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.employeeId}</td>
                    <td>{request.employeeName}</td>
                    <td>{request.leaveType}</td>
                    <td>{new Date(request.fromDate).toLocaleDateString()}</td>
                    <td>{new Date(request.toDate).toLocaleDateString()}</td>
                    <td>{request.reason}</td>
                    <td>{request.status}</td>

                    <td>
                      <button onClick={() => approveLeave(request.id)}>
                        Approve
                      </button>

                      <button onClick={() => rejectLeave(request.id)}>
                        Reject
                      </button>

                      <button onClick={() => cancelLeave(request.id)}>
                        Cancel
                      </button>

                      <button onClick={() => deleteLeave(request.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <button onClick={() => setPage("dashboard")}>
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

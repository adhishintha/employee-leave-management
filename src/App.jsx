import { useState } from "react";
import "./App.css";

function App() {

  // Manage page navigation between dashboard, apply leave, and requests
  const [page, setPage] = useState("dashboard");

  // Store employee leave application form details
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  // Store all submitted employee leave requests
  const [leaveRequests, setLeaveRequests] = useState([]);

  // Handle employee leave application submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new leave request with pending status
    const newRequest = {
      id: Date.now(),
      employeeName: employeeName,
      employeeId: employeeId,
      leaveType: leaveType,
      fromDate: fromDate,
      toDate: toDate,
      reason: reason,
      status: "Pending",
    };

    // Add new request to existing leave requests
    setLeaveRequests([...leaveRequests, newRequest]);

    // Clear all form fields after submission
    setEmployeeName("");
    setEmployeeId("");
    setLeaveType("");
    setFromDate("");
    setToDate("");
    setReason("");

    // Show successful leave submission message
    alert("Leave request submitted successfully!");

    // Navigate to leave requests page
    setPage("requests");
  };

  return (
    <div className="container">

      {/* Display main application heading */}
      <h1>Employee Leave Management System</h1>

      {/* Display employee dashboard page */}
      {page === "dashboard" && (
        <div>

          <h2>Employee Dashboard</h2>

          <p>Welcome, Employee!</p>

          {/* Navigate to leave application form */}
          <button onClick={() => setPage("apply")}>
            Apply for Leave
          </button>

          {/* Navigate to submitted leave requests */}
          <button onClick={() => setPage("requests")}>
            View Leave Requests
          </button>

        </div>
      )}

      {/* Display employee leave application form */}
      {page === "apply" && (
        <div>

          <h2>Apply for Leave</h2>

          <form onSubmit={handleSubmit}>

            {/* Enter employee name */}
            <label>Employee Name</label>
            <input
              type="text"
              placeholder="Enter employee name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />

            {/* Enter unique employee ID */}
            <label>Employee ID</label>
            <input
              type="text"
              placeholder="Enter Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />

            {/* Select required leave type */}
            <label>Leave Type</label>
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

            {/* Select leave starting date */}
            <label>From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />

            {/* Select leave ending date */}
            <label>To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />

            {/* Enter reason for requested leave */}
            <label>Reason</label>
            <textarea
              placeholder="Enter reason for leave"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            ></textarea>

            {/* Submit completed leave application */}
            <button type="submit">
              Submit Leave
            </button>

            {/* Return to employee dashboard */}
            <button
              type="button"
              onClick={() => setPage("dashboard")}
            >
              Back
            </button>

          </form>
        </div>
      )}

      {/* Display submitted employee leave requests */}
      {page === "requests" && (
        <div>

          <h2>My Leave Requests</h2>

          {/* Check whether leave requests are available */}
          {leaveRequests.length === 0 ? (
            <p>No leave requests found.</p>
          ) : (

            // Display leave request details in table
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
                </tr>
              </thead>

              <tbody>

                {/* Display each submitted leave request */}
                {leaveRequests.map((request) => (
                  <tr key={request.id}>

                    <td>{request.employeeId}</td>
                    <td>{request.employeeName}</td>
                    <td>{request.leaveType}</td>
                    <td>{request.fromDate}</td>
                    <td>{request.toDate}</td>
                    <td>{request.reason}</td>
                    <td>{request.status}</td>

                  </tr>
                ))}

              </tbody>

            </table>
          )}

          {/* Return from requests to dashboard */}
          <button onClick={() => setPage("dashboard")}>
            Back to Dashboard
          </button>

        </div>
      )}

    </div>
  );
}

// Export main application component
export default App;
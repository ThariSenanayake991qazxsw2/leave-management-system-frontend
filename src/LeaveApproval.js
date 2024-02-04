import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveApproval = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        // Call the GET API to fetch leave details
        const response = await axios.get('http://localhost:3001/leavemanagementsystem/leaves');
        setLeaves(response.data);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    };

    fetchLeaves();
  }, []);

  const handleLeaveAction = async (leaveId, action) => {
    try {
      // Change the status of leave details
      await axios.put(`http://localhost:3001/leavemanagementsystem/leaves/${leaveId}`, { action });
      // Refresh leaves after updating
      const response = await axios.get('http://localhost:3001/leavemanagementsystem/leaves');
      setLeaves(response.data);
    } catch (error) {
      console.error('Error updating leave:', error);
    }
  };

  return (
    <div>
      <h2 style={{ marginLeft: '70px'}}>Leave Approval</h2>
      <table style={{ width: '80%', borderCollapse: 'collapse', marginTop: '20px' , marginLeft: '70px'}}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Employee ID</th>
            <th style={tableHeaderStyle}>Leave Type</th>
            <th style={tableHeaderStyle}>Start Date</th>
            <th style={tableHeaderStyle}>Number of Days</th>
            <th style={tableHeaderStyle}>Reason</th>
            <th style={tableHeaderStyle}>Status</th>
            <th style={tableHeaderStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id} style={tableRowStyle}>
              <td style={tableCellStyle}>{leave.employeeId}</td>
              <td style={tableCellStyle}>{leave.leaveType}</td>
              <td style={tableCellStyle}>{leave.startDate}</td>
              <td style={tableCellStyle}>{leave.numberOfDays}</td>
              <td style={tableCellStyle}>{leave.reason}</td>
              <td style={tableCellStyle}>{leave.status}</td>
              <td style={tableCellStyle}>
                {leave.status === 'pending' && (
                  <div>
                    <button onClick={() => handleLeaveAction(leave._id, 'approve')} style={buttonStyle}>Approve</button>
                    <button onClick={() => handleLeaveAction(leave._id, 'reject')} style={buttonStyle}>Reject</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  backgroundColor: '#007BFF',
  color: '#fff',
  padding: '10px',
  border: '1px solid #ddd',
};

const tableRowStyle = {
  backgroundColor: '#f4f4f4',
};

const tableCellStyle = {
  padding: '10px',
  border: '1px solid #ddd',
};

const buttonStyle = {
  backgroundColor: '#28a745',
  color: '#fff',
  padding: '8px 12px',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '4px',
};

export default LeaveApproval;

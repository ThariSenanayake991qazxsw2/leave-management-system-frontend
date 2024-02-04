import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function LeaveForm({ match }) {
  const [leaves, setLeaves] = useState([]);

  // Default Leave Application Form Details
  const [formData, setFormData] = useState({
    employeeId: '',
    leaveType: 'Annual',
    actType: 'WagesBoardAct',
    startDate: new Date().toJSON().slice(0, 10),
    numberOfDays: 1,
    reason: '',
  });

  // State to store search results separately
  const [searchResults, setSearchResults] = useState([]);

  // Reset form after submit
  const resetForm = () => {
    setFormData({
      employeeId: '',
      leaveType: 'Annual',
      actType: 'WagesBoardAct',
      startDate: new Date().toJSON().slice(0, 10),
      numberOfDays: 1,
      reason: '',
    });
  };

  useEffect(() => {
    async function fetchLeaves() {
      try {
        // Call the GET API to fetch leave details
        const response = await axios.get('http://localhost:3001/leavemanagementsystem/leaves');
        setLeaves(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchLeaves();
  }, []);

  const handleSearch = async () => {
    try {
      // Fetch the latest leaves data from the server
      const response = await axios.get('http://localhost:3001/leavemanagementsystem/leaves');
      setLeaves(response.data);
  
      // Filter leaves based on the employeeId
      const results = response.data.filter((leave) => leave.employeeId === formData.employeeId);
  
      // Update search results state
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the POST API to save the leave details
      const response = await axios.post(`http://localhost:3001/leavemanagementsystem/leaves`, formData);
      console.log(response.data.message); 
      resetForm();
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 400) {
        // Handle leave entitlement exceeded error
        alert('Leave entitlement exceeded. Please review your leave request.');
      } else {
        // Handle other errors
        alert('Error submitting leave request. Please try again.');
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={leaveFormStyle}>
        <h2 style={{ textAlign: 'center' }}>Leave Application Form</h2>
        <form onSubmit={handleSubmit} style={{ margin: '50px' }}>
          <table>
            <tr>
              <td>
                <label>
                  Employee ID   :
                </label>
              </td>
              <td>
                <input
                    style={feildStyle}
                    type="text"
                    required
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  />
                <button type="button" title="Click to search and view employee leave history by entering id" style={searchButtonStyle} disabled={!formData.employeeId} onClick={handleSearch} >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </td>
            </tr>
            <br />

            <tr>
              <td>
                <label>
                    Leave Type   :
                </label>
              </td>
              <td>
                <select
                  style={feildStyle}
                  value={formData.leaveType}
                  onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                >
                  <option value="Annual">Annual</option>
                  <option value="Casual">Casual</option>
                  <option value="Medical">Medical</option>
                </select>
              </td>
            </tr>
              
             <br />

             <tr>
              <td>
                <label>
                  Act Type   :
                </label>
              </td>
              <td>
                <select
                  style={feildStyle}
                  value={formData.actType}
                  onChange={(e) => setFormData({ ...formData, actType: e.target.value })}
                >
                  <option value="WagesBoardAct">Wages Board Act</option>
                  <option value="ShopOffice">Shop & Office</option>
                </select>
              </td>
            </tr>
            <br />

            <tr>
              <td>
                <label>
                  Start Date   :
                </label>
              </td>
              <td>
                <input
                    style={feildStyle}
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
              </td>
            </tr>
            <br />

            <tr>
              <td>
                <label>
                  Number of Days:
                </label>
              </td>
              <td>
                <input
                    style={feildStyle}
                    type="number"
                    min="1"
                    value={formData.numberOfDays}
                    onChange={(e) => setFormData({ ...formData, numberOfDays: e.target.value })}
                  />
              </td>
            </tr>
            <br />

            <tr>
              <td>
                <label>
                  Reason   :
                </label>
              </td>
              <td>
                <textarea
                    style={feildStyle}
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  />
              </td>
            </tr>
            <br />

            <tr>
              <td colSpan="2">
                <button type="submit" style={{ width: '50%', borderRadius: '15px', backgroundColor: '#007BFF', 
                  margin: 'auto', padding: '10px', display: 'block', transition: 'background-color 0.3s'}} 
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#28a745')} 
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#007BFF')}>Submit</button>
              </td>
            </tr>
            
              
          </table>
        </form>
        
      </div>
      <div>
        {/* Display search results in a table format */}
        {searchResults.length > 0 && (
              <div style={{ width: '60%', marginLeft: '0px' }}>
              <h3>Employee Leave History</h3>
              <table style={{ width: '150%', borderCollapse: 'collapse', marginTop: '10px', border: '2px solid black'}}>
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Leave Type</th>
                    <th style={tableHeaderStyle}>Start Date</th>
                    <th style={tableHeaderStyle}>Number of Days</th>
                    <th style={tableHeaderStyle}>Reason</th>
                    <th style={tableHeaderStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((result) => (
                    <tr key={result._id}>
                      <td style={tableCellStyle}>{result.leaveType}</td>
                      <td style={tableCellStyle}>{result.startDate}</td>
                      <td style={tableCellStyle}>{result.numberOfDays}</td>
                      <td style={tableCellStyle}>{result.reason}</td>
                      <td style={tableCellStyle}>{result.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </div>
  );
}

const leaveFormStyle = {
  width: '500px',
  margin: '30px 0px 30px 100px',
  padding: '10px 0px 0px 10px',
  border: '1px solid #ccc',
  backgroundColor: '#f4f4f4',
  border: '3px solid black',
};

const tableHeaderStyle = {
  borderBottom: '2px solid #ddd',
  background: '#f2f2f2',
  padding: '8px',
  textAlign: 'left',
};

const tableCellStyle = {
  borderBottom: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const feildStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
  marginBottom: '10px',
};

const searchButtonStyle = {
  marginLeft: '10px',
  padding: '8px',
  borderRadius: '5px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

export default LeaveForm;

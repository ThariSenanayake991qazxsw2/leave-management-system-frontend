import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LeaveForm from './LeaveForm';
import LeaveApproval from './LeaveApproval';

function App() {
  return (
    <Router>
      <div>
        <h1 style={{ textAlign: 'center', margin: '20px 0', color: '#333' }}>Leave Management System</h1>
        <nav style={navStyle}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <li style={{ display: 'inline-block' }}>
              <Link to="/leave-form" style={linkStyle}>
                Leave Form
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/leave-form" element={<LeaveForm />} />
          <Route path="/leave-approval" element={<LeaveApproval />} />
        </Routes>
      </div>
    </Router>
  );
}
const navStyle = {
  background: '#333',
  padding: '10px',
  textAlign: 'center', 
};

const linkStyle = {
  color: '#fff',
  margin: '0 10px', 
  textDecoration: 'none',
  padding: '8px 16px', 
  border: '1px solid #fff', 
  borderRadius: '5px', 
};
export default App;

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const employeeId = sessionStorage.getItem('employeeId');

function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9191/emp/tasks/${employeeId}`)
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <div className="welcome1">
        <Link to="/">
          <h1 className='welcome-h1'>ElectroGhiurai</h1>
        </Link>
        <Link to="/login">
          <button className="welcome-button">Sign Out</button>
        </Link>
      </div>
      <div className='app'>
        <h1 className='app-h1'>Employee Dashboard</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Task Number</th>
              <th>Task Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.taskNr}>
                <td>{index + 1}</td>
                <td>{task.taskNr}</td>
                <td>{task.taskType}</td>
                <td>
                  <button className='app-button'>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeDashboard;

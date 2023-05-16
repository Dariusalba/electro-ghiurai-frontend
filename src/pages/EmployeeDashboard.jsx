import React, { useState, useEffect } from 'react';

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
      <h1>Employee Dashboard</h1>
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
                <button>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeDashboard;

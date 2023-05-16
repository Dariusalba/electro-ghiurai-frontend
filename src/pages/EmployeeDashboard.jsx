import React, { useState, useEffect } from 'react';

const employeeId = sessionStorage.getItem('employeeId');

function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9191/emp/tasks/${employeeId}`)
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.log(error));
  }, []);

  const getTaskTypeName = (taskType) => {
    switch (taskType) {
      case 1:
        return 'SPEC';
      case 2:
        return 'CODE';
      default:
        return 'REVIEW';
    }
  };

  const openModal = (task) => {
    setSelectedTask(task);
    fetch(`http://localhost:9191/customer/order/${task.internalOrder}`)
      .then(response => response.json())
      .then(data => setOrderDetails(data))
      .catch(error => console.log(error));
  };

  const closeModal = () => {
    setSelectedTask(null);
    setOrderDetails(null);
  };

  return (
    <div className='app'>
      <h1>Employee Dashboard</h1>
      <table className='order-table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Task Number</th>
            <th>Task Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.taskNr}>
              <td>{index + 1}</td>
              <td>{task.taskNr}</td>
              <td>{getTaskTypeName(task.taskType)}</td>
              <td>
                <button onClick={() => openModal(task)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTask && (
        <div className="modal">
          <div className="modal-content">
            <h2>Task #{selectedTask.taskNr}</h2>
            {orderDetails ? (
              <div>
                <p>Order #{selectedTask.internalOrder}</p>
                <p>Order title: {orderDetails.title}</p>
                <p>Order description: {orderDetails.description}</p>
                <button>Open SpecDoc</button>
                <button>Upload Spec</button>
              </div>
            ) : (
              <p>Failed to load order details</p>
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboard;

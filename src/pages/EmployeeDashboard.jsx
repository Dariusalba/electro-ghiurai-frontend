import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const employeeId = sessionStorage.getItem('employeeId');

function EmployeeDashboard() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderRemarks, setOrderRemarks] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

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
        fetch(`http://localhost:9191/emp/order-details/${task.internalOrder}`)
            .then(response => response.json())
            .then(data => setOrderDetails(data))
            .catch(error => console.log(error));

        fetch(`http://localhost:9191/emp/order-remarks/${task.internalOrder}`)
            .then(response => response.json())
            .then(data => setOrderRemarks(data))
            .catch(error => console.log(error));
    };

    const closeModal = () => {
        setSelectedTask(null);
        setOrderDetails(null);
        setOrderRemarks(null);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const specUploaded = () =>
        toast.success('✅ Spec uploaded successfully', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    const uploadSpecDoc = () => {
        if (selectedFile && selectedTask) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            fetch(`http://localhost:9191/emp/spec/${selectedTask.taskNr}`, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log('File uploaded:', data);
                })
                .catch(error => console.log(error));
            specUploaded();
            closeModal();
        }
    };

    return (
      <div>
        <div className="welcome2">
          <Link to="/">
            <h1 className='welcome-h1'>ElectroGhiurai</h1>
          </Link>
          <Link to="/login">
            <button className="welcome-button">Sign Out</button>
          </Link>
        </div>
        <div className='app'>
            <h1>Employee Dashboard</h1>
            <table className='order-table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Task Number</th>
                        <th>Task Type</th>
                        <th>Deadline</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={task.taskNr}>
                            <td>{index + 1}</td>
                            <td>{task.taskNr}</td>
                            <td>{getTaskTypeName(task.taskType)}</td>
                            <td>{task.deadline}</td>
                            <td>
                                <button className='app-button' onClick={() => openModal(task)}>View</button>
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
                                <p>Remarks:</p>
                                {orderRemarks ? (
                                    <ul>
                                        {orderRemarks.map(remark => (
                                            <li key={remark.remarkId}>{remark.description}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No remarks available</p>
                                )}
                                <Link to='/employee/doceditor'>
                                  <button className='app-button' >Open SpecDoc</button>
                                </Link>
                                <input type="file" accept=".pdf" onChange={handleFileChange} />
                                <button className='app-button' onClick={uploadSpecDoc}>Upload Spec</button>
                            </div>
                        ) : (
                            <p>Failed to load order details</p>
                        )}
                        <button className='app-button' onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
      </div>
    );
}
export default EmployeeDashboard;

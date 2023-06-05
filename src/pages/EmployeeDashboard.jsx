import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const userId = sessionStorage.getItem('userId');

function EmployeeDashboard() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderRemarks, setOrderRemarks] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [codeModalVisible, setCodeModalVisible] = useState(false);
    const [reviewModalVisible, setReviewModalVisible] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:9191/emp/tasks/${userId}`)
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

    const redirectToVSCDev = () => {
        window.open('https://vscode.dev', '_blank');
    }

    const openModal = (task) => {
        setSelectedTask(task);
        if (task.taskType === 1) {
            setCodeModalVisible(false);
            setReviewModalVisible(false);
        } else if (task.taskType === 2) {
            setCodeModalVisible(true);
            setReviewModalVisible(false);
        } else {
            setCodeModalVisible(false);
            setReviewModalVisible(true);
        }
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
        setCodeModalVisible(false);
        setReviewModalVisible(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const specUploaded = () =>
        toast.success('✅ Task Completed successfully', {
            position: "bottom-right",
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

    const handleDownloadSpec = async () => {
        try {
            const response = await fetch(`http://localhost:9191/emp/download/spec/${selectedTask.taskNr}`);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `spec-${selectedTask.taskNr}.pdf`;

            link.click();

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDownloadCode = async () => {
        try {
            const response = await fetch(`http://localhost:9191/emp/download/code/${selectedTask.taskNr}`);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `code-${selectedTask.taskNr}.zip`;

            link.click();

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        }
    };
    const formatDeadline = (deadline) => {
        return deadline.substring(0,10);
    }

    const uploadCode = () => {
        if (selectedFile && selectedTask) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            fetch(`http://localhost:9191/emp/code/${selectedTask.taskNr}`, {
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

    const handleDeclareDefect = () => {
        const requestBody = {
            status: 2
        };

        fetch(`http://localhost:9191/emp/review/${selectedTask.taskNr}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Defect declared:', data);
                closeModal();
            })
            .catch(error => console.log(error));
    };

    const handleDeclareNoDefect = () => {
        const requestBody = {
            status: 1
        };

        fetch(`http://localhost:9191/emp/review/${selectedTask.taskNr}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {
                console.log('No defect declared:', data);
                closeModal();
            })
            .catch(error => console.log(error));
    };

    const handleDeclareCodeDefect = () => {
        const requestBody = {
            status: 3
        };

        fetch(`http://localhost:9191/emp/review/${selectedTask.taskNr}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Defect declared:', data);
                closeModal();
            })
            .catch(error => console.log(error));
    };


    return (
        <div>
            <div class="w3-top">
                <div class="w3-bar w3-white w3-card" id="myNavbar">
                    <a href="/" class="w3-bar-item w3-button w3-wide">ELECTROGHIURAI</a>
                    <div class="w3-right w3-hide-small">
                        <a href="/login" class="w3-bar-item w3-button"><i class="fa fa-sign-out"></i> SIGN OUT</a>
                    </div>
                </div>
            </div>
            <div className='employee-bg'>
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
                                <td>{formatDeadline(task.deadline)}</td>
                                <td>
                                    <button className='w3-button w3-black app-button' onClick={() => openModal(task)}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedTask && !codeModalVisible && (
                    <div className="modal">
                        <div className="modal-content">
                            <button className="w3-button w3-black close-button" onClick={closeModal}>
                            &times;
                            </button>
                            <h2>Task #{selectedTask.taskNr} - SPEC</h2>
                            {orderDetails ? (
                                <div>
                                    <table className='order-table'>
                                        <tbody>
                                            <tr>
                                                <td>Order</td>
                                                <td>#{selectedTask.internalOrder}</td>
                                            </tr>
                                            <tr>
                                                <td>Order title</td>
                                                <td>{orderDetails.title}</td>
                                            </tr>
                                            <tr>
                                                <td>Order description</td>
                                                <td>{orderDetails.description}</td>
                                            </tr>
                                        </tbody>
                                    </table>
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
                                    <div className='dev-func'>
                                        <button className='w3-button w3-black app-button-simple2' onClick={() => window.open('/doceditor','mywin','width=1200,height=800')}>Open SpecDoc</button>
                                        <input type="file" accept=".pdf" onChange={handleFileChange} />
                                        <button className='w3-button w3-black app-button-simple2' onClick={uploadSpecDoc}>Upload Spec</button>
                                    </div>
                                </div>
                            ) : (
                                <p>Failed to load order details</p>
                            )}
                        </div>
                    </div>
                )}

                {selectedTask && codeModalVisible && (
                    <div className="modal">
                        <div className="modal-content">
                            <button className="w3-button w3-black close-button" onClick={closeModal}>
                            &times;
                            </button>
                            <h2>Task #{selectedTask.taskNr} - CODE</h2>
                            {orderDetails ? (
                                <div>
                                    <p>Order title: {orderDetails.title}</p>
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
                                </div>
                            ) : (
                                <p>Failed to load order details</p>
                            )}
                            <div className='dev-func'>
                                <button className="w3-button w3-black app-button-simple2" onClick={handleDownloadSpec}>Download Spec</button>
                                <button className="w3-button w3-black app-button-simple2" onClick={redirectToVSCDev}>Open VSCode</button>
                                <input type="file" accept=".zip" onChange={handleFileChange} />
                                <button className="w3-button w3-black app-button-simple2" onClick={uploadCode}>Upload Code</button>
                            </div>
                        </div>
                    </div>
                )}
                {reviewModalVisible && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Task #{selectedTask.taskNr} - REVIEW</h2>
                            {orderDetails ? (
                                <div>
                                    <p>Order title: {orderDetails.title}</p>
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
                                    <div className='dev-func'>
                                        <button className="w3-button w3-black app-button-simple2" onClick={handleDownloadSpec}>Download Spec</button>
                                        <button className="w3-button w3-black app-button-simple2" onClick={handleDownloadCode}>Download Code</button>
                                        <button className="w3-button w3-black app-button-simple2" onClick={handleDeclareDefect}>Declare Spec Defect</button>
                                        <button className="w3-button w3-black app-button-simple2" onClick={handleDeclareCodeDefect}>Declare Code Defect</button>
                                        <button className="w3-button w3-black app-button-simple2" onClick={handleDeclareNoDefect}>Declare No Defect</button>
                                    </div>
                                </div>
                            ) : (
                                <p>Failed to load order details</p>
                            )}
                            <button className='w3-button w3-black app-button' onClick={closeModal}>Close</button>
                        </div>
                    </div>
                )}
                <ToastContainer />
            </div>
            </div>
        </div>
    );
}

export default EmployeeDashboard;

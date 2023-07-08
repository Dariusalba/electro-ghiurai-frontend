import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import '../components/tasks.css';

const userId = sessionStorage.getItem('userId');

function EmployeeDashboard() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderRemarks, setOrderRemarks] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [codeModalVisible, setCodeModalVisible] = useState(false);
    const [reviewModalVisible, setReviewModalVisible] = useState(false);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [activeTab, setActiveTab] = useState('assigned');
    const [taskComplete, setTaskComplete] = useState([]);

    const getTasks = () => {
        fetch(`http://localhost:9191/emp/tasks/${userId}`)
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.log(error));
    }
    const getCompletedTasks = () => {
        fetch(`http://localhost:9191/emp/completed-tasks/${userId}`)
            .then(response => response.json())
            .then(data => setTaskComplete(data))
            .catch(error => console.log(error));
    }
    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        getCompletedTasks();
    }, []);

    const handleSetActiveTab = (tab) => {
        setActiveTab(tab);
    };

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
        if (completedTasks.includes(task.taskNr)) {
            return;
        }
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


    const fetchOrderDetails = (internalOrder) => {
        fetch(`http://localhost:9191/emp/order-details/${internalOrder}`)
            .then(response => response.json())
            .then(data => setOrderDetails(data))
            .catch(error => console.log(error));
    };

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
                    specUploaded();
                    closeModal();
                    setCompletedTasks([...completedTasks, selectedTask.taskNr]);
                    setTaskComplete([...taskComplete, selectedTask]);
                    fetchOrderDetails(selectedTask.internalOrder);
                })
                .catch(error => console.log(error));
            setTimeout(() => {
                window.location.reload();
            }, 2000);
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
        if (deadline) {
            return deadline.substring(0, 10);
        }
        return "";
    }

    const formatVerdict = (status) => {
        let formatStatus = "No Defect";
        switch (status) {
            case 2:
                formatStatus = "Spec Defect";
                break;
            case 3:
                formatStatus = "Code Defect";
                break;
            default:
                formatStatus = "Error Printing Verdict";
        }
        return formatStatus;
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
                    specUploaded();
                    closeModal();
                    setCompletedTasks([...completedTasks, selectedTask.taskNr]);
                    setTaskComplete([...taskComplete, selectedTask]);
                    fetchOrderDetails(selectedTask.internalOrder);
                })
                .catch(error => console.log(error));
            setTimeout(() => {
                window.location.reload();
            }, 2000);
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
                specUploaded();
                closeModal();
            })
            .catch(error => console.log(error));

        setCompletedTasks([...completedTasks, selectedTask.taskNr]);
        setTaskComplete([...taskComplete, selectedTask]);
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
                specUploaded();
                closeModal();
            })
            .catch(error => console.log(error));

        setCompletedTasks([...completedTasks, selectedTask.taskNr]);
        setTaskComplete([...taskComplete, selectedTask]);
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
                specUploaded();
                closeModal();
            })
            .catch(error => console.log(error));

        setCompletedTasks([...completedTasks, selectedTask.taskNr]);
        setTaskComplete([...taskComplete, selectedTask]);
    };


    return (
        <div>
            <div className="w3-top">
                <div className="w3-bar w3-white w3-card" id="myNavbar">
                    <a href="/" className="w3-bar-item w3-button w3-wide">ELECTROGHIURAI</a>
                    <div className="w3-right w3-hide-small">
                        <a href="/login" className="w3-bar-item w3-button"><i className="fa fa-sign-out"></i> SIGN OUT</a>
                    </div>
                </div>
            </div>
            <div className='employee-bg'>
                <div className='app'>
                    <h1>Employee Dashboard</h1>
                    <div className='sidebar'>
                        <div className='sidebar-tabs'>
                            <button className={activeTab === 'assigned' ? 'sidebar-tab active' : 'sidebar-tab'} onClick={() => handleSetActiveTab('assigned')}>Assigned Tasks</button>
                            <button className={activeTab === 'completed' ? 'sidebar-tab active' : 'sidebar-tab'} onClick={() => handleSetActiveTab('completed')}>Completed Tasks</button>
                        </div>
                        <div className='task-list'>
                            {activeTab === 'assigned' && (
                                <div>
                                    <h2>Assigned Tasks</h2>
                                    <div className='task-container'>
                                        {tasks.map((task, index) => {
                                            if (completedTasks.includes(task.taskNr)) {
                                                return null;
                                            }
                                            return (
                                                <div key={task.taskNr} className='task'>
                                                    <div>{index + 1}</div>
                                                    <div>
                                                        <div>
                                                            <span>Task Number: </span>
                                                            <span>{task.taskNr}</span>
                                                        </div>
                                                        <div>
                                                            <span>Task Type: </span>
                                                            <span>{getTaskTypeName(task.taskType)}</span>
                                                        </div>
                                                        <div>
                                                            <span>Deadline: </span>
                                                            <span>{formatDeadline(task.deadline)}</span>
                                                        </div>
                                                        <div>
                                                            <button className='w3-button w3-black app-button-simple3' onClick={() => openModal(task)}>View</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            {activeTab === 'completed' && (
                                <div>
                                    <h2>Completed Tasks</h2>
                                    <div className='task-container'>
                                        {taskComplete.map((task, index) => (
                                            <div key={task.taskNr} className='task'>
                                                <div>{index + 1}</div>
                                                <div>
                                                    <div>
                                                        <span>Task Number: </span>
                                                        <span>{task.taskNr}</span>
                                                    </div>
                                                    <div>
                                                        <span>Task Type: </span>
                                                        <span>{getTaskTypeName(task.taskType)}</span>
                                                    </div>
                                                    <div>
                                                        <span>Deadline: </span>
                                                        <span>{formatDeadline(task.deadline)}</span>
                                                    </div>
                                                    <div>
                                                        <button className='w3-button w3-black app-button-simple3' onClick={() => openModal(task)}>View</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {selectedTask && !codeModalVisible && activeTab === 'assigned' && (
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
                                    <button className='w3-button w3-black app-button-simple2' onClick={() => window.open('/doceditor', 'mywin', 'width=1200,height=800')}>Open SpecDoc</button>
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

            {selectedTask && codeModalVisible && activeTab === 'assigned' && (
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
            {reviewModalVisible && activeTab === 'assigned' && (
                <div className="modal">
                    <div className="modal-content2">
                        <button className="w3-button w3-black close-button" onClick={closeModal}>
                            &times;
                        </button>
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
                                    <h2>Declare Verdict</h2>
                                    <button className="w3-button w3-black app-button-simple2" onClick={handleDeclareDefect}>Spec Defect</button>
                                    <button className="w3-button w3-black app-button-simple2" onClick={handleDeclareCodeDefect}>Code Defect</button>
                                    <button className="w3-button w3-black app-button-simple2" onClick={handleDeclareNoDefect}>No Defect</button>
                                </div>
                            </div>
                        ) : (
                            <p>Failed to load order details</p>
                        )}
                    </div>
                </div>
            )}
            {selectedTask && !codeModalVisible && activeTab === 'completed' && (
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
                                    <button className="w3-button w3-black app-button-simple2" onClick={handleDownloadSpec}>Download Spec</button>
                                </div>
                            </div>
                        ) : (
                            <p>Failed to load order details</p>
                        )}
                    </div>
                </div>
            )}
            {selectedTask && codeModalVisible && activeTab === 'completed' && (
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
                            <button className="w3-button w3-black app-button-simple2" onClick={handleDownloadCode}>Download Code</button>
                        </div>
                    </div>
                </div>
            )}
            {reviewModalVisible && activeTab === 'completed' && (
                <div className="modal">
                    <div className="modal-content2">
                        <button className="w3-button w3-black close-button" onClick={closeModal}>
                            &times;
                        </button>
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
                                    <h2>Final Verdict</h2>
                                    <h2>{formatVerdict(orderDetails.orderStatus)}</h2>
                                </div>
                            </div>
                        ) : (
                            <p>Failed to load order details</p>
                        )}
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default EmployeeDashboard;

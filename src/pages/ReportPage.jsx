import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';

function ReportPage() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:9191/mng/report/customer')
      .then(response => response.json())
      .then(data => {
        setReportData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (!reportData) {
    return <div>Report data could not be retrieved.</div>;
  }

  const pieData = {
    labels: ['Pending Orders', 'Accepted Orders', 'Finished Orders'],
    datasets: [
      {
        data: [
          reportData.pending_orders,
          reportData.accepted_orders,
          reportData.finished_orders,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const barData = {
    labels: ['Total Users', 'Total Customers'],
    datasets: [
      {
        label: 'Count',
        backgroundColor: ['#FF6384', '#36A2EB'],
        borderColor: ['#FF6384', '#36A2EB'],
        borderWidth: 1,
        data: [reportData.total_users, reportData.total_customers],
      },
    ],
  };

  return (
    <div>
      <h1>Report Page</h1>
      <div>
        <h2>Pie Chart - Order Status</h2>
        <Pie data={pieData} />
      </div>
      <div>
        <h2>Bar Chart - User and Customer Count</h2>
        <Bar data={barData} />
      </div>
    </div>
  );
}

export default ReportPage;

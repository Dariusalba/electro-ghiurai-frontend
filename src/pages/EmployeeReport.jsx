import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Tooltip, Legend } from 'recharts';

const EmployeeReportComponent = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [totalEmployeeNumber, setTotalEmployeeNumber] = useState(0);
  const [juniorDevelopers, setJuniorDevelopers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9191/mng/report/customer');
        const data = await response.json();

        const { employee_report, total_employee_number, junior_developers } = data;

        setEmployeeData(employee_report);
        setTotalEmployeeNumber(total_employee_number);
        setJuniorDevelopers(junior_developers);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <h1>Employee Report</h1>
      <div className="bar-chart">
        <BarChart width={600} height={400} data={employeeData}>
          <Bar dataKey="total_tasks_assigned" fill="#8884d8" name="Total Tasks Assigned" />
          <Bar dataKey="tasks_completed_in_time" fill="#82ca9d" name="Tasks Completed in Time" />
          <Bar dataKey="tasks_completed_late" fill="#ffc658" name="Tasks Completed Late" />
          <Bar dataKey="current_tasks_assigned" fill="#ff7300" name="Current Tasks Assigned" />
          <Tooltip />
          <Legend />
        </BarChart>
      </div>

      <div className="summary-chart">
        <h2>Summary</h2>
        <BarChart width={400} height={300} data={[
          { name: 'Total Employees', value: totalEmployeeNumber },
          { name: 'Junior Developers', value: juniorDevelopers }
        ]}>
          <Bar dataKey="value" fill="#8884d8" />
          <Tooltip />
          <Legend />
        </BarChart>
      </div>
    </div>
  );
};

export default EmployeeReportComponent;

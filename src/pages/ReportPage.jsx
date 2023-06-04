import React, { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const OrderChart = ({ orderData }) => {
  const parsedTopCountries = JSON.parse(orderData.top_3_countries);
  const countryData = [
    { name: parsedTopCountries['first_country'], value: parsedTopCountries['first_country_number'] },
    { name: parsedTopCountries['second_country'], value: parsedTopCountries['second_country_number'] },
    { name: parsedTopCountries['third_country'], value: parsedTopCountries['third_country_number'] },
  ];

  const colors = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <div>
      <h1>Order Information</h1>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          data={countryData}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {countryData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

const EmployeeChart = ({ employeeData }) => (
  <div>
    <h1>Employee Report</h1>
    <BarChart width={600} height={400} data={employeeData.employee_report}>
      <Bar dataKey="total_tasks_assigned" fill="#8884d8" name="Total Tasks Assigned" />
      <Bar dataKey="tasks_completed_in_time" fill="#82ca9d" name="Tasks Completed in Time" />
      <Bar dataKey="tasks_completed_late" fill="#ffc658" name="Tasks Completed Late" />
      <Bar dataKey="current_tasks_assigned" fill="#ff7300" name="Current Tasks Assigned" />
      <Tooltip />
      <Legend />
    </BarChart>
  </div>
);

const ReportPage = () => {
  const [orderData, setOrderData] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [selectedChart, setSelectedChart] = useState('order');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseOrder = await fetch('http://localhost:9191/mng/report/order');
        const responseEmployee = await fetch('http://localhost:9191/mng/report/employee');
        const orderJsonData = await responseOrder.json();
        const employeeJsonData = await responseEmployee.json();
        setOrderData(orderJsonData);
        setEmployeeData(employeeJsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChartChange = (chartType) => {
    setSelectedChart(chartType);
  };

  return (
    <div>
      <div className="sidebar">
        <h2>Chart Selection</h2>
        <ul>
          <li onClick={() => handleChartChange('order')}>Order Charts</li>
          <li onClick={() => handleChartChange('employee')}>Employee Charts</li>
        </ul>
      </div>
      <div className="chart-container">
        {selectedChart === 'order' && orderData && <OrderChart orderData={orderData} />}
        {selectedChart === 'employee' && employeeData && <EmployeeChart employeeData={employeeData} />}
      </div>
    </div>
  );
};

export default ReportPage;

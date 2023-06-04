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

  const orderSummaryData = [
    { name: 'Total Orders', value: orderData.total_orders },
    { name: 'Pending Orders', value: orderData.pending_orders },
    { name: 'Accepted Orders', value: orderData.accepted_orders },
    { name: 'Finished Orders', value: orderData.finished_orders },
  ];

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
      <div>
        <h2>Order Summary</h2>
        <BarChart width={400} height={300} data={orderSummaryData}>
          <Bar dataKey="value" fill="#8884d8" />
          <Tooltip />
          <Legend />
        </BarChart>
      </div>
      <div>
        <h2>Order Details</h2>
        <p>Total Users: {orderData.total_users}</p>
        <p>Total Customers: {orderData.total_customers}</p>
        <p>Most Active Customer: {orderData.most_active_customer}</p>
        <p>Order Number of Most Active Customer: {orderData.most_active_customer_order_number}</p>
        <p>Average Customer Age: {orderData.average_customer_age}</p>
      </div>
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
    <div>
      <h2>Employee Summary</h2>
      <p>Total Employees: {employeeData.total_employee_number}</p>
      <p>Junior Developers: {employeeData.junior_developers}</p>
    </div>
  </div>
);

const ReportPage = () => {
  const [chartType, setChartType] = useState('order');
  const [orderData, setOrderData] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await fetch('http://localhost:9191/mng/report/customer');
        const orderJsonData = await orderResponse.json();
        setOrderData(orderJsonData);

        const employeeResponse = await fetch('http://localhost:9191/mng/report/employee');
        const employeeJsonData = await employeeResponse.json();
        setEmployeeData(employeeJsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h1>Chart Selection</h1>
        <ul>
          <li onClick={() => setChartType('order')}>Order Chart</li>
          <li onClick={() => setChartType('employee')}>Employee Chart</li>
        </ul>
      </div>
      <div>
        {chartType === 'order' && orderData && <OrderChart orderData={orderData} />}
        {chartType === 'employee' && employeeData && <EmployeeChart employeeData={employeeData} />}
      </div>
    </div>
  );
};

export default ReportPage;

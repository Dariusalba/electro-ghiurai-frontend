import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    { name: 'Pending Orders', value: orderData.pending_orders },
    { name: 'Accepted Orders', value: orderData.accepted_orders },
    { name: 'Finished Orders', value: orderData.finished_orders },
  ];

  const orderDetailsData = [
    { name2: 'Total Users', value2: orderData.total_users },
    { name1: 'Total Customers', value1: orderData.total_customers },
    { name: 'Average Customer Age', value: orderData.average_customer_age}
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
        <PieChart width={400} height={300}>
          <Pie
            dataKey="value"
            data={orderSummaryData}
            fill="#8884d8"
            label
          >
            {orderSummaryData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      <div>
        <h2>Order Details</h2>
        <BarChart width={400} height={300} data={orderDetailsData}>
          <Bar dataKey="value" nameKey="name" fill="#327ba8" name="Average Customer Age" />
          <Bar dataKey="value1" nameKey="name1" fill="#8884d8" name="Total Customers" />
          <Bar dataKey="value2" nameKey="name2" fill="#522c94" name="Total Users" />
          <Tooltip />
          <Legend />
        </BarChart>
      </div>
    </div>
  );
};

const EmployeeChart = ({ employeeData }) => (
  <div>
  <h1>Employee Report</h1>
  <div>
    <h2>Total Tasks Assigned</h2>
    <PieChart width={600} height={400}>
    <Pie data={employeeData.employee_report} dataKey="total_tasks_assigned" nameKey="full_name" fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} label />
    <Tooltip />
    <Legend />
    </PieChart>
  </div>
  <div>
    <h2>Tasks Completed In Time</h2>
  <PieChart width={600} height={400}>
    <Pie data={employeeData.employee_report} dataKey="tasks_completed_in_time" nameKey="full_name" fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} label />
    <Tooltip />
    <Legend />
  </PieChart>
  </div>
  <div>
    <h2>Tasks Completed Late</h2>
  <PieChart width={600} height={400}>
    <Pie data={employeeData.employee_report} dataKey="tasks_completed_late" nameKey="full_name" fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} label />
    <Tooltip />
    <Legend />
  </PieChart>
  </div>
  <div>
    <h2>Tasks Currently Assigned</h2>
  <PieChart width={600} height={400}>
    <Pie data={employeeData.employee_report} dataKey="current_tasks_assigned" nameKey="full_name" fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} label />
    <Tooltip />
    <Legend />
  </PieChart>
  </div>
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
      <div class="w3-top">
        <div class="w3-bar w3-white w3-card" id="myNavbar">
          <a href="/manager/dashboard" class="w3-bar-item w3-button w3-wide">ELECTROGHIURAI</a>
        </div>
      </div>
      <div className='app2'>
      <div>
        <h1>Chart Selection</h1>
        <button className="w3-button w3-black app-button-first" onClick={() => setChartType('order')}>Order Chart</button>
        <button className="w3-button w3-black app-button" onClick={() => setChartType('employee')}>Employee Chart</button>
        <Link to="/manager/dashboard">
        <button className="w3-button w3-black app-button">Go Back</button>
        </Link>
      </div>
      <div>
        {chartType === 'order' && orderData && <OrderChart orderData={orderData} />}
        {chartType === 'employee' && employeeData && <EmployeeChart employeeData={employeeData} />}
      </div>
      <br/>
      <p className='app-p'>©2023 ElectroGhiurai. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ReportPage;

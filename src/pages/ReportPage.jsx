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
      <h1 className='app-h1'>Customer Report</h1>
      <h2 className='app-h1'>Top 3 Countries</h2>
      <p className='app-chart-p'>This Pie Chart will show the top 3 countries which have the most customers.</p>
      <PieChart width={400} height={400} className='chart-margin'>
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
        <h2 className='app-h1'>Order Summary</h2>
        <p className='app-chart-p'>A Simple Pie Chart that shows the current status of every order.</p>
        <PieChart width={400} height={300} className='chart-margin'>
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
        <h2 className='app-h1'>Additional Customer Info</h2>
        <p className='app-chart-p'>For the end, a Bar chart that shows the number of users compared to costumers as well as the average age of the customers.</p>
        <BarChart width={400} height={300} data={orderDetailsData} className='chart-margin'>
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

const EmployeeChart = ({ employeeData }) =>{
  const employeeUserData = [
    {
      name:'Junior Developers',
      value:employeeData.junior_developers
    },
    {
      name: 'Senior Developers',
      value: employeeData.senior_developers
    }
  ];
  const employeeSummaryColors = ['#8884d8', '#82ca9d'];
  const employeeReportColors = () => {
    const tmpArr = [];
    for(let i=0;i < employeeData.employee_report.length;i++){
      let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      tmpArr[i]=color;
    }
    return tmpArr;
  }
  return (
  <div>
  <h1 className='app-h1'>Employee Report</h1>
  <div>
    <h2 className='app-h1'>Total Tasks Assigned</h2>
    <p className='app-chart-p'>The Following Pie Chart shows the total number of tasks assigned to all of the employees.</p>
    <PieChart width={600} height={400}>
    <Pie data={employeeData.employee_report} dataKey="total_tasks_assigned" nameKey="full_name" fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} label >
      {employeeData.employee_report.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={employeeReportColors()[index % employeeReportColors().length]} />
            ))}
      </Pie>
    <Tooltip />
    <Legend />
    </PieChart>
  </div>
  <div>
    <h2 className='app-h1'>Tasks Completed In Time</h2>
    <p className='app-chart-p'>This Next Pie Chart shows all the tasks that have been completed before the deadline by each employee.</p>
  <PieChart width={600} height={400}>
    <Pie data={employeeData.employee_report} dataKey="tasks_completed_in_time" nameKey="full_name" fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} label >
    {employeeData.employee_report.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={employeeReportColors()[index % employeeReportColors().length]} />
            ))}
      </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
  </div>
  <div>
    <h2 className='app-h1'>Tasks Completed Late</h2>
    <p className='app-chart-p'>This Pie Chart presents every task finished after the deadline for every employee.</p>
  <PieChart width={600} height={400}>
    <Pie data={employeeData.employee_report} dataKey="tasks_completed_late" nameKey="full_name" fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} label >
    {employeeData.employee_report.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={employeeReportColors()[index % employeeReportColors().length]} />
            ))}
      </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
  </div>
  <div>
    <h2 className='app-h1'>Tasks Currently Assigned</h2>
    <p className='app-chart-p'>This Pie Chart shows the current number of tasks assigned to each employee at the time of this report.</p>
  <PieChart width={600} height={400}>
    <Pie data={employeeData.employee_report} dataKey="current_tasks_assigned" nameKey="full_name" fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} label >
      {employeeData.employee_report.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={employeeReportColors()[index % employeeReportColors().length]} />
            ))}
      </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
  </div>
  <div>
  <h2 className='app-h1'>Employee Summary</h2>
  <p className='app-chart-p'>For the last Pie Chart, we have a simple summary of the percentage of users and employees currently.</p>
  <PieChart width={600} height={400}>
    <Pie data={employeeUserData} dataKey="value" nameKey="name" fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} label >
        {employeeUserData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={employeeSummaryColors[index % employeeSummaryColors.length]} />
          ))}
      </Pie>
    <Tooltip />
    <Legend />
  </PieChart>  
  </div>
</div>

);
}

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
      <div className="w3-top">
        <div className="w3-bar w3-white w3-card" id="myNavbar">
          <a href="/manager/dashboard" className="w3-bar-item w3-button w3-wide">ELECTROGHIURAI</a>
          <div className="w3-right w3-hide-small">
            <a href="#ochart" className="w3-bar-item w3-button" onClick={() => setChartType('order')}><i className="fa fa-compass"></i> CUSTOMER REPORT</a>
            <a href="#echart" className="w3-bar-item w3-button" onClick={() => setChartType('employee')}><i className="fa fa-user"></i> EMPLOYEE REPORT</a>
            <a href="/manager/dashboard" className="w3-bar-item w3-button"><i className="fa fa-sign-in"></i> GO BACK</a>
          </div>
        </div>
      </div>
      <div className='report-bg'>
        <div className='app'>
          {chartType === 'order' && orderData && <OrderChart orderData={orderData} />}
          {chartType === 'employee' && employeeData && <EmployeeChart employeeData={employeeData} />}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;

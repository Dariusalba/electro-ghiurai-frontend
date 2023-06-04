import React, { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import '../components/Chart.css';

const ReportPage = () => {
  const [data, setData] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);
  const [totalEmployeeNumber, setTotalEmployeeNumber] = useState(0);
  const [juniorDevelopers, setJuniorDevelopers] = useState(0);
  const [chartType, setChartType] = useState('orders');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9191/mng/report/customer');
        const jsonData = await response.json();
        setData(jsonData);

        const { employee_report, total_employee_number, junior_developers } = jsonData;
        setEmployeeData(employee_report);
        setTotalEmployeeNumber(total_employee_number);
        setJuniorDevelopers(junior_developers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Failed to fetch data from API</div>;
  }

  const parsedTopCountries = JSON.parse(data.top_3_countries);
  const countryData = [
    { name: parsedTopCountries["1st_country"], value: parsedTopCountries["first_country_number"] },
    { name: parsedTopCountries["2nd_country"], value: parsedTopCountries["second_country_number"] },
    { name: parsedTopCountries["3rd_country"], value: parsedTopCountries["third_country_number"] },
  ];
  const countryLabels = countryData.map((entry) => entry.name);

  return (
    <div className='dashboard-container'>
      <div className='sidebar'>
        <h2>Chart Selection</h2>
        <ul>
          <li onClick={() => setChartType('orders')}>Order Chart</li>
          <li onClick={() => setChartType('employees')}>Employee Chart</li>
        </ul>
      </div>

      <div className='main-content'>
        {chartType === 'orders' && (
          <div className='chart-container'>
            <h1>Order Information</h1>
            <div className='pie-chart'>
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={countryData}
                  cx={200}
                  cy={200}
                  outerRadius={80}
                  fill="#8884d8"
                  label
                  labels={countryLabels}
                >
                  {countryData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        )}

        {chartType === 'employees' && (
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
        )}
      </div>
    </div>
  );
};

export default ReportPage;

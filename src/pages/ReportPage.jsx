import React, { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import '../components/Chart.css';

const ReportPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9191/mng/report/customer');
        const jsonData = await response.json();
        setData(jsonData);
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
    { name: parsedTopCountries["1st_country"], value: parsedTopCountries["1st_country_number"] },
    { name: parsedTopCountries["2nd_country"], value: parsedTopCountries["2nd_country_number"] },
    { name: parsedTopCountries["3rd_country"], value: parsedTopCountries["3rd_country_number"] },
  ];
  const countryLabels = countryData.map((entry) => entry.name);
  return (
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

      <h1>Other Information</h1>
      <div className="bar-chart">
        <BarChart width={600} height={400} data={[data]}>
          <Bar dataKey="total_users" fill="#8884d8" />
          <Bar dataKey="total_customers" fill="#82ca9d" />
          <Bar dataKey="total_orders" fill="#ffc658" />
          <Bar dataKey="pending_orders" fill="#ffc658" />
          <Bar dataKey="accepted_orders" fill="#ffc658" />
          <Bar dataKey="finished_orders" fill="#ffc658" />
          <Bar dataKey="most_active_customer" fill="#82ca9d" />
          <Bar dataKey="most_active_customer_order_number" fill="#82ca9d" />
          <Bar dataKey="average_customer_age" fill="#8884d8" />
          <Tooltip />
          <Legend />
        </BarChart>
      </div>
    </div>
  );
};


export default ReportPage;



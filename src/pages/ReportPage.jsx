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
    { country: parsedTopCountries["1st_country"], number: parsedTopCountries["1st_country_number"] },
    { country: parsedTopCountries["2nd_country"], number: parsedTopCountries["2nd_country_number"] },
    { country: parsedTopCountries["3rd_country"], number: parsedTopCountries["3rd_country_number"] },
  ];

  return (
    <div>
      <h1>Order Information</h1>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="number"
          isAnimationActive={false}
          data={countryData}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {countryData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <h1>Other Information</h1>
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
  );
};

export default ReportPage;



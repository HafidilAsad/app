import React, { useEffect } from 'react';
import HeaderLayout from '../../components/header/headerLayout2';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, LineChart, Line} from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLightbulb,
  faTint,
  faCloudRain,
  faTemperatureHalf,
  faDroplet,
  faWater,
  faFlask, // fallback
} from '@fortawesome/free-solid-svg-icons';
import smartFarming from '../../assets/smartFarming.webp';
import { Helmet } from "react-helmet";

const Dashboardv5 = () => {
  const [dataEnergy, setDataEnergy] = React.useState([]);
  const [dataEnergyTotal, setDataEnergyTotal] = React.useState([]);  
  const [dataHistory, setDataHistory] = React.useState([]);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [dataHumidity, setDataHumidity] = React.useState([]);



useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('https://solusiprogrammer.com/api/energy');
            const transformedData = response.data.map((item) => ({
                name: new Date(item.createdAt).toLocaleDateString('en-US', {  day: 'numeric' }),
                Humidity: item.humidity, // Use humidity for the chart
                temperature: item.temperature, // Add temperature for the chart
            }));
            setDataHumidity(transformedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);
  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = dateObj.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  };

  const fetchDataEnergy = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL_ENERGY}/data`);
      setDataEnergy(response.data.data);
      setDataEnergyTotal(response.data);
    } catch (error) {
      console.error('Error fetching energy data:', error);
    }
  };

  const fetchDataHistory = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL_ENERGY}/history`);
      // Format date
      const formatted = response.data.history.map(item => ({
        ...item,
        date: formatDate(item.date)
      }));
      setDataHistory(formatted);
    } catch (error) {
      console.error('Error fetching energy data:', error);
    }
  };

  const filteredHistory = dataHistory.filter(item => {
    if (!startDate && !endDate) return true;
    const itemDate = new Date(item.date + ' 2025'); // tambahkan tahun agar bisa dibandingkan
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (start && itemDate < start) return false;
    if (end && itemDate > end) return false;
    return true;
  });

  useEffect(() => {
    fetchDataEnergy();
    fetchDataHistory();
    const interval = setInterval(fetchDataEnergy, 5000);
    const intervalHistory = setInterval(fetchDataHistory, 60 * 60 * 1000);
    return () => {
      clearInterval(interval);
      clearInterval(intervalHistory);
    };
  }, []);

    const iconMap = {
    "Temperature (°C)": faTemperatureHalf,
    "pH": faDroplet,
    "Humidity (%)": faCloudRain,
    "Light Intensity": faLightbulb,
    "Soil Moisture": faWater,
    "Water Level": faTint,
    };


  const dataFarming = [
    {
        id: 1,
        title: "Temp (°C)",
        value: 32,
    },
    {
        id: 2,
        title:"pH",
        value:6.3,
    },
    {
        id: 3,
        title:"Humidity (%)",
        value: 48,
    },
    {
        id: 4,
        title:"Light Intensity",
        value: 3000,
    },
    {
        id: 5,
        title:"Soil Moisture",
        value: 40,
    },
    {
        id: 6,
        title:"Water Level",
        value: 25,
    },
    ]

    const farmingCard = ({ title, value }) => (
    <div className="col-6 col-md-2 my-2">
        <div
        className="card m-1"
        style={{
            borderRadius: "10px",
            background: "#010101",
            border: "2px solid #68696d",
        }}
        >
        <div className="card-body text-white text-center">
            <div className="row align-items-center">
            <div className="col-3">
                <FontAwesomeIcon
                icon={iconMap[title] || faFlask}
                className="text-warning"
                style={{
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                }}
                />
            </div>
            <div className="col-9">
                <h6
                className="mb-1"
                style={{ fontSize: "clamp(0.8rem, 2.5vw, 1rem)" }}
                >
                {title}
                </h6>
                <p
                className="fw-bold m-0"
                style={{ fontSize: "clamp(1rem, 4vw, 2rem)" }}
                >
                {value}
                </p>
            </div>
            </div>
        </div>
        </div>
    </div>
    );



  return (
    <div style={{ backgroundColor: '#010101' , maxWidth: '100vw', minWidth: '1024px', minHeight: '100vh', overflowX: 'auto' }}>
      <Helmet>
        <title>Smart Farming Dashboard | Solusi Dari Programmer</title>
        <meta name="description" content="Pantau data smart farming seperti suhu, kelembapan, pH, intensitas cahaya, dan lainnya secara real-time dengan dashboard interaktif." />
        <meta name="keywords" content="smart farming, dashboard, suhu, kelembapan, pH, IoT, solusi programmer" />
        <meta property="og:title" content="Smart Farming Dashboard | Solusi Dari Programmer" />
        <meta property="og:description" content="Pantau data smart farming seperti suhu, kelembapan, pH, intensitas cahaya, dan lainnya secara real-time dengan dashboard interaktif." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://demo1.solusiprogrammer.com/v5/dashboard" />
        <meta property="og:url" content="https://demo1.solusiprogrammer.com/v5/dashboard" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Smart Farming Dashboard | Solusi Dari Programmer" />
        <meta name="twitter:description" content="Pantau data smart farming seperti suhu, kelembapan, pH, intensitas cahaya, dan lainnya secara real-time dengan dashboard interaktif." />
        <meta name="twitter:image" content="https://demo1.solusiprogrammer.com/v5/dashboard" />
        <link rel="canonical" href="https://demo1.solusiprogrammer.com/v5/dashboard" />
      </Helmet>
      <HeaderLayout
        judulHeader="SMART FARMING DASHBOARD"
        bgHeader="#1a1e27"
        colorTitle="#ffffff"
      />
      <div className="row my-2">
        {dataFarming.map((farming) => (
            farmingCard(farming)
        ))}
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <img src={smartFarming} alt="Smart Farming" className="" style={{ maxWidth: '70%', height: 'auto' }} />
        </div>
      </div>
       <div className="row my-2">
          <div className="col-6">
            <div className="card" style={{ borderRadius: "10px", background: "#010101", border: "2px solid #68696d" }}>
              <div className="card-body">
                <h5 className="text-white text-center mb-3">Humidity History (%)</h5>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={dataHumidity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Humidity" fill="#5BE12C">
                      <LabelList dataKey="Humidity" position="insideTop" fill="#010101" fontSize={10} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card" style={{ borderRadius: "10px", background: "#010101", border: "2px solid #68696d" }}>
              <div className="card-body">
                <h5 className="text-white text-center mb-3">Temperature History (°C)</h5>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={dataHumidity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="temperature" fill="#5BE12C">
                      <LabelList dataKey="temperature" position="insideTop" fill="#010101" fontSize={10} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
      </div>
    </div>

  );
};

export default Dashboardv5;

import { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderLayout from '../../components/header/header';
import ParkingInfo from '../../components/contentDashboard/ParkingInfo';
import ParkingDataCards from '../../components/contentDashboard/ParkingDataCard';
import { Helmet } from "react-helmet";

const DashboardV3 = () => { // Ubah nama fungsi menjadi DashboardV3
  const [parkingInfoData, setParkingInfoData] = useState([]);
  const [parkingDataCard, setParkingDataCard] = useState([]);
  
  const fetchDataParkingInfo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
      setParkingInfoData(response.data.slots);
      setParkingDataCard(response.data);
    } catch (error) {
      console.error('Error fetching parking info:', error);
    }
  };

  useEffect(() => {
    fetchDataParkingInfo();

    setInterval(() => {
      fetchDataParkingInfo();
    },3 * 1000); // Fetch data every 5 seconds
  }, []);



  

  const parkingData = [
    {
      label: 'Parking Zone',
      value: parkingInfoData.length,
      icon: '🅿️',
      color: '#007bff',
    },
    {
      label: 'Vacant Space',
      value: parkingDataCard.vacant || 0, // Default value if vacantSpace is not available
      icon: '🚗',
      color: '#28a745',
    },
    {
      label: 'Filled Space',
      value: parkingInfoData.length - (parkingDataCard.vacant || 0), 
      icon: '⛔',
      color: '#dc3545',
    },
    {
      label: 'Entry Gate',
      value: 150,
      icon: '➡️',
      color: '#6c757d',
    },
  ];

  return (
  <div
    style={{
      fontFamily: 'monospace',
      backgroundColor: '#f5f5f5',
      maxWidth: '100vw',
      minWidth: '1024px', 
      overflowX: 'auto', 
    }}
  >
       <Helmet>
        <title>Smart Parking Zone | Solusi Dari Programmer</title>
        <meta name="description" content="Pantau status slot parkir, ruang kosong, dan data parkir secara real-time di Smart Parking Zone Dashboard." />
        <meta name="keywords" content="dashboard parkir, smart parking, monitoring parkir, solusi programmer, iot, visualisasi, smart home, smart city, smart grid, energy management system, ems, energy monitoring system, ems, energy efficiency, energy conservation, energy management software, building automation system, building management system, bas, smart building" />" 
        <meta property="og:title" content="Smart Parking Zone | Solusi Dari Programmer" />
        <meta property="og:description" content="Pantau status slot parkir, ruang kosong, dan data parkir secara real-time di Smart Parking Zone Dashboard." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://demo1.solusiprogrammer.com/logo192.png" />
        <meta property="og:url" content="https://demo1.solusiprogrammer.com/v3/dashboard" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Smart Parking Zone | Solusi Dari Programmer" />
        <meta name="twitter:description" content="Pantau status slot parkir, ruang kosong, dan data parkir secara real-time di Smart Parking Zone Dashboard." />
        <meta name="twitter:image" content="https://demo1.solusiprogrammer.com/logo192.png" />
        <link rel="canonical" href="https://demo1.solusiprogrammer.com/v3/dashboard" />
      </Helmet>
    <HeaderLayout judulHeader={'Smart Parking Zone'} />

    <div className="container-fluid p-4">
      <div className="row">
        <ParkingInfo parkingInfoData={parkingInfoData}  parkingDataCard={parkingDataCard} />
        <ParkingDataCards parkingData={parkingData} parkingDataCard={parkingDataCard} />
      </div>
    </div>
  </div>
);
};

export default DashboardV3; // Pastikan ekspor juga menggunakan nama baru
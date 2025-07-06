import { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderLayout from '../../components/header/header';
import ParkingInfo from '../../components/contentDashboard/ParkingInfo';
import ParkingDataCards from '../../components/contentDashboard/ParkingDataCard';

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
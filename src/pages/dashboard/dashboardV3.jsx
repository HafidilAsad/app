import React from 'react';
import HeaderLayout from '../../components/header/header';
import ParkingInfo from '../../components/contentDashboard/ParkingInfo';
import ParkingDataCards from '../../components/contentDashboard/ParkingDataCard';

const dashboardV3 = () => {
  const parkingData = [
    {
      label: 'Parking Zone',
      value: 350,
      icon: '🅿️',
      color: '#007bff',
    },
    {
      label: 'Vacant Space',
      value: 186,
      icon: '🚗',
      color: '#28a745',
    },
    {
      label: 'Filled Space',
      value: 164,
      icon: '⛔',
      color: '#dc3545',
    },
    {
      label: 'Entry Gate',
      value: 650,
      icon: '➡️',
      color: '#6c757d',
    },
  ];

  return (
    <div
      style={{
        fontFamily: 'monospace',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        maxHeight: '100vh',
        maxWidth: '100vw',
      }}
    >
      <HeaderLayout judulHeader={'Smart Parking Zone'} />
      <div className="container-fluid p-4">
        <div className="row">
          <ParkingInfo />
          <ParkingDataCards parkingData={parkingData} />
        </div>
      </div>
    </div>
  );
};

export default dashboardV3;
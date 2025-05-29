import React from 'react';
import HeaderLayout from '../../components/header/headerLayout2';
import ChartTemperature from '../../components/contentDashboard/ChartTemperature';
import ChartKwh2 from '../../components/contentDashboard/ChartKwh2';

const dashboardv4 = () => {
  const meters = [
    { id: 1, title: 'kwh meter 1', valueTemperature: 20 },
    { id: 2, title: 'kwh meter 2', valueTemperature: 32 },
    { id: 3, title: 'kwh meter 3', valueTemperature: 12 },
    { id: 4, title: 'kwh meter 4', valueTemperature: 22 },
    { id: 5, title: 'kwh meter 5', valueTemperature: 27 },
    { id: 6, title: 'kwh meter 6', valueTemperature: 25 },
  ];

  const MeterCard = ({ title, valueTemperature }) => (
    <div className="col-lg-2 col-md-4 col-sm-6 my-2">
      <div
        className="card text-white"
        style={{
          cursor: 'pointer',
          backgroundColor: '#010101',
          border: '2px solid #68696d',
          borderRadius: '10px',
        }}
      >
        <div className="card-title text-center fs-4">{title}</div>
        <div className="card-body p-0">
          <ChartTemperature valueTemperature={valueTemperature} />
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#010101', height: '' }}>
      <HeaderLayout
        judulHeader="ENERGY MONITORING DASHBOARD"
        bgHeader="#1a1e27"
        colorTitle="#ffffff"
      />
      <div className="row my-2">
        {meters.map((meter) => (
          <MeterCard
            key={meter.id}
            title={meter.title}
            valueTemperature={meter.valueTemperature}
          />
        ))}
      </div>
      <div className="row my-2">
        <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="card"    
            style={{
                cursor: 'pointer',
                backgroundColor: '#010101',
                border: '2px solid #68696d',
                borderRadius: '10px',
                }}>
                <div className="card-body">
                   <ChartKwh2 />
                </div>
            </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="card"
               style={{
                cursor: 'pointer',
                backgroundColor: '#010101',
                border: '2px solid #68696d',
                borderRadius: '10px',
                }}>
                <div className="card-body">
                   <ChartKwh2 />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default dashboardv4;
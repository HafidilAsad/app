import React from 'react';

const ParkingDataCards = ({ parkingData }) => {
  return (
    <div className="col-md-4 col-sm-12 mt-2">
      {parkingData.map((item, idx) => (
        <div
          key={idx}
          className="card mb-3 h-25"
          style={{
            borderLeft: `8px solid ${item.color}`,
            borderRadius: '10px',
          }}
        >
          <div className="card-body d-flex align-items-center my-2">
            <div
              style={{
                marginRight: '1.5rem',
              }}
              className="fs-1"
            >
              {item.icon}
            </div>
            <div>
              <h5 className="card-title mb-0">{item.label}</h5>
              <h1 className="fw-bold">{item.value}</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParkingDataCards;
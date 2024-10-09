import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

const doors = ['DOOR 1', 'DOOR 2'];
const lamps = [
  { name: 'LAMP 1', color: "#bcbcbc" },
  { name: 'LAMP 2', color: "#6ff542" }
];
const switches = [
  { name: 'SWITCH 1', status: 'OFF', btnClass: 'btn-light' },
  { name: 'SWITCH 2', status: 'ON', btnClass: 'btn-success' }
];
const metrics = [
  { name: 'TEMPERATURE 1', value: '27°C' },
  { name: 'HUMIDITY 1', value: '273' },
  { name: 'TEMPERATURE 2', value: '29°C' },
  { name: 'HUMIDITY 2', value: '271' }
];

const kwh = [
  { name: 'kWh', value: '273' },
  { name: 'Voltage', value: '220 V' },
  { name: 'Current', value: '10 A' },
  { name: 'Power factor', value: '0.91' }

]

const Card = ({ header, body, bodyContent }) => (
  <div className="card shadow" style={{cursor: "pointer"}}>
    <div className="card-header text-center fw-bold fs-4 rounded-3" style={{ borderBottom: "5px solid #bcbcbc" }}>
      {header}
    </div>
    <div className="card-body text-center">
      {bodyContent ? bodyContent : <div>{body}</div>}
    </div>
  </div>
);

const ContentDashboard = () => {
  return (
    <div className='container-fluid'>
        <h1 className='ms-4 my-3'>Control and Monitoring System</h1>
      <div className="row my-2 mx-2">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="row">
              {doors.map((door, index) => (
                <div className="col-lg-6 col-md-6 col-sm-12 mt-3" key={index}>
                  <Card header={door} body="EMERGENCY STATUS" bodyContent={<div className="fs-1 my-3 text-danger fw-bold">EMERGENCY STATUS</div>} />
                </div>
              ))}
            </div>
            <div className="row mt-4">
              {lamps.map((lamp, index) => (
                <div className="col-lg-6 col-md-12 col-sm-12" key={index}>
                  <Card 
                    header={lamp.name} 
                    bodyContent={
                      <>
                        <FontAwesomeIcon icon={faLightbulb} size='3x' style={{ color: lamp.color }} />
                        <br />
                        LAMP STATUS
                      </>
                    } 
                  />
                </div>
              ))}
            </div>
            <div className="row mt-4">
              {switches.map((sw, index) => (
                <div className="col-lg-6 col-md-12 col-sm-12" key={index}>
                  <Card 
                    header={sw.name} 
                    bodyContent={
                      <div className={`btn ${sw.btnClass} w-100 fw-bold my-3`} style={{ border: "1px solid #bcbcbc", borderBottom: "5px solid #bcbcbc" }}>
                        {sw.status}
                      </div>
                    } 
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="row">
              <div className="col mt-3">
                <Card header="CCTV"  bodyContent={<div className="fs-1 my-3 fw-bold" style={{minHeight:"11em"}}>DISPLAY CCTV</div>} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-2 mx-2">
        <div className="row">
            {metrics.map((metric, index) => (
                <div className="col-lg-3 col-md-6 col-sm-12 mt-3" key={index}>
                    <Card header={metric.name} body={metric.value} bodyContent={<div className="fw-bold fs-1">{metric.value}</div>} />
                </div>
            ))}
        </div>
       
      </div>
      <div className="row my-2 mx-2">
        <div className="row">
            {kwh.map((kwh, index) => (
                <div className="col-lg-3 col-md-6 col-sm-12 mt-3" key={index}>
                    <Card header={kwh.name} body={kwh.value} bodyContent={<div className="fw-bold fs-1">{kwh.value}</div>} />
                </div>
            ))}
        </div>
       
      </div>
    </div>
  );
};

export default ContentDashboard;

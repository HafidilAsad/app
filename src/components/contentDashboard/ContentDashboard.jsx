import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import ThreeDotsWave from '../threeDotsWaves';
import ChartTemperature from './ChartTemperature';


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
  { name: 'TEMPERATURE 1', value: '29.0' },
  { name: 'TEMPERATURE 2', value: '27.3' },
  { name: 'TEMPERATURE 3', value: '25.5' },
  { name: 'TEMPERATURE 4', value: '17.1' }
];

const kwh = [
  { name: 'kWh', value: '273' },
  { name: 'Voltage', value: '220 V' },
  { name: 'Current', value: '10 A' },
  { name: 'Power factor', value: '0.91' }

]

const Card = ({ header, bodyContent }) => (
  <motion.div
    className="card shadow-sm border-0 rounded-5"
    style={{ cursor: "pointer" }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    
    <div className="card-body text-center " >
      <div className="fs-5 fw-bold mb-3 text-muted">{header}</div>
      {bodyContent}
    </div>
  </motion.div>
);

const ContentDashboard = () => {
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='container-fluid'>
       {loading ? (
        <ThreeDotsWave />
      ) : (
        <>
              <div className="row my-2 mx-2">
                <div className="row">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="row">
                      {doors.map((door, index) => (
                        <div className="col-lg-6 col-md-6 col-sm-12 mt-3" key={index}>
                          <Card header={door} body="EMERGENCY STATUS" bodyContent={<div className="fs-5 my-1 text-danger fw-bold">
                            <FontAwesomeIcon icon={faDoorClosed} size='2x' />
                          <br /> EMERGENCY</div>} />
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
                      <div className="col mt-3">
                        <Card header="CCTV"  bodyContent={<div className="fs-1 my-3 fw-bold" style={{minHeight:"10.6em"}}>DISPLAY CCTV</div>} />
                      </div>
                  </div>
                </div>
              </div>
              <div className="row my-2 mx-2">
                <div className="row">
                    {metrics.map((metric, index) => (
                        <div className="col-lg-3 col-md-6 col-sm-12 mt-3" key={index}>
                            <Card header={metric.name} body={metric.value} bodyContent={<div className="fw-bold fs-1">
                              <ChartTemperature valueTemperature={metric.value}/>
                            </div>} />
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

        </>
      )}
   
    </div>
  );
};

export default ContentDashboard;

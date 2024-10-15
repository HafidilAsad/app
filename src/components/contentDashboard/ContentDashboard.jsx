import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import ThreeDotsWave from '../threeDotsWaves';
import ChartTemperature from './ChartTemperature';
import VideoPlayer from './VideoPlayer';

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

const text = "Control and Monitoring System".split(" ");

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
  const [loading, setLoading] = useState(true);
  const streamUrl = 'rtsp://192.168.1.22:5543/051c6519288cc2d8b07f026902be8c96/live/channel00';

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const [iframeSrc, setIframeSrc] = useState("https://motioneye.vete.my.id/picture/1/current/?_=1729003792197");

  useEffect(() => {
      const interval = setInterval(() => {
          // Update the iframe source to reload it
          setIframeSrc(`https://motioneye.vete.my.id/picture/1/current/?_=${Date.now()}`);
      }, 1000);       
  }, []);
  return (
    <div className='container-fluid'>
       {loading ? (
        <ThreeDotsWave />
      ) : (
        <>
              <div className="row my-2 mx-2 me-5">
                <div className="card   rounded-3 border-0 shadow-sm mx-2">
                  <h2 className='ms-4 my-1 p-2 text-muted'>
                  {text.map((el, i) => (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 2.55,
                        delay: i / 10
                      }}
                      key={i}
                    >
                      {el}{" "}
                    </motion.span>
                ))}
                  </h2>
                </div>
              </div>
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
                    <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%', height: '200%' }}>
                        <iframe 
                          src={iframeSrc}
                          title="CCTV" 
                          width="100%" 
                          height="100%" 
                          frameBorder="0" 
                          style={{ pointerEvents: 'none' }} // Prevents user interactions with iframe
                        ></iframe>
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

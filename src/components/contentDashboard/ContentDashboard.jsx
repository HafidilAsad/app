import React, { useState, useEffect, } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faDoorClosed, faDoorOpen, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import ThreeDotsWave from '../threeDotsWaves';
import CardSensor from './CardSensor';
import ChartKwh from './ChartKwh';
import M221 from "../../assets/M221.jpg";
import S7 from "../../assets/S7.jpg";
import CP2E from "../../assets/CP2E.jpg";
import M241CE40R from "../../assets/M241CE40R.jpg";
import axios from 'axios';
import { motion } from "framer-motion";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const ContentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dataStatus, setDataStatus] = useState({});


  const fetchDataStatus = async () => {
    try {
      const response = await axios.get('https://solusiprogrammer.my.id/api/getallstatus')
      setDataStatus(response.data);
      
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleButtonChange = async (button, event) => {
    const checked = event.target.checked;
    const newState = checked ? 1 : 0;
    
    // Update local state
    setDataStatus((prevState) => ({
      ...prevState,
      [button]: newState,
    }));

    try {
      await axios.post(`https://solusiprogrammer.my.id/api/control/${button}/${newState}`);
      NotificationManager.success(`Lamp ${button} changed `, 'Success');
    } catch (error) {
      console.error(error);
      NotificationManager.error('Failed to change status', 'Error');
    }
  };
  
  const handleButtonDoorChange = async (button, event) => {
    const checked = event.target.checked;
    const newState = checked ? 1 : 0;
    
    // Update local state
    setDataStatus((prevState) => ({
      ...prevState,
      [button]: newState,
    }));

    try {
      await axios.post(`https://solusiprogrammer.my.id/api/control/${button}/${newState}`);
      NotificationManager.success('Door changed', 'Success');
    } catch (error) {
      console.error(error);
      NotificationManager.error('Failed to change Door status', 'Error');
    }
  };


  useEffect(() => {
    fetchDataStatus();
    setInterval(() => {
      fetchDataStatus();
    }, 3000);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const imgOptions = [
    { imgSrc: M221, title: "M221" },
    { imgSrc: M241CE40R, title: "M241CE40R" },
    { imgSrc: CP2E, title: "CP2E" },
    { imgSrc: S7, title: "S7 1200 1212" },
];

let dataEnergy = dataStatus.voltage * dataStatus.arus
const getLampColor = (button) => {
  switch (button) {
    case 'button_1':
      return dataStatus[button] === 1 ? '#32a852' : '#808080'; 
    case 'button_2':
      return dataStatus[button] === 1 ? '#FFA500' : '#808080'; 
    case 'button_3':
      return dataStatus[button] === 1 ? '#d3d329' : '#808080';
    case 'button_4':
      return dataStatus[button] === 1 ? '#0000FF' : '#808080'; 
    default:
      return '#808080'; 
  }
};

const getLampStyle = (button) => {
  if (dataStatus[button] === 1) {
    const lampColor = getLampColor(button);
    return {
      color: lampColor,
      filter: `drop-shadow(0 0 15px ${lampColor}) drop-shadow(0 0 30px ${lampColor})`,
    };
  } else {
    return { color: getLampColor(button) }; // No shadow when off
  }
};


  return (
    <div className='container-fluid'>
       {loading ? (
        <ThreeDotsWave />
      ) : (
        <>
          <div className="row m-2 mt-2">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <div className="row">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mt-2">
                  <div className="card shadow rounded-5 border-3 border-info">
                    <div className="card-body ">
                    <div className="row mx-5 p-4">
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 text-center">
                          <FontAwesomeIcon icon={faLightbulb} className="mb-3" size="6x"         style={getLampStyle('button_1')}/>
                          <div className="form-check fs-3 form-switch my-3 d-flex justify-content-center align-items-center">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              checked={dataStatus.button_1 === 1} 
                              onChange={(event) => handleButtonChange('button_1', event)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 text-center">
                          <FontAwesomeIcon icon={faLightbulb} className="mb-3" size="6x"  style={getLampStyle('button_2')}  />
                          <div className="form-check fs-3 form-switch my-3 d-flex justify-content-center align-items-center">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              checked={dataStatus.button_2 === 1} 
                              onChange={(event) => handleButtonChange('button_2', event)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 text-center">
                          <FontAwesomeIcon icon={faLightbulb} className="mb-3" size="6x"    style={getLampStyle('button_3')} />
                          <div className="form-check fs-3 form-switch my-3 d-flex justify-content-center align-items-center">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              checked={dataStatus.button_3 === 1} 
                              onChange={(event) => handleButtonChange('button_3', event)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 text-center">
                          <FontAwesomeIcon icon={faLightbulb} className="mb-3" size="6x"  style={getLampStyle('button_4')}/>
                          <div className="form-check fs-3 form-switch my-3 d-flex justify-content-center align-items-center">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              checked={dataStatus.button_4 === 1} 
                              onChange={(event) => handleButtonChange('button_4', event)}
                            />
                          </div>
                        </div>
                    </div>
                      <div className="card mx-5 text-center my-2 shadow rounded-5">
                        <h3 className='p-4 '>
                            POWER CONSUMPTION : <span className='fw-bold'>{(dataEnergy).toFixed(1)} watt</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 mt-2">
                  <div className="card shadow rounded-5  border-3 border-info">
                    <div className="card-body">
                      <div className="card-title">
                        Power Consumtion <span className='text-muted'>kWh</span>
                      </div>
                      <ChartKwh />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-2">
                  <CardSensor 
                    titleSensor="kWh" 
                    valueSensor={dataStatus.kwh !== undefined ? dataStatus.kwh.toFixed(1) : "N/A"} 
                    satuanSensor="Wh" 
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-2">
                  <CardSensor 
                    titleSensor="Humidity"  
                    valueSensor={dataStatus.kelembaban !== undefined ? dataStatus.kelembaban.toFixed(1) : "N/A"} 
                    satuanSensor="%" 
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-2">
                  <CardSensor 
                    titleSensor="Temperature" 
                    valueSensor={dataStatus.suhu !== undefined ? dataStatus.suhu.toFixed(1) : "N/A"} 
                    satuanSensor="°C"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-8 col-sm-12 col-xs-12 mt-2">
              <div className="card shadow h-100 rounded-5  border-3 border-info">
                <div className="card-body text-center">
         
                {/* <JsmpegPlayer url={websocketUrl} /> */}
                {/* <VideoStream /> */}
                <h1 className='mb-5 fw-semibold text-muted'>Display CCTV</h1>
               <iframe 
                  src={"https://cctv.solusiprogrammer.my.id/picture/1/frame/"}
                  width="100%"
                  height="70%"
                  frameBorder="0"
                  allowFullScreen
               
                
                />
                </div>
              </div>
            </div>
          </div>
          <div className="row m-2 mt-2">
            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 mt-2">
              <div className='card shadow rounded-5 text-center  border-3 border-info'>
                <div className='card-body px-5 py-3 text-center'>
                  <p className='fs-4'>Status Door 1</p>
                  <FontAwesomeIcon
                    icon={dataStatus.button_door_1 === 1 ? faDoorOpen : faDoorClosed}
                    className='me-5'
                    size='6x'
                  />
                  <div className='text-end'>
                    <div className="form-check form-switch ms-3 my-3 text-end ">
                      <input 
                        className="form-check-input fs-4 ps-3" 
                        type="checkbox" 
                        checked={dataStatus.button_door_1 === 1} 
                        onChange={(event) => handleButtonDoorChange('button_door_1', event)} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 mt-2">
              <div className='card shadow rounded-5 text-center  border-3 border-info'>
                <div className='card-body px-5 py-3 text-center'>
                  <p className='fs-4'>TL LAMP</p>
                  <FontAwesomeIcon
                    icon={faBarsStaggered}
                    className='me-5'
                    size='6x'
                    style={{
                      color: dataStatus.button_door_2 === 1 ? 'yellow' : 'black',
                      filter: dataStatus.button_door_2 === 1
                        ? 'drop-shadow(0 0 15px gold) drop-shadow(0 0 30px gold)'
                        : 'none',
                    }}
                  />
                  <div className='text-end'>
                    <div className="form-check form-switch ms-3 my-3 text-end ">
                      <input 
                        className="form-check-input fs-4 ps-3" 
                        type="checkbox" 
                        checked={dataStatus.button_door_2 === 1} 
                        onChange={(event) => handleButtonDoorChange('button_door_2', event)} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mt-2">
              <div className="card shadow rounded-5 border-3 border-info">
                  <div className="card-body">
                      <h5>PLC Option :</h5>
                      <div className="row mx-3">
                      {imgOptions.map((option, index) => (
                        <div className="col mt-1" key={index}>
                            <div className="card border-0 d-flex justify-content-center align-items-center">
                                <motion.img
                                    src={option.imgSrc}
                                    width={"40%"}
                                    style={{ aspectRatio: "3/3", objectFit: "contain" }}
                                    alt={option.title}
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.1 }}  // Scale up on hover
                                    transition={{ type: "spring", stiffness: 300 }} // Add spring animation
                                />
                                <div className="card-body m-0 ">
                                    <h5 className="card-title text-center">{option.title}</h5>
                                </div>
                            </div>
                        </div>
                      ))}
                      </div>
                  </div>
              </div>
            </div>
          </div>
          <NotificationContainer/>
        </>
      )}
   
    </div>
  );
};

export default ContentDashboard;

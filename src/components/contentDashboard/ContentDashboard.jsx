import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import ThreeDotsWave from '../threeDotsWaves';
import CardSensor from './CardSensor';
import CardDoor from './CardDoor';
import ChartKwh from './ChartKwh';
import M221 from "../../assets/M221.jpg";
import S7 from "../../assets/S7.jpg";
import CP2E from "../../assets/CP2E.jpg";
import M241CE40R from "../../assets/M241CE40R.jpg";
import axios from 'axios';
import { data } from 'framer-motion/client';



const ContentDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [dataStatus, setDataStatus] = useState({});


  const fetchDataStatus = async () => {
    try {
      const response = await axios.get('https://solusiprogrammer.my.id/api/getallstatus')
      setDataStatus(response.data);
      
    } catch (error) {
      console.error(error);
    }
  }

  console.log(dataStatus);
  
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
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchDataStatus();
    setInterval(() => {
      fetchDataStatus();
    }, 5000);
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
  return (
    <div className='container-fluid'>
       {loading ? (
        <ThreeDotsWave />
      ) : (
        <>
          <div className="row m-2 mt-2">
            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mt-2">
                  <div className="card shadow rounded-5">
                    <div className="card-body ">
                    <div className="row mx-5 p-4">
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 text-center">
                          <FontAwesomeIcon icon={faLightbulb} className="mb-3" size="6x" />
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
                          <FontAwesomeIcon icon={faLightbulb} className="mb-3" size="6x" />
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
                          <FontAwesomeIcon icon={faLightbulb} className="mb-3" size="6x" />
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
                          <FontAwesomeIcon icon={faLightbulb} className="mb-3" size="6x" />
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
                      <div className="card mx-5 text-center my-4 shadow rounded-5">
                        <h3 className='p-4 '>
                            ENERGY CONSUMPTION : <span className='fw-bold'>{(dataEnergy).toFixed(1)} kWh</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-2">
                  <div className="card shadow rounded-5">
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
                    titleSensor="Current Consumption" 
                    valueSensor={dataStatus.kwh !== undefined ? dataStatus.kwh.toFixed(1) : "N/A"} 
                    satuanSensor="kWh" 
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
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-2">
              <div className="card shadow h-100 rounded-5">
                <div className="card-body text-center">
                  <h5 className="fs-1 fw-bold">
                    INI CCTV
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="row m-2 mt-2">
            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 mt-2">
              <div className='card shadow rounded-5 text-center'>
                <div className='card-body px-5 py-5 text-center'>
                  <p className='fs-4'>
                      Status Door 1
                  </p>
                  <FontAwesomeIcon
                    icon={faDoorClosed}
                    className='me-5'
                    size='6x'
                  />
                  <div className='text-end'>
                      <div className="form-check form-switch ms-3 my-3 text-end ">
                          <input className="form-check-input fs-4 ps-3 " 
                          type="checkbox" 
                          checked={dataStatus.button_door_1 === 1} 
                          onChange={(event) => handleButtonDoorChange('button_door_1', event)} />
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 mt-2">
              <div className='card shadow rounded-5 text-center'>
                  <div className='card-body px-5 py-5 text-center'>
                    <p className='fs-4'>
                        Status Door 2
                    </p>
                    <FontAwesomeIcon
                      icon={faDoorClosed}
                      className='me-5'
                      size='6x'
                    />
                    <div className='text-end'>
                        <div className="form-check form-switch ms-3 my-3 text-end ">
                            <input className="form-check-input fs-4 ps-3 " 
                            type="checkbox" 
                            checked={dataStatus.button_door_2 === 1} 
                            onChange={(event) => handleButtonDoorChange('button_door_2', event)} />
                        </div>
                    </div>
                  </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mt-2">
              <div className="card shadow rounded-5">
                  <div className="card-body">
                      <h5>PLC Option :</h5>
                      <div className="row mx-3">
                          {imgOptions.map((option, index) => (
                              <div className="col mt-2" key={index}>
                                  <div className="card border-0 d-flex justify-content-center align-items-center">
                                      <img 
                                          src={option.imgSrc} 
                                          width={"50%"} 
                                          style={{ aspectRatio: "3/3", objectFit: "contain" }} 
                                          alt={option.title} 
                                      />
                                      <div className="card-body">
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
        </>
      )}
   
    </div>
  );
};

export default ContentDashboard;

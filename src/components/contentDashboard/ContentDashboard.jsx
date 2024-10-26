import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import ThreeDotsWave from '../threeDotsWaves';
import CardSensor from './CardSensor';
import CardDoor from './CardDoor';
import ChartKwh from './ChartKwh';
import M221 from "../../assets/M221.jpg";
import S7 from "../../assets/S7.jpg";
import CP2E from "../../assets/CP2E.jpg";
import M241CE40R from "../../assets/M241CE40R.jpg";
import axios from 'axios';


const ContentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dataStatus, setDataStatus] = useState({});
  const [button1Checked, setButton1Checked] = useState(false);
  const [button2Checked, setButton2Checked] = useState(false);

  const fetchDataStatus = async () => {
    try {
      const response = await axios.get('https://solusiprogrammer.my.id/api/getallstatus')
      setDataStatus(response.data);
      
    } catch (error) {
      console.error(error);
    }
  }

  const handleButton1Change = async (event) => {
    const checked = event.target.checked;
    setButton1Checked(checked);
    try {
      await axios.post(`https://solusiprogrammer.my.id/api/control/button_1/${checked ? 0 : 1}`);
      fetchDataStatus();
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleButton2Change = async (event) => {
    const checked = event.target.checked;
    setButton2Checked(checked);
    try {
     await axios.post(`https://solusiprogrammer.my.id/api/control/button_2/${checked ? 0 : 1}`);
     fetchDataStatus();
    } catch (error) {
      console.error(error);
    }
  };

  console.log(dataStatus);
  

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

 
  const lamp1Color = dataStatus.lamp_1 === 1 ? 'green' : 'gray';
  const lamp2Color = dataStatus.lamp_2 === 1 ? 'green' : 'gray';
  const imgOptions = [
    { imgSrc: M221, title: "M221" },
    { imgSrc: M241CE40R, title: "M241CE40R" },
    { imgSrc: CP2E, title: "CP2E" },
    { imgSrc: S7, title: "S7 1200 1212" },
];
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
                          <FontAwesomeIcon
                              icon={faLightbulb}
                              className="mb-3"
                              size="6x"
                              style={{ color: dataStatus.lamp_1 !== undefined ? lamp1Color : 'gray' }} 
                          />
                          <div className="form-check fs-3 form-switch my-3 d-flex justify-content-center align-items-center">
                              <input 
                                  className="form-check-input" 
                                  type="checkbox" 
                                  checked={button1Checked}
                                  onChange={handleButton1Change}
                                  
                              />
                          </div>
                         </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 text-center">
                            <FontAwesomeIcon
                                icon={faLightbulb}
                                className="mb-3"
                                size="6x"
                                style={{ color: dataStatus.lamp_2 !== undefined ? lamp2Color : 'gray' }} 
                            />
                            <div className="form-check fs-3 form-switch my-3 d-flex justify-content-center align-items-center">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    checked={button2Checked}
                                    onChange={handleButton2Change}      
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 text-center">
                            <FontAwesomeIcon
                                icon={faLightbulb}
                                className="mb-3"
                                size="6x"
                                style={{ color :'gray' }} 
                            />
                            <div className="form-check fs-3 form-switch my-3 d-flex justify-content-center align-items-center">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                  
                                  
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 text-center">
                            <FontAwesomeIcon
                                icon={faLightbulb}
                                className="mb-3"
                                size="6x"
                                style={{ color: 'gray' }} 
                            />
                            <div className="form-check fs-3 form-switch my-3 d-flex justify-content-center align-items-center">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                   
                                  
                                />
                            </div>
                        </div>
                      </div>
                      <div className="card mx-5 text-center my-4 shadow rounded-5">
                        <h3 className='p-4 '>
                            ENERGY CONSUMPTION : 100W
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
                  <CardSensor titleSensor="Current Consumption" valueSensor={dataStatus.kwh} satuanSensor="kWh" />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-2">
                  <CardSensor titleSensor="Humidity"  valueSensor={dataStatus.kelembaban} satuanSensor="%" />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-2">
                  <CardSensor titleSensor={"Temperature"} valueSensor={dataStatus.suhu} satuanSensor={"°C"}/>
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
              <CardDoor titleDoor={"Status Door 1"} />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 mt-2">
              <CardDoor titleDoor={"Status Door 2"}/>
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

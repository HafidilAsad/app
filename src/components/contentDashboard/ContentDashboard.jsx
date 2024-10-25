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


const ContentDashboard = () => {
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const items = Array(4).fill({ icon: faLightbulb });

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
                      {items.map((item, index) => (
                          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 text-center " key={index}>
                              <FontAwesomeIcon
                                  icon={item.icon}
                                  className="mb-3"
                                  size="6x"
                              />
                              <div className="form-check fs-3 form-switch ms-3 my-3">
                                  <input 
                                      className="form-check-input" 
                                      type="checkbox" 
                                      id={`flexSwitchCheckChecked${index}`} 
                                      checked 
                                  />
                              </div>
                          </div>
                      ))}
                  </div>
                      <div className="card mx-5 text-center my-4 shadow-sm">
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
                  <CardSensor titleSensor="Current Consumption" valueSensor="1.5" satuanSensor="kWh" />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-2">
                  <CardSensor titleSensor="Humidity"  valueSensor="48.2" satuanSensor="%" />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-2">
                  <CardSensor titleSensor={"Temperature"} valueSensor="25.5" satuanSensor={"°C"}/>
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
                      <h5>Option :</h5>
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

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import ThreeDotsWave from '../threeDotsWaves';


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
          <div className="row m-2 mt-4">
            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                  <div className="card shadow rounded-5">
                    <div className="card-body ">
                      <ul className='list-unstyled mx-5 d-flex justify-content-between p-4'>
                        <li>
                          <FontAwesomeIcon
                            icon={faLightbulb}
                            className="me-5"
                            size="6x"
                          />
                          <br />
                          <div className="form-check form-switch ms-3 my-3">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked />
                          </div>
                        </li>
                        <li>
                          <FontAwesomeIcon
                            icon={faLightbulb}
                            className="me-5"
                            size="6x"
                          />
                            <br />
                          <div className="form-check form-switch ms-3 my-3">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked />
                          </div>
                        </li>
                        <li>
                          <FontAwesomeIcon
                            icon={faLightbulb}
                            className="me-5"
                            size="6x"
                          />
                            <br />
                          <div className="form-check form-switch ms-3 my-3">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked />
                          </div>
                        </li>
                        <li>
                          <FontAwesomeIcon
                            icon={faLightbulb}
                            className="me-5"
                            size="6x"
                          />
                            <br />
                          <div className="form-check form-switch ms-3 my-3">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked />
                          </div>
                        </li>
                       
                      </ul>
                      <div className="card mx-5 text-center">
                        <h3 className='p-4'>
                            ENERGY CONSUMPTION : 100W
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  ini chart
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              ini cctv
            </div>
          </div>
        </>
      )}
   
    </div>
  );
};

export default ContentDashboard;

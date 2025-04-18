import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChargingStation, faGlassWaterDroplet, faTemperatureHalf ,faClock, faDroplet, faBoltLightning} from '@fortawesome/free-solid-svg-icons';
import './CardSensor.css';

const CardSenensor2 = ({ titleSensor, valueSensor, satuanSensor }) => {
    const getIcon = (title) => {
        switch (title) {
            case 'kWh':
                return faChargingStation;
            case 'Humidity':
                return faGlassWaterDroplet;
            case 'Temperature':
                return faTemperatureHalf;
            case 'Water Usage':
                return faDroplet;
            case 'voltage':
                return faBoltLightning; 

            default:
                return faChargingStation; // Default icon if none match
        }
    };

    return (
        <motion.div 
            className="card mb-3"
            initial={{ scale: 1, }}
            whileHover={{ 
                scale: 1.05, 
                borderBottom: '10px solid red' // Add red bottom border on hover
            }}  
            transition={{ type: "spring", stiffness: 300 }} // Spring animation
            style={{ backgroundColor: '#010101', border: '2px solid #68696d', borderRadius: '10px'}}// Ensure no border is shown initially
             // Ensure no border is shown initially
        >
            <div className="card-body px-5 py-3">
                <div className="card-title fs-4 mt-1">
                    <div className="row ">
                        <div className="col-lg-8 col-md-8 col-sm-3 text-truncate text-white">
                            {titleSensor}
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-3 text-end d-none d-sm-block text-white">
                            <FontAwesomeIcon
                                icon={faClock}
                                className='pt-2  px-2 pt-sm-0 text-white'

                            />
                        </div>
                    </div>          
                </div>
                <div className="row">
                    <div className="col-4">
                        <FontAwesomeIcon
                            icon={getIcon(titleSensor)}
                            className='pt-2 text-white' 
                            size='3x'
                        />
                    </div>
                    <div className="col-8">
                        <div className="fw-bold fs-1 fs-sm-3 text-truncate text-white" style={{ fontSize: "3em" }}>
                            {valueSensor} <span className='fs-3 fs-sm-6'>{satuanSensor}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default CardSenensor2;
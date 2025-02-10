import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChargingStation, faGlassWaterDroplet, faTemperatureHalf ,faClock} from '@fortawesome/free-solid-svg-icons';
import './CardSensor.css';

const CardSensor = ({ titleSensor, valueSensor, satuanSensor }) => {
    const getIcon = (title) => {
        switch (title) {
            case 'kWh':
                return faChargingStation;
            case 'Humidity':
                return faGlassWaterDroplet;
            case 'Temperature':
                return faTemperatureHalf;
            default:
                return faChargingStation; // Default icon if none match
        }
    };

    return (
        <motion.div 
            className="card shadow rounded-5  border-3 border-info"
            initial={{ scale: 1, borderBottom: 'none' }}
            whileHover={{ 
                scale: 1.05, 
                borderBottom: '10px solid red' // Add red bottom border on hover
            }}  
            transition={{ type: "spring", stiffness: 300 }} // Spring animation
            style={{ borderBottom: 'none' }} // Ensure no border is shown initially
        >
            <div className="card-body px-5 py-3">
                <div className="card-title fs-4 mt-1">
                    <div className="row bg-light rounded-3">
                        <div className="col-lg-8 col-md-8 col-sm-3 text-truncate">
                            {titleSensor}
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-3 text-end d-none d-sm-block">
                            <FontAwesomeIcon
                                icon={faClock}
                                className='pt-2  px-2 pt-sm-0'

                            />
                        </div>
                    </div>          
                </div>
                <div className="row">
                    <div className="col-4">
                        <FontAwesomeIcon
                            icon={getIcon(titleSensor)}
                            className='pt-2 '
                            size='3x'
                        />
                    </div>
                    <div className="col-8">
                        <div className="fw-bold fs-1 fs-sm-3 text-truncate" style={{ fontSize: "3em" }}>
                            {valueSensor} <span className='fs-3 fs-sm-6'>{satuanSensor}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default CardSensor;
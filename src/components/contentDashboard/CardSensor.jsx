import React from 'react';
import { motion } from 'framer-motion';

const CardSensor = ({ titleSensor, valueSensor, satuanSensor }) => {
    return (
        <motion.div 
            className="card shadow rounded-5"
            initial={{ scale: 1, borderBottom: 'none' }}
            whileHover={{ 
                scale: 1.05, 
                borderBottom: '10px solid red' // Add red bottom border on hover
            }}  
            transition={{ type: "spring", stiffness: 300 }} // Spring animation
            style={{ borderBottom: 'none' }} // Ensure no border is shown initially
        >
            <div className="card-body px-5 py-3">
                <div className="card-title fs-4 mt-5">
                    {titleSensor}
                </div>
                <div className="fw-bold" style={{ fontSize: "3em" }}>
                    {valueSensor} <span className='fs-3'>{satuanSensor}</span>
                </div>
            </div>
        </motion.div>
    );
}

export default CardSensor;

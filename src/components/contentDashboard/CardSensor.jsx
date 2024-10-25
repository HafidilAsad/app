import React from 'react'

const CardSensor = ({titleSensor, valueSensor, satuanSensor}) => {
  return (
    <div className="card shadow rounded-5">
        <div className="card-body px-5 py-3">
            <div className="card-title fs-4 mt-5">
                {titleSensor}
            </div>
            <div className="fw-bold" style={{fontSize: "3em"}}>
                {valueSensor} <span className='fs-3'>{satuanSensor}</span>
            </div>
        </div>
    </div>
  )
}

export default CardSensor
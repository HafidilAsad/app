import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faDoorClosed } from '@fortawesome/free-solid-svg-icons';

const CardDoor = ({titleDoor}) => {
  return (
    <div className='card shadow rounded-5 text-center'>
      <div className='card-body px-5 py-5 text-center'>
        <p className='fs-4'>
            {titleDoor}
        </p>
        <FontAwesomeIcon
          icon={faDoorClosed}
          className='me-5'
          size='6x'
        />
        <div className='text-end'>
            <div className="form-check form-switch ms-3 my-3 text-end ">
                <input className="form-check-input fs-4 ps-3 " type="checkbox" id="flexSwitchCheckChecked" checked />
            </div>
        </div>
      </div>
    </div>
  )
}

export default CardDoor
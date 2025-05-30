import React, { useState, useEffect } from 'react'
import Clock from "../clock";
import CurrentDate from "../currentDate";
import logo from "../../assets/logo.png";
import "./index.css";
import { Link } from 'react-router-dom';

const HeaderLayout = ({ judulHeader, bgHeader, colorTitle }) => {
      const [currentDate, setCurrentDate] = useState(getFormattedDate());
    
      useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentDate(getFormattedDate());
        }, 60 * 60 * 1000);
    
        return () => {
          clearInterval(intervalId);
        };
      }, []);
    
      function getFormattedDate() {
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return new Date().toLocaleDateString("id-ID", options);
      }

  return (
    <div
        className="mt-0 shadow "
        style={{
        borderBottom: "2px solid #bcbcbc",

        background: bgHeader,
        }}
    >
        <div className=" d-flex justify-content-between align-items-center mb-1">
            <Link className="align-left  " to="https://solusiprogrammer.com/">
                <img
                src={logo}
                alt=""
                width={120}
                className=""
                />
              
            </Link>
            <div className="align-center">
                <div className="  font-header-line  fw-bold ">
                <div
                    className=" my-1  px-5 border-0   "
                    style={{
                 
                    color: colorTitle,
                    }}
                >
                    {judulHeader}
                </div>
                </div>
            </div>
           <div
                className="align-right rounded-3 d-flex flex-column justify-content-center shadow-sm mx-3 text-center"
                style={{
                    height: 70,
                }}
                >
                <span className="fs-5">
                    <Clock />
                </span>
                <span style={{ fontSize: '0.45rem',  color: 'black !important' }}>
                    {currentDate}
                </span>
            </div>
        </div>
    </div>
     )
}

export default HeaderLayout
import React from 'react'
import Clock from "../clock";
import CurrentDate from "../currentDate";
import logo from "../../assets/Logo-SDP.png";
import "./index.css";
import { Link } from 'react-router-dom';

const HeaderLayout = ({ judulHeader, bgHeader, colorTitle }) => {
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
                alt="bms, building management system, bas, building automation system, smart building, smart home, smart city, smart grid, energy management system, ems, energy monitoring system, ems, energy efficiency, energy conservation, energy management software"
                width={150}
                height={50}
                className="ps-4 pt-2"
                />
              
            </Link>
            <div className="align-center">
                <div className="  font-header-line  fw-bold ">
                <div
                    className=" mt-2  px-5 border-0   "
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
                <span className="fs-5 text-white">
                    <Clock />
                </span>
                <span style={{ fontSize: '0.45rem' }}>
                    <CurrentDate />
                </span>
                </div>
        </div>
    </div>
     )
}

export default HeaderLayout
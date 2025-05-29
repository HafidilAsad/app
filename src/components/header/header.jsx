import React from 'react'
import Clock from "../clock";
import CurrentDate from "../currentDate";
import logo from "../../assets/logo.png";
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
                className="align-right  rounded-3 d-flex shadow-sm mx-3  "
                style={{
                height: 70,
                // width: "20%",
                }}
            >
                <span className="px-3 mt-3 text-dark fs-4"><CurrentDate /></span>
                <span className="px-3 mt-3 ">
                    <Clock />
                </span>
            </div>
        </div>
    </div>
     )
}

export default HeaderLayout
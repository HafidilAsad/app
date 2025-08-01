import React, { useEffect } from 'react';
import HeaderLayout from '../../components/header/headerLayout2';
import axios from 'axios';
import GaugeChart from 'react-gauge-chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { Helmet } from "react-helmet";

const Dashboardv4 = () => {
  const [dataEnergy, setDataEnergy] = React.useState([]);
  const [dataEnergyTotal, setDataEnergyTotal] = React.useState([]);  
  const [dataHistory, setDataHistory] = React.useState([]);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = dateObj.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  };

  const fetchDataEnergy = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL_ENERGY}/data`);
      setDataEnergy(response.data.data);
      setDataEnergyTotal(response.data);
    } catch (error) {
      console.error('Error fetching energy data:', error);
    }
  };

  const fetchDataHistory = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL_ENERGY}/history`);
      // Format date
      const formatted = response.data.history.map(item => ({
        ...item,
        date: formatDate(item.date)
      }));
      setDataHistory(formatted);
    } catch (error) {
      console.error('Error fetching energy data:', error);
    }
  };

  const filteredHistory = dataHistory.filter(item => {
    if (!startDate && !endDate) return true;
    const itemDate = new Date(item.date + ' 2025'); // tambahkan tahun agar bisa dibandingkan
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (start && itemDate < start) return false;
    if (end && itemDate > end) return false;
    return true;
  });

  useEffect(() => {
    fetchDataEnergy();
    fetchDataHistory();
    const interval = setInterval(fetchDataEnergy, 5000);
    const intervalHistory = setInterval(fetchDataHistory, 60 * 60 * 1000);
    return () => {
      clearInterval(interval);
      clearInterval(intervalHistory);
    };
  }, []);


  const MeterCard = ({  valueKwh, idGaugeChart , vr, vs, vt , ir, is, it, bill}) => (
    <div className="col-2  my-2 text-white ">
      <div className="card m-1"  style={{ borderRadius: "10px", background: "#010501" , border: "2px solid #68696d"}}>
        <div className="card-body">
          <p className= "text-white text-center">Panel :  <span className='fw-bold'>{idGaugeChart}</span></p>
          <div >
            <GaugeChart
              id={idGaugeChart}
              colors={["#5BE12C", "#F5CD19", "#EA4228"]}
              nrOfLevels={5}
              percent={valueKwh / 1000}
              arcWidth={0.35}
              animate={false}
              hideText={true}
              // style={chartStyle}
              needleBaseColor="#979797"
              needleColor="#FFFFFF"
            />
          </div>
          <p className="text-white text-center">KWH : {valueKwh}</p>
        </div>
      </div>
      <div className="card m-1 mt-3" style={{ borderRadius: "10px", background: "#010101", border: "2px solid #68696d"}}>
        <div className="card-body p-0 ">
       <ul style={{ listStyleType: 'none' }} className="p-2 d-flex flex-column">
          <li className="text-white d-flex justify-content-between px-2">
            <span>Vr : {vr} V</span>
            <span>Ir : {ir} A</span>
          </li>
          <li className="text-white d-flex justify-content-between px-2">
            <span>Vs : {vs} V</span>
            <span>Is : {is} A</span>
          </li>
          <li className="text-white d-flex justify-content-between px-2">
            <span>Vt : {vt} V</span>
            <span>It : {it} A</span>
          </li>
        </ul>
        </div>
      </div>
       <div className="card m-1 mt-3" style={{ borderRadius: "10px", background: "#010101", border: "2px solid #68696d"}}>
        <div className="card-body p-1 text-center">
          <p><span className="text-white pt-1">Billing :  <span className="fw-bold">Rp {bill.toLocaleString()}</span> </span></p>
        </div>
      </div>
      
    </div>
  );

  return (
    <div style={{ backgroundColor: '#010101' , maxWidth: '100vw', minWidth: '1024px', minHeight: '100vh', overflowX: 'auto' }}>
      <Helmet>
        <title>Energy Monitoring Dashboard | Solusi Dari Programmer</title>
        <meta name="description" content="Pantau konsumsi energi, efisiensi, dan data panel listrik secara real-time dengan dashboard interaktif." />
        <meta name="keywords" content="dashboard energi, monitoring, listrik, efisiensi, solusi programmer" />
        <meta property="og:title" content="Energy Monitoring Dashboard | Solusi Dari Programmer" />
        <meta property="og:description" content="Pantau konsumsi energi, efisiensi, dan data panel listrik secara real-time dengan dashboard interaktif , Solusi Dari Programmer, Solusi Programmer, Solusi Programmer Indonesia, building management system, smart building, smart home, smart city, smart grid, energy management system, ems, energy monitoring system, ems, energy efficiency, energy conservation, energy management software" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://demo1.solusiprogrammer.com/logo192.png" />
        <meta property="og:url" content="https://demo1.solusiprogrammer.com/v4/dashboard" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Energy Monitoring Dashboard | Solusi Dari Programmer" />
        <meta name="twitter:description" content="Pantau konsumsi energi, efisiensi, dan data panel listrik secara real-time dengan dashboard interaktif." />
        <meta name="twitter:image" content="https://demo1.solusiprogrammer.com/logo192.png" />
        <link rel="canonical" href="https://demo1.solusiprogrammer.com/v4/dashboard" />
      </Helmet>
      <HeaderLayout
        judulHeader="ENERGY MONITORING DASHBOARD"
        bgHeader="#1a1e27"
        colorTitle="#ffffff"
      />
      <div className="row my-2">
        {dataEnergy.map((dataEnergy) => (
          <MeterCard
            key={dataEnergy.id}
            title={dataEnergy.panel}
            valueKwh={dataEnergy.kwh}
            idGaugeChart={dataEnergy.panel}
            vr={dataEnergy.v_r}
            vs={dataEnergy.v_s}
            vt={dataEnergy.v_t}
            ir={dataEnergy.i_r}
            is={dataEnergy.i_s}
            it={dataEnergy.i_t}
            bill={dataEnergy.bill}

          />
        ))}
      </div>
      <div className="row my-2 ">
        <div className="col">
          <div className="card" style={{ borderRadius: "10px", background: "#010101", border: "2px solid #68696d"}}>
            <div className="card-body p-2 text-white text-center">
              Total Kwh  : <span className="fw-bold">{(dataEnergyTotal.total_kwh || 0).toLocaleString()} </span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card" style={{ borderRadius: "10px", background: "#010101", border: "2px solid #68696d"}}>
            <div className="card-body p-2 text-white text-center">
              Total Billing  : <span className="fw-bold">{(dataEnergyTotal.total_bill || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
       <div className="d-flex justify-content-end">
        <div className="aliggn-right text-white">
          Start Date : 
           <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className='m-1'
            placeholder="Start Date"
          />
          End Date :
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className='m-1'
            placeholder="End Date"
          />
        </div>
      </div>
       <div className="row my-2">
          <div className="col-6">
            <div className="card" style={{ borderRadius: "10px", background: "#010101", border: "2px solid #68696d" }}>
              <div className="card-body">
                <h5 className="text-white text-center mb-3">kWh History</h5>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={filteredHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="kwh" fill="#5BE12C">
                      <LabelList dataKey="kwh" position="insideTop" fill="#010101" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card" style={{ borderRadius: "10px", background: "#010101", border: "2px solid #68696d" }}>
              <div className="card-body">
                <h5 className="text-white text-center mb-3">Efficiency</h5>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={filteredHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="eff" fill="#5BE12C">
                        <LabelList
                          dataKey="eff"
                          position="center"
                          content={({ x, y, value, width }) => (
                            <text
                              x={x + width / 2}
                              y={y}
                              textAnchor="middle"
                              fontWeight={value < 0 ? 'bold' : 'normal'}
                              fill={value < 0 ? 'red' : '#fff'}
                              fontSize={14}
                              dy={-4}
                            >
                              {value}
                            </text>
                          )}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
              </div>
            </div>
          </div>
      </div>
    </div>

  );
};

export default Dashboardv4;

import React, { useEffect } from 'react';
import HeaderLayout from '../../components/header/headerLayout2';
import axios from 'axios';
import GaugeChart from 'react-gauge-chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

const Dashboardv4 = () => {
  const [dataEnergy, setDataEnergy] = React.useState([]);
  const [dataEnergyTotal, setDataEnergyTotal] = React.useState([]);  
  const [dataHistory, setDataHistory] = React.useState([]);

  const fetchDataEnergy = async () => {
    try {
      const response = await axios.get('https://blok21no12.my.id/energymonitoring/data');
      setDataEnergy(response.data.data);
      setDataEnergyTotal(response.data);
    } catch (error) {
      console.error('Error fetching energy data:', error);
    }
  };

  const fetchDataHistory = async () => {
    try {
      const response = await axios.get('https://blok21no12.my.id/energymonitoring/history');
      setDataHistory(response.data.history);
    } catch (error) {
      console.error('Error fetching energy data:', error);
    }
  };

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
    <div className="col-lg-2 col-md-4 col-sm-6 my-2 text-white ">
      <div className="card m-1"  style={{ borderRadius: "10px", background: "#010501" , border: "2px solid #68696d"}}>
        <div className="card-body">
          <p className= "text-white text-center">Panel :  <span className='fw-bold'>SDP-{idGaugeChart}</span></p>
          <div >
            <GaugeChart
              id={idGaugeChart}
              colors={["#5BE12C", "#F5CD19", "#EA4228"]}
              nrOfLevels={5}
              percent={valueKwh / 100}
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
    <div style={{ backgroundColor: '#010101' , maxWidth: '100vw', minWidth: '100vw', minHeight: '100vh', overflowY: 'auto' }}>
      <HeaderLayout
        judulHeader="ENERGY MONITORING DASHBOARD"
        bgHeader="#1a1e27"
        colorTitle="#ffffff"
      />
       <div className="row my-2">
          <div className="col">
            <div className="card" style={{ borderRadius: "10px", background: "#010101", border: "2px solid #68696d" }}>
              <div className="card-body">
                <h5 className="text-white text-center mb-3">kWh History</h5>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={dataHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="kwh" fill="#5BE12C">
                      <LabelList dataKey="kwh" position="top" fill="#fff" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ borderRadius: "10px", background: "#010101", border: "2px solid #68696d" }}>
              <div className="card-body">
                <h5 className="text-white text-center mb-3">Efficiency</h5>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={dataHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="eff" fill="#5BE12C">
                      <LabelList dataKey="eff" position="top" fill="#fff" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
      </div>
      <div className="row my-2">
        {dataEnergy.map((dataEnergy) => (
          <MeterCard
            key={dataEnergy.id}
            title={dataEnergy.panel}
            valueKwh={dataEnergy.kwh}
            idGaugeChart={dataEnergy.id}
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
      </div>

  );
};

export default Dashboardv4;

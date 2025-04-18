import React, { useState, useEffect, } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb ,faBarsStaggered, faPen, faFile, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import ThreeDotsWave from '../threeDotsWaves';
import M221 from "../../assets/M221.jpg";
import S7 from "../../assets/S7.jpg";
import CP2E from "../../assets/CP2E.jpg";
import M241CE40R from "../../assets/M241CE40R.jpg";
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {Modal, Button, Table, Form} from "react-bootstrap";
import ChartKwh2 from './ChartKwh2';
import CardSenensor2 from './CardSensor2';
import ChartHumidity from './ChartHumidity';
import ReportTable from './ReportTable';
import * as XLSX from 'xlsx';



const ContentDashboardv2 = () => {
  const [loading, setLoading] = useState(true);
  const [dataStatus, setDataStatus] = useState({});
  const [kwhKemarin , setKwhKemarin] = useState(0);
  const [showModalSetting, setShowModalSetting] = useState(false);
  const [showModalReport, setShowModalReport] = useState(false);
  const [showModalCctv, setShowModalCctv] = useState(false);
  const [dataCronTimes, setDataCronTimes] = useState([]);
  const [selectedCron, setSelectedCron] = useState(null);
  const [turnOnTime, setTurnOnTime] = useState("");
  const [turnOffTime, setTurnOffTime] = useState("");
  const [dataReport, setDataReport] = useState([]);


  const handleExportToExcel = () => {
    try {
        const worksheet = XLSX.utils.json_to_sheet(dataReport.map((item, index) => ({
            No: index + 1,
            kWh: item.deltaKwh !== null ? item.deltaKwh.toFixed(3) : '',
            Cost: item.cost !== null ? item.cost.toFixed(1) : '',
            Efficiency: item.efficiency !== null ? item.efficiency.toFixed(1) : '',
            Humidity: item.humidity.toFixed(1),
            Temperature: item.temperature.toFixed(1),
            Date: new Date(item.createdAt).toLocaleDateString('id-ID'),
        })));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Report Data');
        XLSX.writeFile(workbook, 'ReportData.xlsx');

        // Show success notification
        NotificationManager.success('Excel file downloaded successfully!', 'Success');
        setShowModalReport(false); // Close the modal after export
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        NotificationManager.error('Failed to export Excel file.', 'Error');
    }
};

const handleShowCctv = () => {
    setShowModalCctv(true);
};

const handleCloseCctv = () => {
    setShowModalCctv(false);
};

  

  const handleShowDataReport = async () => {
    try {
      const response = await axios.get("https://solusiprogrammer.com/api/energy");
      const rawData = response.data;
  
      const sortedData = [...rawData].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
  
      const transformedData = sortedData.map((item, index, arr) => {
        const currentKwh = item.kwh / 1000;
  
        if (index === 0) {
          return {
            ...item,
            deltaKwh: 0,
            cost: 0,
            efficiency: 0,
            humidity: parseFloat(item.humidity.toFixed(1)),
            temperature: parseFloat(item.temperature.toFixed(1)),
          };
        }
  
        const prevKwh = arr[index - 1].kwh / 1000;
        const delta = currentKwh - prevKwh;
        const deltaKwh = parseFloat(delta.toFixed(3));
        const cost = parseFloat((deltaKwh * 1300).toFixed(1));
        const efficiency = parseFloat((Math.random() * 100).toFixed(1));
  
        return {
          ...item,
          deltaKwh: deltaKwh === 0 ? null : deltaKwh,
          cost: deltaKwh === 0 ? null : cost,
          efficiency: deltaKwh === 0 ? null : efficiency,
          humidity: parseFloat(item.humidity.toFixed(1)),
          temperature: parseFloat(item.temperature.toFixed(1)),
        };
      });
  
      setDataReport(transformedData);
      setShowModalReport(true);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  

  const handleShowModalSetting = (key, cron) => {
    if (!cron) {
      console.error(`Cron data for ${key} is undefined`);
      return;
    }
    
    setSelectedCron(key);
    setTurnOnTime(formatTime(cron.turnOnTime));
    setTurnOffTime(formatTime(cron.turnOffTime));
    setShowModalSetting(true);
  };

  const handleCloseModal = () => {
    setShowModalSetting(false);
    setSelectedCron(null);
  };

  const handleCloseModalReport = () => {
    setShowModalReport(false);
  };


  const handleUpdateCronTime = async () => {
    try {
      await axios.post("https://solusiprogrammer.com/api/update-cron-times", {
        button: selectedCron,
        turnOnTime: parseTime(turnOnTime),
        turnOffTime: parseTime(turnOffTime),
      });
      NotificationManager.success("Berhasil Update Waktu Schedule", "Success");
      fetchCronTimes();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating cron time:", error);
      NotificationManager.error("Gagal Update Waktu Schedule", "Error");
    }
  };

  const fetchCronTimes = async () => {
    try {
      const response = await axios.get("https://solusiprogrammer.com/api/cron-times");
      const data = response.data || {}; // Hindari undefined/null
      setDataCronTimes(data);
    } catch (error) {
      console.error(error);
      setDataCronTimes({});
    }
  };



  const fetchDataStatus = async () => {
    try {
      const response = await axios.get('https://solusiprogrammer.com/api/getallstatus')
      setDataStatus(response.data);
      
    } catch (error) {
      console.error(error);
    }
  }

  const fetchDataKwhKemarin = async () => {
    try {
      const response = await axios.get('https://solusiprogrammer.com/api/energy?status=terbaru')
      setKwhKemarin(response.data.kwh);
      // console.log(response.data.kwh);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDataKwhKemarin();
    fetchCronTimes();
  }, [])
  
  
  const handleButtonChange = async (button, event) => {
    const checked = event.target.checked;
    const newState = checked ? 1 : 0;
    
    // Update local state
    setDataStatus((prevState) => ({
      ...prevState,
      [button]: newState,
    }));

    try {
      await axios.post(`https://solusiprogrammer.com/api/control/${button}/${newState}`);
      NotificationManager.success(`Lamp ${button} changed `, 'Success');
    } catch (error) {
      console.error(error);
      NotificationManager.error('Failed to change status', 'Error');
    }
  };
  
  const handleButtonDoorChange = async (button, event) => {
    const checked = event.target.checked;
    const newState = checked ? 1 : 0;
    
    // Update local state
    setDataStatus((prevState) => ({
      ...prevState,
      [button]: newState,
    }));

    try {
      await axios.post(`https://solusiprogrammer.com/api/control/${button}/${newState}`);
      NotificationManager.success('Door changed', 'Success');
    } catch (error) {
      console.error(error);
      NotificationManager.error('Failed to change Door status', 'Error');
    }
  };


  useEffect(() => {
    fetchDataStatus();
    setInterval(() => {
      fetchDataStatus();
    }, 3000);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const imgOptions = [
    { imgSrc: M221, title: "M221" },
    { imgSrc: M241CE40R, title: "M241CE40R" },
    { imgSrc: CP2E, title: "CP2E" },
    { imgSrc: S7, title: "S7 1200 1212" },
];

let dataEnergy = dataStatus.voltage * dataStatus.arus
const getLampColor = (button) => {
  switch (button) {
    case 'button_1':
      return dataStatus[button] === 1 ? '#32a852' : '#808080'; 
    case 'button_2':
      return dataStatus[button] === 1 ? '#FFA500' : '#808080'; 
    case 'button_3':
      return dataStatus[button] === 1 ? '#d3d329' : '#808080';
    case 'button_4':
      return dataStatus[button] === 1 ? '#0000FF' : '#808080'; 
    default:
      return '#808080'; 
  }
};

const getLampStyle = (button) => {
  if (dataStatus[button] === 1) {
    const lampColor = getLampColor(button);
    return {
      color: lampColor,
      filter: `drop-shadow(0 0 15px ${lampColor}) drop-shadow(0 0 30px ${lampColor})`,
    };
  } else {
    return { color: getLampColor(button) }; // No shadow when off
  }
};


const formatTime = (cronTime) => {
  const match = cronTime.match(/(\d{2}) (\d{2}) \* \* \*/);
  return match ? `${match[2]}:${match[1]}` : "";
};

const parseTime = (time) => {
  const [hh, mm] = time.split(":");
  return `${mm} ${hh} * * *`;
};

console.log(dataCronTimes);


  return (
    <div className='container-fluid'>
       {loading ? (
        <ThreeDotsWave />
      ) : (
        <>
          <div className="row m-2 mt-2 ">
            <div className="col-lg-4">
                <div className="card shadow h-100 " onClick={handleShowCctv} style={{cursor: 'pointer', backgroundColor: '#010101', border: '2px solid #68696d', borderRadius: '10px'}}>
                    <div className="card-body text-center ">
            
                    {/* <JsmpegPlayer url={websocketUrl} /> */}
                    {/* <VideoStream /> */}
                    <h4 className='mb-2 fw-semibold text-white'>Display CCTV</h4>
                <iframe 
                    src={"https://cctv.solusiprogrammer.com/picture/1/frame/"}
                    width="100%"
                    height="70%"
                    frameBorder="0"
                    allowFullScreen
                
                    
                    />
                    </div>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="card" style={{cursor: 'pointer', backgroundColor: '#010101', border: '2px solid #68696d', borderRadius: '10px'}}>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-2">
                            <div className="  border-0">
                                <div className="card-body ">
                                <div className="row mx-5 ">
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 text-center">
                                    <FontAwesomeIcon icon={faLightbulb} className="mb-3" size="3x"         style={getLampStyle('button_1')}/>
                                    <div className="form-check fs-5 form-switch my-1 d-flex justify-content-center align-items-center">
                                        <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        checked={dataStatus.button_1 === 1} 
                                        onChange={(event) => handleButtonChange('button_1', event)}
                                        />
                                    </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 text-center">
                                    <FontAwesomeIcon icon={faLightbulb} className="mb-3" size="3x"  style={getLampStyle('button_2')}  />
                                    <div className="form-check fs-5 form-switch my-1 d-flex justify-content-center align-items-center">
                                        <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        checked={dataStatus.button_2 === 1} 
                                        onChange={(event) => handleButtonChange('button_2', event)}
                                        />
                                    </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 text-center">
                                    <FontAwesomeIcon icon={faLightbulb} className="mb-3" size="3x"    style={getLampStyle('button_3')} />
                                    <div className="form-check fs-5 form-switch my-1 d-flex justify-content-center align-items-center">
                                        <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        checked={dataStatus.button_3 === 1} 
                                        onChange={(event) => handleButtonChange('button_3', event)}
                                        />
                                    </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 text-center">
                                    <FontAwesomeIcon icon={faLightbulb} className="mb-3" size="3x"  style={getLampStyle('button_4')}/>
                                    <div className="form-check fs-5 form-switch my-1 d-flex justify-content-center align-items-center">
                                        <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        checked={dataStatus.button_4 === 1} 
                                        onChange={(event) => handleButtonChange('button_4', event)}
                                        />
                                    </div>
                                    </div>
                                </div>
                                <div className=" mx-5 text-center shadow border-0  p-0">
                                    <div className="row ">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{cursor: 'pointer', maxHeight: '10em', overflowY: 'auto'}} onClick={handleShowModalSetting}>
                                        <Table striped variant='dark' bordered hover>
                                        <thead>
                                            <tr>
                                            <th className='p-0'>No</th>
                                            <th className='p-0'>Button</th>
                                            <th className='p-0'>Turn On Time</th>
                                            <th className='p-0'> Turn Off Time</th>
                                            <th className='p-0'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(dataCronTimes).map(([key, cron], index) => (
                                            <tr key={key}>
                                                <td className='px-1 py-0' >{index + 1}</td>
                                                <td className='p-0'>{key}</td>
                                                <td className='p-0'>{formatTime(cron.turnOnTime)}</td>
                                                <td className='p-0'>{formatTime(cron.turnOffTime)}</td>
                                                <td className='p-0'>
                                                <Button variant="info" className='mx-2 py-1 ' onClick={() => handleShowModalSetting(key, cron)}>
                                                    <FontAwesomeIcon icon={faPen} />
                                                </Button>
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                        </Table>   
                                    </div>
                                    </div>     
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="row m-2 mt-3">
            <div className="col-lg-6 col-md-12 col-sm-12 ">
                <div className="row mb-2">
                    <div className="col-12 mb-2">
                        <div className="card" onClick={handleShowDataReport} style={{cursor: 'pointer', backgroundColor: '#010101', border: '2px solid #68696d', borderRadius: '10px'}}>
                            <div className="card-body">
                                <ChartKwh2 />
                            </div>
                        </div>                   
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card" onClick={handleShowDataReport} style={{cursor: 'pointer', backgroundColor: '#010101', border: '2px solid #68696d', borderRadius: '10px'}}>
                            <div className="card-body">
                                <ChartHumidity />
                            </div>
                        </div>                   
                    </div>
                </div>
                
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="row mb-2">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <CardSenensor2 titleSensor="kWh"  valueSensor={(typeof dataStatus.kwh === 'number' && typeof kwhKemarin === 'number') ? (dataStatus.kwh - kwhKemarin).toFixed(1) : "0"}  satuanSensor="kWh" />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <CardSenensor2 titleSensor="Water Usage" valueSensor={80} satuanSensor="m³" />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <CardSenensor2 titleSensor="Temperature"   valueSensor={dataStatus.suhu !== undefined ? dataStatus.suhu.toFixed(1) : "0"}  satuanSensor="C" />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                       <CardSenensor2	 titleSensor="Humidity" valueSensor={dataStatus.kelembaban !== undefined ? dataStatus.kelembaban.toFixed(1) : "0"}  satuanSensor="%" />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <CardSenensor2 titleSensor="voltage" valueSensor={dataStatus.voltage !== undefined ? dataStatus.voltage.toFixed(1) : "0"} satuanSensor="V" />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className='card shadow  text-center  ' style={{backgroundColor: '#010101', border: '2px solid #68696d', borderRadius: '10px'}}>
                            <div className='card-body px-5 py-1 text-center text-white'>
                            <p className='fs-4'>Lampu Panel</p>
                            <FontAwesomeIcon
                                icon={faBarsStaggered}
                                className='me-5'
                                size='3x'
                                style={{
                                color: dataStatus.button_door_2 === 1 ? 'yellow' : 'black',
                                filter: dataStatus.button_door_2 === 1
                                    ? 'drop-shadow(0 0 15px gold) drop-shadow(0 0 30px gold)'
                                    : 'none',
                                }}
                            />
                            <div className='text-end'>
                                <div className="form-check form-switch ms-3 my-1 text-end ">
                                <input 
                                    className="form-check-input fs-5 ps-3" 
                                    type="checkbox" 
                                    checked={dataStatus.button_door_2 === 1} 
                                    onChange={(event) => handleButtonDoorChange('button_door_2', event)} 
                                />
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </div>
          </div>
          
          <NotificationContainer/>
          <Modal show={showModalSetting} onHide={handleCloseModal} size='lg'>
            <Modal.Header closeButton>
              <Modal.Title>Edit Schedule Time</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Turn On Time</Form.Label>
                  <Form.Control
                    type="text"
                    value={turnOnTime}
                    onChange={(e) => setTurnOnTime(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Turn Off Time</Form.Label>
                  <Form.Control
                    type="text"
                    value={turnOffTime}
                    onChange={(e) => setTurnOffTime(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdateCronTime}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          //modal report
          <Modal show={showModalReport} onHide={handleCloseModalReport} size='xl'>
            <Modal.Header closeButton>
              <Modal.Title>
               <FontAwesomeIcon icon={faFile} /> Report Data for Energy</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className='d-flex justify-content-end mb-2'>
                  <Button variant="success" onClick={handleExportToExcel}>
                    <FontAwesomeIcon icon={faFileExcel} /> Download
                  </Button>
                </div>
                <ReportTable dataReport={dataReport} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModalReport}>
                Close
              </Button>
            </Modal.Footer>
          </Modal> 
            
            
          <Modal show={showModalCctv} onHide={handleCloseCctv} size="xl" >
            <Modal.Header closeButton>
                <Modal.Title>
                <FontAwesomeIcon icon={faFile} /> CCTV
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: 0, height: '70vh', overflow: 'hidden' }}>
                <iframe
                src="https://cctv.solusiprogrammer.com/picture/1/frame/"
                style={{ width: '100%', height: '100%', border: 'none' }}
                // allowFullScreen
                />
            </Modal.Body>
            </Modal>
                                
        </>
      )}
   
    </div>
  );
};

export default ContentDashboardv2;

import parkingImg from '../../assets/parking-zone.webp';

const ParkingInfo = () => {
  return (
    <div className="col-md-8 mt-2">
      <div className="row">
        <div className="col">
          <div className="card w-100">
            <div className="card-body">
              <h5 className="card-title">Parking Zone (Green Parking) Information</h5>
              <p className="card-text">
                This parking zone has a total capacity of 650 vehicles and with carbon emission reduction of 35% compared to the previous year.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col d-flex justify-content-center align-items-center">
          <img
            src={parkingImg}
            alt="Parking Zone"
            width="100%"
            height={550}
            className="img-fluid my-2"
            style={{ border: '2px solid #ccc', borderRadius: '10px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ParkingInfo;
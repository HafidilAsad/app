import parkingImg from '../../assets/parking_cars_2.png';
import gambarBmw from '../../assets/bmw.png';
import gambarCity from '../../assets/city.png';

const ParkingInfo = ({ parkingInfoData }) => {
  // Posisi untuk setiap slot berdasarkan ID
  const positions = [
    { id: 1, top: '14.5%', left: '8.3%' },
    // { id: 2, top: '14.5%', left: '12.5%' },
    // { id: 3, top: '14.5%', left: '25%' },
    // { id: 4, top: '20%', left: '5%' },
    // { id: 5, top: '20%', left: '15%' },
    // { id: 6, top: '20%', left: '25%' },
    // { id: 7, top: '30%', left: '5%' },
    // { id: 8, top: '30%', left: '15%' },
    // { id: 9, top: '30%', left: '25%' },
    // { id: 14.5, top: '40%', left: '5%' },
    // Tambahkan posisi untuk ID lainnya...
  ];

  return (
    <div className="col-md-8 mt-1">
      <div
        className="position-relative m-0"
        style={{
          width: '100%',
          height: '450px',
          backgroundImage: `url(${parkingImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '2px solid #ccc',
          borderRadius: '10px',
        }}
      >
        {/* Render gambar berdasarkan data */}
        {parkingInfoData.map((slot) => {
          // Cari posisi berdasarkan ID
          const position = positions.find((pos) => pos.id === slot.id);

          // Tentukan gambar berdasarkan jenis mobil
          const carImage = slot.car === 'HONDA_CITY' ? gambarCity : gambarBmw;

          // Jika posisi ditemukan, render gambar
          return position ? (
            <img
              key={slot.id}
              src={carImage}
              alt={slot.car}
              style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: '80px',
                height: 'auto',
              }}
            />
          ) : null;
        })}
      </div>
      <div className="row mt-3">
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
    </div>
  );
};

export default ParkingInfo;
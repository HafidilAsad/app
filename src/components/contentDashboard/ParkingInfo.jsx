import parkingImg from '../../assets/parking_cars_2.png';
import gambarBmw from '../../assets/bmw.png';
import gambarCity from '../../assets/city.png';

const ParkingInfo = ({ parkingInfoData, parkingDataCard }) => {
  // Posisi untuk setiap slot berdasarkan ID
  const positions = [
    /* Bar 1 */
    { id: 1, top: '13%', left: '7.4%' },
    { id: 2, top: '13%', left: '12%' },
    { id: 3, top: '13%', left: '16%' },
    { id: 4, top: '13%', left: '20%' },
    { id: 5, top: '13%', left: '24%' },
    { id: 6, top: '13%', left: '28%' },
    { id: 7, top: '13%', left: '32.5%' },
    { id: 8, top: '13%', left: '36%' },
    { id: 9, top: '13%', left: '40%' },
    { id: 10, top: '13%', left: '44%' },
    { id: 11, top: '13%', left: '48%' },
    { id: 12, top: '13%', left: '52.5%' },
    { id: 13, top: '13%', left: '56%' },
    { id: 14, top: '13%', left: '60.5%' },
    { id: 15, top: '13%', left: '64.5%' },
    { id: 16, top: '13%', left: '69%' },
    { id: 17, top: '12.5%', left: '73.5%' },
    { id: 18, top: '13%', left: '77.5%' },
    { id: 19, top: '12.5%', left: '81.5%' },

    /* Bar 2 */
    { id: 20, top: '39%', left: '7%' },
    { id: 21, top: '39%', left: '11.5%' },
    { id: 22, top: '39%', left: '16%' },
    { id: 23, top: '39%', left: '20%' },
    { id: 24, top: '39%', left: '24%' },
    { id: 25, top: '39%', left: '28%' },
    { id: 26, top: '39%', left: '32.5%' },
    { id: 27, top: '39%', left: '36%' },
    { id: 28, top: '39%', left: '40%' },
    { id: 29, top: '39%', left: '44%' },
    { id: 30, top: '39%', left: '48%' },
    { id: 31, top: '39%', left: '52.5%' },
    { id: 32, top: '39%', left: '56%' },
    { id: 33, top: '39%', left: '60.5%' },
    { id: 34, top: '39%', left: '64.5%' },
    { id: 35, top: '39%', left: '69%' },
    { id: 36, top: '39%', left: '73.5%' },
    { id: 37, top: '39%', left: '78%' },
    { id: 38, top: '39%', left: '82%' },

/* Bar 3 */
    { id: 39, top: '54%', left: '7.5%' },
    { id: 40, top: '54%', left: '11.5%' },
    { id: 41, top: '54%', left: '15.5%' },
    { id: 42, top: '54%', left: '20%' },
    { id: 43, top: '54%', left: '24%' },
    { id: 44, top: '54%', left: '28%' },
    { id: 45, top: '54%', left: '32.5%' },
    { id: 46, top: '54%', left: '36%' },
    { id: 47, top: '54%', left: '40%' },
    { id: 48, top: '54%', left: '44%' },
    { id: 49, top: '54%', left: '48%' },
    { id: 50, top: '54%', left: '52.5%' },
    { id: 51, top: '54%', left: '56%' },
    { id: 52, top: '54%', left: '60.5%' },
    { id: 53, top: '54%', left: '65.5%' },
    { id: 54, top: '54%', left: '70%' },
    { id: 55, top: '54%', left: '74%' },
    { id: 56, top: '54%', left: '78.5%' },
    { id: 57, top: '54%', left: '82.5%' },

/* Bar 4 */
    { id: 58, top: '77%', left: '6.5%' },
    { id: 59, top: '77%', left: '11.5%' },
    { id: 60, top: '77%', left: '15.5%' },
    { id: 61, top: '77%', left: '19.5%' },
    { id: 62, top: '77%', left: '24%' },
    { id: 63, top: '77%', left: '28%' },
    { id: 64, top: '77%', left: '32.5%' },
    { id: 65, top: '77%', left: '36%' },
    { id: 66, top: '77%', left: '40%' },
    { id: 67, top: '77%', left: '44%' },
    { id: 68, top: '77%', left: '48%' },
    { id: 69, top: '77%', left: '52.5%' },
    { id: 70, top: '77%', left: '56%' },
    { id: 71, top: '77%', left: '60.5%' },
    { id: 72, top: '77%', left: '65.5%' },
    { id: 73, top: '77%', left: '70.5%' },
    { id: 74, top: '77%', left: '75%' },
    { id: 75, top: '77%', left: '79%' },
    { id: 76, top: '77%', left: '84%' },

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

        // Jika posisi ditemukan dan status bukan 0, render gambar
        return position && slot.status !== 0 ? (
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
                This parking zone has a total capacity of {parkingInfoData.length} vehicles and with carbon emission reduction of {parkingDataCard.co_level}% compared to the previous year.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingInfo;
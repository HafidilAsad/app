import parkingImg from '../../assets/parking-nocar.png';
import gambarBmw from '../../assets/bmw.png';
import gambarCity from '../../assets/city.png';

const ParkingInfo = ({ parkingInfoData, parkingDataCard }) => {
  // Posisi untuk setiap slot berdasarkan ID
  const positions = [
    /* Bar 1 */
    { id: 1, top: '12%', left: '8%' },
    { id: 2, top: '12%', left: '12%' },
    { id: 3, top: '12%', left: '16.5%' },
    { id: 4, top: '12%', left: '21%' },
    { id: 5, top: '12%', left: '25.5%' },
    { id: 6, top: '12%', left: '30%' },
    { id: 7, top: '12%', left: '34%' },
    { id: 8, top: '12%', left: '39%' },
    { id: 9, top: '12%', left: '43%' },
    { id: 10, top: '12%', left: '47%' },
    { id: 11, top: '12%', left: '51%' },
    { id: 12, top: '12%', left: '55%' },
    { id: 13, top: '12%', left: '59.5%' },
    { id: 14, top: '12%', left: '63%' },
    { id: 15, top: '12%', left: '68%' },
    { id: 16, top: '12%', left: '72%' },
    { id: 17, top: '12%', left: '77%' },
    { id: 18, top: '12%', left: '81%' },
    { id: 19, top: '12%', left: '85%' },

    /* Bar 2 */
    { id: 20, top: '34.5%', left: '8%' },
    { id: 21, top: '34.5%', left: '12%' },
    { id: 22, top: '34.5%', left: '17%' },
    { id: 23, top: '34.5%', left: '22%' },
    { id: 24, top: '34.5%', left: '26%' },
    { id: 25, top: '34.5%', left: '30%' },
    { id: 26, top: '34.5%', left: '33.5%' },
    { id: 27, top: '34.5%', left: '38%' },
    { id: 28, top: '34.5%', left: '42%' },
    { id: 29, top: '34.5%', left: '47%' },
    { id: 30, top: '34.5%', left: '51%' },
    { id: 31, top: '34.5%', left: '55.5%' },
    { id: 32, top: '34.5%', left: '59%' },
    { id: 33, top: '34.5%', left: '63.5%' },
    { id: 34, top: '34.5%', left: '67.5%' },
    { id: 35, top: '34.5%', left: '72%' },
    { id: 36, top: '34.5%', left: '76.5%' },
    { id: 37, top: '34.5%', left: '81%' },
    { id: 38, top: '34.5%', left: '85%' },

    /* Bar 3 */
    { id: 39, top: '49%', left: '8.5%' },
    { id: 40, top: '49%', left: '13%' },
    { id: 41, top: '49%', left: '17.5%' },
    { id: 42, top: '49%', left: '22%' },
    { id: 43, top: '49%', left: '26%' },
    { id: 44, top: '49%', left: '30%' },
    { id: 45, top: '49%', left: '34.5%' },
    { id: 46, top: '49%', left: '39%' },
    { id: 47, top: '49%', left: '43%' },
    { id: 48, top: '49%', left: '47.5%' },
    { id: 49, top: '49%', left: '51%' },
    { id: 50, top: '49%', left: '55.5%' },
    { id: 51, top: '49%', left: '59%' },
    { id: 52, top: '49%', left: '63.5%' },
    { id: 53, top: '49%', left: '68.5%' },
    { id: 54, top: '49%', left: '72%' },
    { id: 55, top: '49%', left: '77.5%' },
    { id: 56, top: '49%', left: '81.5%' },
    { id: 57, top: '49%', left: '85.5%' },

    /* Bar 4 */
    { id: 58, top: '77%', left: '8%' },
    { id: 59, top: '77%', left: '12.5%' },
    { id: 60, top: '77%', left: '16.5%' },
    { id: 61, top: '77%', left: '21.5%' },
    { id: 62, top: '77%', left: '25.5%' },
    { id: 63, top: '77%', left: '30%' },
    { id: 64, top: '77%', left: '34.5%' },
    { id: 65, top: '77%', left: '38%' },
    { id: 66, top: '77%', left: '43%' },
    { id: 67, top: '77%', left: '47%' },
    { id: 68, top: '77%', left: '51.5%' },
    { id: 69, top: '77%', left: '55.5%' },
    { id: 70, top: '77%', left: '60%' },
    { id: 71, top: '77%', left: '63.5%' },
    { id: 72, top: '77%', left: '68.5%' },
    { id: 73, top: '77%', left: '72.5%' },
    { id: 74, top: '77%', left: '77%' },
    { id: 75, top: '77%', left: '81%' },
    { id: 76, top: '77%', left: '86%' },
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

          // Tentukan rotasi untuk Bar 2 dan Bar 4
          const isRotated =
            (slot.id >= 20 && slot.id <= 38) || (slot.id >= 58 && slot.id <= 76);

          // Jika posisi ditemukan dan status bukan 0, render gambar
          return position && slot.status !== 0? (
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
                transform: isRotated ? 'rotate(180deg)' : 'none', // Rotasi 180 derajat untuk Bar 2 dan Bar 4
              }}
            />
          ) : null;
        })}
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="card w-100">
            <div className="card-body">
              <h5 className="card-title">Parking Zone <span className="fw-bold fs-4 text-success"> ( 🍃Green Parking)</span> Information</h5>
              <p className="card-text">
                This parking zone has a total capacity of <span className="fw-bold fs-4">{parkingInfoData.length}</span> vehicles and with carbon emission reduction of <span className="fw-bold fs-4">{parkingDataCard.co_level}%</span> compared to the previous year.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingInfo;
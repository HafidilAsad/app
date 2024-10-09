import React from 'react';

const doors = ['DOOR 1', 'DOOR 2', 'DOOR 3', 'DOOR 4' , 'DOOR 5', "DOOR 6", "DOOR 7" , "DOOR 8", "DOOR 9", "DOOR 10", "DOOR 11", "DOOR 12", "DOOR 13", "DOOR 14", "DOOR 15", "DOOR 16", "DOOR 17", "DOOR 18", "DOOR 19", "DOOR 20"];

const ContentDashboard = () => {
  return (
    <div className='container-fluid'>
      <div className="row my-2 mx-2">
        {doors.map((door, index) => (
          <div className="col-3 mt-3" key={index}>
            <div className="card shadow">
              <div className="card-header text-center fw-bold fs-4 rounded-3" style={{borderBottom: "5px solid #bcbcbc"}}>
                <div >
                    {door}
                </div>
                
              </div>
              <div className="card-body text-center fs-1 my-3">
                EMERGENCY STATUS
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentDashboard;

import React from 'react'
import HeaderLayout2 from '../../components/header/headerLayout2'
import ContentDashboardv2 from '../../components/contentDashboard/ContentDashboardv2'

const Dashboardv2 = () => {
  return (
    <div style={{backgroundColor: "#010101", height: ""}}>
      <HeaderLayout2  judulHeader={"Monitoring and Controlling Dashboard"} bgHeader={"#1a1e27"} colorTitle={"#ffffff"}/>
      <ContentDashboardv2 />
    </div>
  )
}

export default Dashboardv2
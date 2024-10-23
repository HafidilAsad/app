import React from 'react'
import HeaderLayout from '../../components/header/header'
import ContentDashboard from '../../components/contentDashboard/ContentDashboard'

const Dashboard = () => {
  return (
    <div style={{fontFamily: "monospace", backgroundColor: "#f5f5f5", minHeight: "100vh",  maxHeight: "100vh", maxWidth: "100vw"}}>
       <HeaderLayout  judulHeader={"Monitoring and Controlling Dashboard"}/>
       <ContentDashboard />
    </div>
  )
}

export default Dashboard
import React from 'react'
import HeaderLayout from '../../components/header/header'
import ContentDashboard from '../../components/contentDashboard/ContentDashboard'

const Dashboard = () => {
  return (
    <div style={{fontFamily: "Poppins"}}>
       <HeaderLayout bgHeader="linear-gradient(135deg, rgba(255,255,255,1) 40%, rgba(62,166,238,1) 100%)" />
       <ContentDashboard />

    </div>
  )
}

export default Dashboard
import { Helmet } from "react-helmet";
import HeaderLayout2 from '../../components/header/headerLayout2'
import ContentDashboardv2 from '../../components/contentDashboard/ContentDashboardv2'

const Dashboardv2 = () => {
  return (
    <div style={{
      backgroundColor: "#010101",
      maxWidth: '100vw',
      minWidth: '1024px',
      overflowX: 'auto',
    }}>
      <Helmet>
        <title>Monitoring and Controlling Dashboard | Solusi Dari Programmer</title>
        <meta name="description" content="Dashboard monitoring dan controlling perangkat IoT, energi, dan smart system secara real-time, dengan visualisasi data interaktif, bms, bas, smart building, smart home, smart city, smart grid, energy management system, ems, energy monitoring system, ems, energy efficiency, energy conservation, energy management software" />
        <meta name="keywords" content="dashboard, monitoring, controlling, IoT, energi, solusi programmer, smart system, smart building, smart home, smart city, smart grid, energy management system, ems, energy monitoring system, ems, energy efficiency, energy conservation, energy management software" />
        <meta property="og:title" content="Monitoring and Controlling Dashboard | Solusi Dari Programmer" />
        <meta property="og:description" content="Dashboard monitoring dan controlling perangkat IoT, energi, dan smart system secara real-time, bms, bas, smart building, smart home, smart city, smart grid, energy management system, ems, energy monitoring system, ems, energy efficiency, energy conservation, energy management software" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://demo1.solusiprogrammer.com/logo192.png" />
        <meta property="og:url" content="https://demo1.solusiprogrammer.com/v2/dashboard" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Monitoring and Controlling Dashboard | Solusi Dari Programmer" />
        <meta name="twitter:description" content="Dashboard monitoring dan controlling perangkat IoT, energi, dan smart system secara real-time." />
        <meta name="twitter:image" content="https://demo1.solusiprogrammer.com/logo192.png" />
        <link rel="canonical" href="https://demo1.solusiprogrammer.com/v2/dashboard" />
      </Helmet>
      <HeaderLayout2 judulHeader={"Monitoring and Controlling Dashboard"} bgHeader={"#1a1e27"} colorTitle={"#ffffff"} />
      <ContentDashboardv2 />
    </div>
  )
}

export default Dashboardv2
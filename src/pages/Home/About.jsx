import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';


const About = () => {
  return (
    <div style={{
      padding:"60px",
      background:"#0f111a",
      minHeight:"100vh",
      color:"#fff",
      textAlign:"center"
    }}>

      <h1 style={{fontSize:"42px", marginBottom:"20px"}}>
        About TransLogix
      </h1>

      <p style={{maxWidth:"800px", margin:"auto", color:"#a0a0a0", lineHeight:"1.8"}}>
        TransLogix is a logistics and delivery management platform designed to
        connect vendors and delivery drivers in a seamless ecosystem.
        Businesses can create delivery orders while drivers can accept and
        complete deliveries efficiently. The platform helps streamline logistics
        operations, improve delivery tracking, and enhance operational efficiency
        for businesses.
      </p>

      <div style={{marginTop:"60px", display:"flex", justifyContent:"center", gap:"40px", flexWrap:"wrap"}}>

        <div style={box}>
          <h2>🚀 Mission</h2>
          <p>To simplify logistics and delivery management for businesses.</p>
        </div>

        <div style={box}>
          <h2>🌍 Vision</h2>
          <p>To build a scalable and intelligent logistics platform.</p>
        </div>

        <div style={box}>
          <h2>💡 Innovation</h2>
          <p>Using modern technology to improve delivery systems.</p>
        </div>

      </div>

    </div>
  );
};

const box = {
  background:"#1a1d29",
  padding:"30px",
  borderRadius:"12px",
  width:"250px",
  border:"1px solid #2d3142"
};

export default About;
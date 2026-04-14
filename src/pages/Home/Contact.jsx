import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';


const Contact = () => {
  return (
    <div style={{
      padding:"60px",
      background:"#0f111a",
      minHeight:"100vh",
      color:"#fff"
    }}>

      <h1 style={{textAlign:"center", fontSize:"40px", marginBottom:"20px"}}>
        Contact Us
      </h1>

      <p style={{textAlign:"center", color:"#a0a0a0", marginBottom:"40px"}}>
        We'd love to hear from you
      </p>

      <div style={{
        maxWidth:"600px",
        margin:"auto",
        background:"#1a1d29",
        padding:"40px",
        borderRadius:"12px",
        border:"1px solid #2d3142"
      }}>

        <input
          type="text"
          placeholder="Your Name"
          style={input}
        />

        <input
          type="email"
          placeholder="Email Address"
          style={input}
        />

        <textarea
          placeholder="Your Message"
          rows="5"
          style={input}
        />

        <button style={{
          width:"100%",
          padding:"14px",
          borderRadius:"8px",
          border:"none",
          background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
          color:"#fff",
          fontSize:"16px",
          fontWeight:"600",
          cursor:"pointer"
        }}>
          Send Message
        </button>

      </div>

      <div style={{textAlign:"center", marginTop:"40px", color:"#a0a0a0"}}>
        <p>Email: support@translogix.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Location: Gurgaon, India</p>
      </div>

    </div>
  );
};

const input = {
  width:"100%",
  padding:"12px",
  marginBottom:"15px",
  borderRadius:"8px",
  border:"1px solid #2d3142",
  background:"#242938",
  color:"#fff"
};

export default Contact;
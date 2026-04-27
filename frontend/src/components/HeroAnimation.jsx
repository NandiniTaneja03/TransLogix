import { motion } from "framer-motion";

const HeroAnimation = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "450px" }}>
      
      <svg viewBox="0 0 800 400" style={{ width: "100%", height: "100%" }}>
        
        {/* Route Path */}
        <path
          d="M100 200 Q400 60 700 200"
          stroke="#6366f1"
          strokeWidth="4"
          strokeDasharray="12 12"
          fill="none"
        />

        {/* Pickup Location */}
        <circle cx="100" cy="200" r="12" fill="#22c55e" />

        {/* Delivery Location */}
        <circle cx="700" cy="200" r="12" fill="#8b5cf6" />

      </svg>

      {/* Moving Truck */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 600 }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: "absolute",
          top: "175px",
          left: "80px",
          fontSize: "40px"
        }}
      >
        🚚
      </motion.div>

      {/* Floating Package Card */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: "absolute",
          top: "260px",
          left: "350px",
          background: "#242938",
          padding: "12px 18px",
          borderRadius: "10px",
          color: "white",
          fontSize: "14px",
          border: "1px solid #2d3142"
        }}
      >
        📦 Package in Transit
      </motion.div>

    </div>
  );
};

export default HeroAnimation;
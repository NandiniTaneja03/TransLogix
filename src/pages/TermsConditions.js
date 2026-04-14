import React from "react";

const TermsConditions = () => {

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px"
    },

    card: {
      background: "#1a1d29",
      color: "#ffffff",
      maxWidth: "800px",
      width: "100%",
      padding: "40px",
      borderRadius: "15px",
      boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
      border: "1px solid #2d3142"
    },

    title: {
      textAlign: "center",
      marginBottom: "25px",
      fontSize: "32px",
      fontWeight: "700"
    },

    sectionTitle: {
      marginTop: "20px",
      fontSize: "18px",
      fontWeight: "600",
      color: "#8b5cf6"
    },

    text: {
      color: "#a0a0a0",
      marginTop: "8px",
      lineHeight: "1.6",
      fontSize: "14px"
    },

    footer: {
      marginTop: "30px",
      textAlign: "center",
      fontSize: "13px",
      color: "#6b7280"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1 style={styles.title}>Terms and Conditions</h1>

        <h3 style={styles.sectionTitle}>1. Account Information</h3>
        <p style={styles.text}>
          Users must provide accurate and complete information during
          registration. Providing false information may result in account
          suspension.
        </p>

        <h3 style={styles.sectionTitle}>2. Vendor Responsibilities</h3>
        <p style={styles.text}>
          Vendors must ensure that all business information and orders created
          on the platform are legitimate and comply with applicable laws.
        </p>

        <h3 style={styles.sectionTitle}>3. Driver Responsibilities</h3>
        <p style={styles.text}>
          Drivers must maintain valid driving licenses, vehicle registration,
          and insurance documents. Expired or invalid documents may lead to
          account suspension.
        </p>

        <h3 style={styles.sectionTitle}>4. Privacy Policy</h3>
        <p style={styles.text}>
          TransLogix respects your privacy. Personal information collected
          during registration will only be used for platform functionality and
          will not be shared with third parties without consent.
        </p>

        <h3 style={styles.sectionTitle}>5. Account Security</h3>
        <p style={styles.text}>
          Users are responsible for maintaining the confidentiality of their
          account credentials. TransLogix is not responsible for unauthorized
          access caused by negligence.
        </p>

        <h3 style={styles.sectionTitle}>6. Platform Rights</h3>
        <p style={styles.text}>
          TransLogix reserves the right to suspend or terminate accounts that
          violate platform rules or engage in fraudulent activities.
        </p>

        <div style={styles.footer}>
          © 2026 TransLogix. All rights reserved.
        </div>

      </div>
    </div>
  );
};

export default TermsConditions;
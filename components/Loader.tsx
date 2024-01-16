// components/Loader.js
import React from "react";
import styles from "./Loader.module.css"; // Import your CSS module

const Loader = () => {
  return (
    <div className="loader-div">
      <div className="loader">
        <div style={{ "--i": 1 } as React.CSSProperties}></div>
        <div style={{ "--i": 2 } as React.CSSProperties}></div>
        <div style={{ "--i": 3 } as React.CSSProperties}></div>
        <div style={{ "--i": 4 } as React.CSSProperties}></div>
      </div>
    </div>
  );
};
export default Loader;

import React from "react";
import "./AiSelector.css";

const AiSelector = () => {
  return (
    <div className="ai-selector">
      <div className="ai-selector-dropdown">
        <button className="ai-selector-dropdown-btn">Select AI</button>
        <div className="ai-selector-dropdown-content">
          <a href="#">Proton</a>
          <a href="#">Neutron</a>
        </div>
      </div>
    </div>
  );
};

export default AiSelector;

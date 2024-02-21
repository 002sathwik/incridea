import React from 'react';
import './Spinner.css'; // Import the CSS file for styling

export default function Spinner() {
  return (
    <div className="spinner-overlay bg-gray-900">
      <div className="spinner-container">
        <div className="pyramid-loader">
          <div className="wrapper">
            <span className="side side1" />
            <span className="side side2" />
            <span className="side side3" />
            <span className="side side4" />
            <span className="shadow" />
          </div>
        </div>
      </div>
    </div>
  );
}

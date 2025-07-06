// TablesComponent.js
import React, { useState } from 'react';
import './TablesComponent.css';

const TablesComponent = () => {
  const [selectedTable, setSelectedTable] = useState(1);

  const renderTable = (num) => (
    <div className="chalkboard">
      <div className="chalkboard-header">
        <span className="table-icon">🧮</span>
        <h3>Table of {num}</h3>
        <span className="table-icon">✨</span>
      </div>
      <div className="table-content">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="table-row">
            <span className="multiplication-text">
              <span className="number">{num}</span>
              <span className="operator">×</span>
              <span className="number">{i + 1}</span>
              <span className="equals">=</span>
              <span className="result">{num * (i + 1)}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="table-wrapper">
      <div className="tables-header">
       
        <div className="header-content">
          
          <p className="header-subtitle">Choose any table from 1 to 30 and start learning!</p>
        </div>
      </div>

      {renderTable(selectedTable)}

      <div className="table-selector">
        <h3 className="selector-title">🎯 Select a Table</h3>
        <div className="table-buttons">
          {Array.from({ length: 30 }, (_, i) => (
            <button
              key={i + 1}
              className={`table-btn ${selectedTable === i + 1 ? 'active' : ''}`}
              onClick={() => setSelectedTable(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TablesComponent;
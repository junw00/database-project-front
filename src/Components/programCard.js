import React from 'react';
import './ProgramCard.css';

const ProgramCard = ({ title, details }) => {
  return (
    <div className="program-card">
      <h3>{title}</h3>
      <p>{details}</p>
    </div>
  );
};

export default ProgramCard;

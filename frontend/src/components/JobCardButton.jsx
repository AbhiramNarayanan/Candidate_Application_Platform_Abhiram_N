import React,{useState} from 'react';

const JobCardButton = ({ onClick, url, label, bgColor, color, fontWeight }) => {
    const [hovering, setHovering] = React.useState(false);


  const buttonStyle = {
    backgroundColor: bgColor,
    color: color,
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: "14rem",
    margin: ".3rem auto",
    transition: 'all 0.3s ease',
    fontWeight : fontWeight
   
    
  };

  const hoverStyle = {
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#5a6268',
    color: '#fff',
  };

  const handleClick = () => {
    if (url) {
      window.location.href = url;
    }
    if (onClick) {
      onClick();
    }
  };

  

  return (
    <button
      style={hovering ? {...buttonStyle, ...hoverStyle} : buttonStyle}
      onClick={handleClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {label}
    </button>
  );
};

export default JobCardButton;

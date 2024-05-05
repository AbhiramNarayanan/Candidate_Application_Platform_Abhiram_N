import React,{useState} from 'react';

const JobCardButton = ({ onClick, url, label, bgColor, color, fontWeight, icon}) => {
    const [hovering, setHovering] = React.useState(false);


  const buttonStyle = {
    backgroundColor: bgColor,
    color: color,
    padding: '0.7rem 0.5rem',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    width: "100%",
    maxWidth: "18rem",
    margin: ".3rem auto",
    transition: 'all 0.3s ease',
    fontWeight : fontWeight
   
    
  };

  const hoverStyle = {
    boxShadow: '0rem 0rem 1.875rem 0.625rem rgba(0, 0, 0, 0.2)', // Adjusted boxShadow
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
      {icon}{label}
    </button>
  );
};

export default JobCardButton;

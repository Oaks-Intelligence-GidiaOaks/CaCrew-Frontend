import React from 'react';
import './MenuBars.scss';

const MenuBars = ({isOpen, handleClick}) => {
 

  return (
    <div className={`menu_bar ${isOpen ? 'open' : ''}`} onClick={() => handleClick(!isOpen)}>
      <div className="menu_bar_line"></div>
      <div className="menu_bar_line"></div>
      <div className="menu_bar_line"></div>
    </div>
  );
};

export default MenuBars;
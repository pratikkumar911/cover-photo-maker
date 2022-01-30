import React from 'react';
import './colorblock.css'

function ColorBlock(props) {
  return (
      <div className="button" style={{backgroundColor:props.color.bg, borderColor:props.color.border}}></div>
  );
}

export default ColorBlock;

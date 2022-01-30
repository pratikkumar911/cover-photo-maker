import React from 'react';
import './cover.css'

function Cover({
    name,
    headline,
    highlights,
    tagline,
    coverRef,
    bgColor,
    borderColor,
}) {
  return (
      <>
        <div className="grid-container">
            <div className='cover' style={{background:bgColor, borderBottomColor: borderColor}} ref={coverRef}>
                <div className='name'>{name}</div>
                <div className='headline'>{headline}</div>
                <div className='rightCorner'>
                    <div className='tagline'>{tagline}</div>
                    <div className='highlights'>{highlights}</div>
                </div>
            </div>
        </div>
      </>
  );
}

export default Cover;

import React from 'react';
import './Skeleton.css';

function SkeletonElement({ type }) {
  const classes = `skeleton skeleton-animate ${type}`;

  return (
    <div className={classes}></div>
  )
}

export default SkeletonElement
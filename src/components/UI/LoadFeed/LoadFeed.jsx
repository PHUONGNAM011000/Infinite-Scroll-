import React from 'react';
import classes from './LoadFeed.module.css';

const LoadFeed = (props) => {
  return (
    <div className={classes.loadFeed}>
      <p>Số Lượng Bài Post muốn load: </p>
      <input
        type="number"
        value={props.counter}
        onChange={(e) => props.setCounter(e.target.value)}
      />
      <button onClick={props.onClick}>Fetch</button>
    </div>
  );
};

export default LoadFeed;

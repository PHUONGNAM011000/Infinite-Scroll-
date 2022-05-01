import React from 'react';
import classes from './LoadFeed.module.css';

const LoadFeed = (props) => {
  return (
    <div className={classes.loadFeed}>
      <p>Số lượng bài viết muốn load: </p>
      <div>
        <input
          type="number"
          value={props.counter}
          min={5}
          onChange={(e) => props.setCounter(e.target.value)}
        />
      </div>

      <div>
        <button onClick={props.onClick}>Fetch</button>
      </div>
    </div>
  );
};

export default LoadFeed;

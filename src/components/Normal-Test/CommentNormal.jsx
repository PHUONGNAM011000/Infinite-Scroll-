import React from 'react';
import classes from './Comment.module.css';

const Comment = (props) => {
  return (
    <>
      <div className={classes.comment}>
        <div className={classes.user}>
          <img src={props.comment.media} alt="#" />
        </div>
        <div className={classes['content-comment']}>
          <div className={classes.name}>{props.comment.name}</div>
          <div className={classes.cmt}>{props.comment.body}</div>
        </div>
      </div>
    </>
  );
};

export default Comment;

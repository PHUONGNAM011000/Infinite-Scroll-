import React from 'react';
import classes from './CommentNormalDefault.module.css';

const CommentDefault = (props) => {
  return (
    <div className={classes['comment-default']}>
      <div className={classes.user}>
        <img
          src="https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png"
          alt="alt"
        />
      </div>
      <div className={classes.input}>
        <input
          ref={props.input1Ref}
          type="text"
          placeholder="Viết bình luận..."
          value={props.addCmt}
          onChange={props.onChange}
          onKeyPress={props.onAdd}
        />
      </div>
    </div>
  );
};

export default CommentDefault;

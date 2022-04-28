import React from 'react';
import Post from './Post';
import classes from './PostList.module.css';

const PostList = (props) => {
  return (
    <ul className={classes['posts-list']}>
      {props.posts.map((post, i) => (
        <Post
          key={i}
          title={post.title}
          body={post.body}
          id={post.id}
          isliked={post.isliked}
          media={post.media}
          comments={post.comments}
          removePostHandler={props.removePostHandler}
          getComments={props.getComments}
          addCommentHandler={props.addCommentHandler}
          changeLikedHandler={props.changeLikedHandler}
        />
      ))}
    </ul>
  );
};

export default PostList;

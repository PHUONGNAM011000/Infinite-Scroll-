import React from 'react';
import PostNormal from './PostNormal';
import classes from './PostListNormal.module.css';

const PostListNormal = (props) => {
  return (
    <ul className={classes['posts-list']}>
      {props.posts.map((post, i) => {
        return i === props.posts.length - 1 && props.pageNum <= 20 ? (
          <div key={i} ref={props.setLastElement}>
            <PostNormal
              title={post.title}
              body={post.body}
              id={post.id}
              isliked={post.isliked}
              media={post.media}
              removePostHandler={props.removePostHandler}
              comments={post.comments}
              getComments={props.getComments}
              addCommentHandler={props.addCommentHandler}
              changeLikedHandler={props.changeLikedHandler}
              setAddNewPost={props.setAddNewPost}
              setPostDialog={props.setPostDialog}
            />
          </div>
        ) : (
          <div key={i}>
            <PostNormal
              title={post.title}
              body={post.body}
              id={post.id}
              isliked={post.isliked}
              media={post.media}
              removePostHandler={props.removePostHandler}
              comments={post.comments}
              getComments={props.getComments}
              addCommentHandler={props.addCommentHandler}
              changeLikedHandler={props.changeLikedHandler}
              setAddNewPost={props.setAddNewPost}
              setPostDialog={props.setPostDialog}
            />
          </div>
        );
      })}
    </ul>
  );
};

export default PostListNormal;

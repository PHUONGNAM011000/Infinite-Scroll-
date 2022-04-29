import React, { useEffect } from 'react';
import classes from './Post.module.css';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FcComments } from 'react-icons/fc';
import Comment from './Comment';
import CommentDefault from './CommentDefault';
import { useState } from 'react';
import LongMenu from './UI/Menu/LongMenu';

const Post = (props) => {
  const [loadCmt, setLoadCmt] = useState(false);
  const [addCmt, setAddCmt] = useState('');
  const [liked, setLiked] = useState(props.isliked);
  const idRamdom = Math.floor(Math.random() * 20) + 1;

  const showClickHandler = () => {
    setLoadCmt(true);
    props.getComments(props.id);
  };

  const addCmtHandler = (e) => {
    if (e.key === 'Enter') {
      props.addCommentHandler({
        body: e.target.value,
        postId: props.comments[0].postId,
        media: `https://picsum.photos/id/${idRamdom}/200/300`,
      });
      setAddCmt('');
    }
  };

  const changeCmtHandler = (e) => {
    setAddCmt(e.target.value);
  };

  const likedHandler = () => {
    props.changeLikedHandler(props.id);
    setLiked(false);
  };

  const unLikedHandler = () => {
    props.changeLikedHandler(props.id);
    setLiked(true);
  };

  return (
    <>
      <div className={classes.post}>
        <div className={classes.content}>
          <h2>{`${props.id}. ${props.title}`}</h2>
          <LongMenu {...props} />
        </div>
        <p>{props.body}</p>
        <div>
          <img src={props.media} alt="#"></img>
        </div>
        <hr></hr>
        <div className={classes.actions}>
          {liked ? (
            <AiFillLike onClick={likedHandler} />
          ) : (
            <AiOutlineLike onClick={unLikedHandler} />
          )}
          <FcComments onClick={showClickHandler} />
        </div>

        <div
          style={{ maxHeight: '330px', overflow: 'auto', marginTop: '16px' }}
        >
          {props.comments !== undefined &&
            loadCmt &&
            props.comments.map((comment) => (
              <Comment comment={comment} key={comment.id} />
            ))}
        </div>

        {!loadCmt && (
          <div className={classes.seeMore}>
            <span onClick={() => showClickHandler()}>
              Xem thêm bình luận...
            </span>
          </div>
        )}

        <CommentDefault
          addCmt={addCmt}
          onAdd={addCmtHandler}
          onChange={changeCmtHandler}
        />
      </div>
    </>
  );
};

export default Post;

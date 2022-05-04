import React from 'react';
import classes from './PostNormal.module.css';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FcComments } from 'react-icons/fc';
import CommentNormalDefault from './CommentNormalDefault';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ListComment from '../ListComment';
import UseFocus from '../../hooks/use-focus';
import LongMenu from '../UI/Menu/LongMenu';

const PostNormal = (props) => {
  const [cmtNow, setCmtNow] = useState([]);
  const [loadCmt, setLoadCmt] = useState(false);
  const [addCmt, setAddCmt] = useState('');
  const [liked, setLiked] = useState(props.isliked);
  const idRamdom = Math.floor(Math.random() * 20) + 1;
  const [input1Ref, setInput1Focus] = UseFocus();

  const showClickHandler = () => {
    setLoadCmt(true);
    setInput1Focus();
    props.getComments(props.id);
  };

  const addCmtHandler = (e) => {
    const newCmt = {
      id: uuidv4(),
      name: 'Phuong Nam',
      body: addCmt,
      postId: props.id,
      media: `https://picsum.photos/id/${idRamdom}/200/300`,
    };

    if (e.key === 'Enter' && addCmt.length !== 0 && !loadCmt) {
      setCmtNow([...cmtNow, newCmt]);
      props.addCommentHandler(newCmt, loadCmt);
      setAddCmt('');
    }

    if (e.key === 'Enter' && addCmt.length !== 0 && loadCmt) {
      props.addCommentHandler(newCmt, loadCmt);
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
        <FcComments onClick={() => setInput1Focus()} />
      </div>
      <ListComment
        comments={props.comments}
        loadCmt={loadCmt}
        cmtNow={cmtNow}
      />

      {!loadCmt && (
        <div className={classes.seeMore}>
          <span onClick={() => showClickHandler()}>Xem thêm bình luận...</span>
        </div>
      )}

      <CommentNormalDefault
        input1Ref={input1Ref}
        addCmt={addCmt}
        onAdd={addCmtHandler}
        onChange={changeCmtHandler}
      />
    </div>
  );
};

export default PostNormal;

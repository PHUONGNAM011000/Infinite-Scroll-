import axios from 'axios';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import _uniqueId from 'lodash/uniqueId';
import { Button } from '@material-ui/core';
import DialogPost from '../components/UI/Dialog/DialogPost';
import Post from '../components/Post';
import BetterInfiniteScrollTest from '../components/BetterInfiniteScrollTest';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

function TestThere() {
  const [posts, setPosts] = useState([]);
  const [postsTemp, setPostsTemp] = useState([]);
  const [comments, setComments] = useState([]);
  const [id] = useState(_uniqueId('prefix-'));
  const [addNewPost, setAddNewPost] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [postDialog, setPostDialog] = useState({});

  const rowHeights = useRef({});

  const fetchPostsHandler = useCallback(async () => {
    // const response = await fetch(
    //   'https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5'
    // );

    // const data = await response.json();
    // const addLiked = data.map((item) => {
    //   return {
    //     ...item,
    //     isLiked: false,
    //     media: `https://picsum.photos/id/${item.id}/200/300`,
    //   };
    // });

    let addLiked = [];
    for (let i = 0; i < 5; i++) {
      addLiked.push({
        id: i + 1,
        body: lorem.generateSentences(5),
        title: lorem.generateWords(1),
        isliked: false,
        media: `https://picsum.photos/id/${i + 1}/200/300`,
      });
    }

    setPosts(addLiked);
  }, []);

  const fetchPostsTempHandler = useCallback(async () => {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    // const data = await response.json();
    // const addLiked = data.map((item) => {
    //   return {
    //     ...item,
    //     isLiked: false,
    //     media: `https://picsum.photos/id/${item.id}/200/300`,
    //   };
    // });

    let addLiked = [];
    for (let i = 5; i < 10000; i++) {
      addLiked.push({
        id: i + 1,
        body: lorem.generateSentences(5),
        title: lorem.generateWords(1),
        isliked: false,
        media: `https://picsum.photos/id/${i + 1}/200/300`,
      });
    }

    setPostsTemp(addLiked);
  }, []);

  useEffect(() => {
    fetchPostsTempHandler();
    fetchPostsHandler();
  }, [fetchPostsHandler, fetchPostsTempHandler]);

  useEffect(() => {
    if (posts.length >= 10000) {
      setHasMore(false);
    }
  }, [posts.length]);

  useEffect(() => {
    if (comments.length > 0)
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          const cmtTemp = comments.filter(
            (comment) => comment.postId === post.id
          );
          return { ...post, comments: [...cmtTemp] };
        })
      );
  }, [comments]);

  const callPost = async () => {
    let addPosts = postsTemp.slice(posts.length, posts.length + 5);

    let all = new Set([...posts, ...addPosts]);
    setPosts([...all]);
  };

  const callMoreComment = async (pageNum) => {
    const existCmt = comments.findIndex((item) => item.postId === pageNum);

    if (existCmt !== -1) {
      return;
    }

    let response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?_page=${pageNum}&_limit=5`
    );

    let cmtTemp = response.data.map((item) => {
      const idRamdom = Math.floor(Math.random() * 5) + 1;

      return { ...item, media: `https://picsum.photos/id/${idRamdom}/200/300` };
    });

    let all = new Set([...comments, ...cmtTemp]);
    setComments([...all]);
  };

  const addCommentHandler = (item) => {
    setComments((prevCmt) => [
      ...prevCmt,
      {
        ...item,
        id: id,
        name: 'Phuong Nam',
      },
    ]);
  };

  const changeLikedHandler = (id) => {
    const tempPosts = [...posts];
    const indexLiked = tempPosts.findIndex((item) => item.id === id);
    tempPosts[indexLiked].isLiked = !tempPosts[indexLiked].isLiked;
    setPosts([...tempPosts]);
  };

  const removePostHandler = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const addPostHandler = (item) => {
    setPosts((prevPosts) => {
      const tempPosts = [...prevPosts];

      tempPosts.unshift(item);

      return tempPosts;
    });
  };

  function getRowHeight(index) {
    return rowHeights.current[index] + 8 || 82;
  }

  function setRowHeight(index, size) {
    rowHeights.current = { ...rowHeights.current, [index]: size };
  }

  const RowRenderer = ({ index, style }) => {
    const { title, body, id, isliked, media, comments } = posts[index] || {};

    const rowRef = useRef({});

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight);
      }
      // eslint-disable-next-line
    }, [rowRef]);

    return (
      <div ref={rowRef} style={style}>
        <Post
          title={title}
          body={body}
          id={id}
          isliked={isliked}
          media={media}
          comments={comments}
          removePostHandler={removePostHandler}
          getComments={callMoreComment}
          addCommentHandler={addCommentHandler}
          changeLikedHandler={changeLikedHandler}
          setAddNewPost={setAddNewPost}
          setPostDialog={setPostDialog}
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <div>
        {addNewPost && (
          <DialogPost
            posts={posts}
            setPosts={setPosts}
            setAddNewPost={setAddNewPost}
            postDialog={postDialog}
            setPostDialog={setPostDialog}
            onAddPost={addPostHandler}
          />
        )}
        <Button
          fullWidth={true}
          color="primary"
          variant="contained"
          onClick={() => setAddNewPost(true)}
        >
          Thêm bài viết
        </Button>

        <BetterInfiniteScrollTest
          dataLength={posts.length}
          hasMore={hasMore}
          next={callPost}
          getRowHeight={getRowHeight}
          rowRenderer={RowRenderer}
          children={posts}
        />
      </div>
    </React.Fragment>
  );
}

export default TestThere;

import axios from 'axios';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import _uniqueId from 'lodash/uniqueId';
import { Button } from '@material-ui/core';
import DialogPost from '../components/UI/Dialog/DialogPost';
import PostList from '../components/PostList';
import InfiniteScroll from 'react-infinite-scroll-component';
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

function TestOne() {
  const [posts, setPosts] = useState([]);
  const [postsTemp, setPostsTemp] = useState([]);
  const [comments, setComments] = useState([]);
  const [id] = useState(_uniqueId('prefix-'));
  const [addNewPost, setAddNewPost] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

  useEffect(() => {
    fetchPostsTempHandler();
    fetchPostsHandler();
  }, [fetchPostsHandler, fetchPostsTempHandler]);

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

  const fetchMoreData = () => {
    const tempPosts = [...postsTemp].slice(posts.length, posts.length + 5);

    setPosts([...posts, ...tempPosts]);
  };

  const callMoreComment = async (id) => {
    const existCmt = comments.findIndex((item) => item.postId === id);

    if (existCmt !== -1) {
      return;
    }

    let response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?_page=${id}&_limit=5`
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

  return (
    <React.Fragment>
      {addNewPost && (
        <DialogPost setAddNewPost={setAddNewPost} onAddPost={addPostHandler} />
      )}
      <section>
        <Button
          fullWidth={true}
          color="primary"
          variant="contained"
          onClick={() => setAddNewPost(true)}
        >
          Thêm bài viết
        </Button>
      </section>
      <section>
        {posts.length !== 0 && (
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <section>
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              </section>
            }
          >
            <PostList
              posts={posts}
              removePostHandler={removePostHandler}
              getComments={callMoreComment}
              addCommentHandler={addCommentHandler}
              changeLikedHandler={changeLikedHandler}
            />
          </InfiniteScroll>
        )}
      </section>
    </React.Fragment>
  );
}

export default TestOne;

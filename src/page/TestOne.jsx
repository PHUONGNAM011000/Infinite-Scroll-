import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import DialogPost from '../components/UI/Dialog/DialogPost';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoremIpsum } from 'lorem-ipsum';
import PostListNormal from '../components/Normal-Test/PostListNormal';
import { useAlert } from 'react-alert';
import NavBar from '../components/NavBar/NavBar';

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
  const [addNewPost, setAddNewPost] = useState(false);
  const [addNewComment, setAddNewComment] = useState([]);
  const [count, setCount] = useState(5);
  const [counter, setCounter] = useState(5);
  const [postDialog, setPostDialog] = useState({});
  const alert = useAlert();

  const fetchPostsTempHandler = useCallback(async () => {
    let addLiked = [];
    for (let i = 0; i < 10000; i++) {
      addLiked.push({
        id: i + 1,
        body: lorem.generateSentences(5),
        title: lorem.generateWords(1),
        isliked: false,
        media: `https://picsum.photos/id/${Math.floor(
          Math.random() * 100
        )}/200/300`,
      });
    }

    setPostsTemp(addLiked);
  }, []);

  const fetchPostsHandler = useCallback(async () => {
    let addLiked = [];
    for (let i = 0; i < +count; i++) {
      addLiked.push({
        id: i + 1,
        body: lorem.generateSentences(5),
        title: lorem.generateWords(1),
        isliked: false,
        media: `https://picsum.photos/id/${i + 1}/200/300`,
      });
    }

    setPosts(addLiked);
  }, [count]);

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
    const tempPosts = [...postsTemp].slice(posts.length, posts.length + +count);

    setPosts([...posts, ...tempPosts]);
  };

  const callMoreComment = async (pageNum) => {
    const cmtNews = addNewComment.filter((item) => item.postId === pageNum);

    let response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?_page=${pageNum}&_limit=5`
    );

    let cmtTemp = response.data.map((item) => {
      const idRamdom = Math.floor(Math.random() * 5) + 1;

      return { ...item, media: `https://picsum.photos/id/${idRamdom}/200/300` };
    });

    let all = new Set([...cmtNews, ...comments, ...cmtTemp]);
    setComments([...all]);
  };

  const addCommentHandler = (item, loadCmt, cmtNow) => {
    if (loadCmt) {
      const temp = [...comments];
      temp.push(item);
      setComments(temp);
    } else {
      setAddNewComment((prevAddNewComment) => [...prevAddNewComment, item]);
    }
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

  const counterChangeHandler = () => {
    if (counter >= 5) {
      setCount(counter);
      alert.success(
        `FETCH TH??NH C??NG ! M???I L???N LOAD S??? LOAD ${counter} B??I VI???T`
      );
    } else {
      alert.error(
        `FETCH KH??NG TH??NH C??NG ! DO S??? L?????NG B??I VI???T B???N NH???P NH??? H??N 5`
      );
    }
  };

  return (
    <React.Fragment>
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

      <NavBar
        counter={counter}
        setCounter={setCounter}
        counterChangeHandler={counterChangeHandler}
        setAddNewPost={setAddNewPost}
      />

      {posts.length !== 0 && (
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <section>
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            </section>
          }
        >
          <PostListNormal
            posts={posts}
            removePostHandler={removePostHandler}
            getComments={callMoreComment}
            addCommentHandler={addCommentHandler}
            changeLikedHandler={changeLikedHandler}
            setAddNewPost={setAddNewPost}
            setPostDialog={setPostDialog}
          />
        </InfiniteScroll>
      )}
    </React.Fragment>
  );
}

export default TestOne;

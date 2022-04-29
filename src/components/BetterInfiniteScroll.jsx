import React, { useState, useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';
import { List, AutoSizer } from 'react-virtualized';
import LoadFeed from './UI/LoadFeed/LoadFeed';

const BetterInfiniteScroll = ({
  next,
  hasMore,
  onScroll,
  height,
  loader,
  dataLength,
  children,
  elementHeight,
  rowRenderer,
  setCount,
}) => {
  const [showLoader, setShowLoader] = useState(false);
  let triggered = useRef(false);
  const [show, setShow] = useState(false);
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    triggered.current = false;
    setShowLoader(false);
  }, [dataLength]);

  const props = useRef({
    next,
    hasMore,
    onScroll,
  });

  const scrollListener = (e) => {
    const { next, hasMore, onScroll } = props.current;
    if (typeof onScroll === 'function') {
      setTimeout(() => onScroll && onScroll(e), 0);
    }

    const { clientHeight, scrollHeight, scrollTop } = e;

    if (triggered.current) {
      return;
    }

    const atBottom = scrollTop + clientHeight >= (scrollHeight * 9) / 10;

    if (atBottom && hasMore) {
      triggered.current = true;
      setShowLoader(true);
      next && next();
    }
  };

  useEffect(() => {
    props.current = {
      next,
      hasMore,
      onScroll,
    };
  }, [next, hasMore, onScroll]);

  const throttleScrollListener = throttle(scrollListener, 150);

  const isLoaderVisible = showLoader && hasMore;

  const counterChangedHandler = () => {
    setCount(counter);
    setShow(true);
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
        maxWidth: '888px',
      }}
    >
      <LoadFeed
        onClick={counterChangedHandler}
        counter={counter}
        setCounter={setCounter}
      />

      {show && (
        <>
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                rowCount={children.length}
                width={width}
                height={height}
                rowHeight={elementHeight}
                rowRenderer={rowRenderer}
                overscanRowCount={5}
                onScroll={throttleScrollListener}
              />
            )}
          </AutoSizer>
          <div
            style={{
              visibility: isLoaderVisible ? 'visible' : 'hidden',
              position: isLoaderVisible ? '' : 'absolute',
              bottom: 0,
              willChange: 'scroll-position',
            }}
          >
            {loader}
          </div>
        </>
      )}
    </div>
  );
};

export default BetterInfiniteScroll;

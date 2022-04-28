import React, { useEffect, useRef } from 'react';
// import throttle from 'lodash/throttle';
import { AutoSizer } from 'react-virtualized';
import { VariableSizeList as List } from 'react-window';

const BetterInfiniteScrollTest = ({
  next,
  hasMore,
  onScroll,
  dataLength,
  rowRenderer,
  getRowHeight,
  listRef,
}) => {
  // const [showLoader, setShowLoader] = useState(false);
  let triggered = useRef(false);

  useEffect(() => {
    triggered.current = false;
    // setShowLoader(false);
  }, [dataLength]);

  const props = useRef({
    next,
    hasMore,
    onScroll,
  });

  // const scrollListener = (e) => {
  //   const { next, hasMore, onScroll } = props.current;
  //   if (typeof onScroll === 'function') {
  //     setTimeout(() => onScroll && onScroll(e), 0);
  //   }

  //   const { clientHeight, scrollHeight, scrollTop } = e;

  //   if (triggered.current) {
  //     return;
  //   }

  //   const atBottom = scrollTop + clientHeight >= (scrollHeight * 9) / 10;

  //   if (atBottom && hasMore) {
  //     triggered.current = true;
  //     setShowLoader(true);
  //     next && next();
  //   }
  // };

  useEffect(() => {
    props.current = {
      next,
      hasMore,
      onScroll,
    };
  }, [next, hasMore, onScroll]);

  // const throttleScrollListener = throttle(scrollListener, 150);

  // const isLoaderVisible = showLoader && hasMore;

  return (
    <AutoSizer
      style={{
        height: '100vh',
      }}
    >
      {({ height, width }) => (
        <List
          height={height}
          width={width}
          itemCount={dataLength}
          itemSize={getRowHeight}
          ref={listRef}
          // overscanRowCount={5}
          // onScroll={throttleScrollListener}
        >
          {rowRenderer}
        </List>
      )}
    </AutoSizer>
  );
};

export default BetterInfiniteScrollTest;

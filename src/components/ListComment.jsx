import React from 'react';
import Comment from './Comment';
import { css } from '@emotion/css';
import ScrollToBottom from 'react-scroll-to-bottom';

const ROOT_CSS = css({
  height: 300,
  marginTop: '16px',
});

const ListComment = (props) => {
  return (
    <ScrollToBottom className={ROOT_CSS}>
      <Comment
        comment={{
          media: 'https://picsum.photos/id/10/200/300',
          name: 'Tam',
          body: 'Do excepteur in laboris. Dolore tempor anim esse amet. ',
        }}
      />
      <Comment
        comment={{
          media: 'https://picsum.photos/id/20/200/300',
          name: 'Nam',
          body: 'Ea enim tempor proident aliquip consectetur labore et amet reprehenderit sit elit. ',
        }}
      />
      <Comment
        comment={{
          media: 'https://picsum.photos/id/30/200/300',
          name: 'Linh',
          body: 'Cillum reprehenderit qui do nisi tempor amet aliquip occaecat voluptate mollit labore dolor enim sint aliqua.',
        }}
      />

      {props.cmtNow.length !== 0 &&
        !props.loadCmt &&
        props.cmtNow.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}

      {props.comments !== undefined &&
        props.loadCmt &&
        props.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
    </ScrollToBottom>
  );
};

export default ListComment;

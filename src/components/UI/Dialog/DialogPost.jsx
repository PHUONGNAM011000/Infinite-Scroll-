import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function DialogPost(props) {
  const [content, setContent] = useState(props.postDialog.body || '');
  const [media, setMedia] = useState(props.postDialog.media || '');
  const [errorContent, setErrorContent] = useState(false);
  const [errorMedia, setErrorMedia] = useState(false);
  const [errorEmptyMedia, setErrorEmptyMedia] = useState(false);

  const handleClose = () => {
    props.setAddNewPost(false);
    props.setPostDialog({});
    setContent('');
    setMedia('');
  };

  const handleSave = () => {
    if (
      content === '' &&
      (media === '' || media.match(/(https?:\/\/)/i) == null)
    ) {
      setErrorContent(true);
      setErrorMedia(true);
      setErrorEmptyMedia(true);
      return;
    }

    if (content === '') {
      setErrorContent(true);
      return;
    }

    if (media === '') {
      setErrorMedia(true);
      return;
    } else if (media.match(/(https?:\/\/)/i) == null) {
      setErrorEmptyMedia(true);
      return;
    }

    if (props.postDialog.id !== undefined) {
      const tempPost = [...props.posts];
      const indexPostEdit = tempPost.findIndex(
        (item) => item.id === props.postDialog.id
      );

      tempPost[indexPostEdit] = {
        id: props.postDialog.id,
        title: props.postDialog.title,
        body: content,
        media: media,
        comments: props.postDialog.comments,
        isliked: props.postDialog.isliked,
      };

      props.setPosts(tempPost);
    } else
      props.onAddPost({
        id: 1,
        title: 'Phuong Nam',
        body: content,
        media: media,
        comments: [],
        isliked: false,
      });

    props.setAddNewPost(false);
    props.setPostDialog({});
    setContent('');
    setMedia('');
  };

  let titleDialog = 'Thêm';

  if (props.postDialog.id !== undefined) {
    titleDialog = 'Sửa';
  }

  return (
    <div>
      <Dialog onClose={handleClose} open={true}>
        <DialogTitle onClose={handleClose}>{titleDialog} Bài Viết</DialogTitle>
        <DialogContent dividers>
          <TextField
            error={errorContent}
            value={content}
            onChange={(e) => {
              setErrorContent(false);
              setContent(e.target.value);
            }}
            label="Nội dung"
            type="text"
            variant="outlined"
            fullWidth={true}
            style={{ marginBottom: '1rem' }}
            helperText={errorContent && 'Bạn chưa nhập nội dung bài viết.'}
          />
          <TextField
            error={errorMedia || errorEmptyMedia}
            value={media}
            onChange={(e) => {
              setErrorMedia(false);
              setErrorEmptyMedia(false);
              setMedia(e.target.value);
            }}
            label="Link Ảnh hoặc video"
            type="text"
            variant="outlined"
            fullWidth={true}
            helperText={
              (errorMedia && 'Bạn chưa nhập link Ảnh.') ||
              (errorEmptyMedia && 'Bạn nhập link Ảnh chưa đúng định dạng.')
            }
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Đóng
          </Button>
          <Button autoFocus onClick={handleSave} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

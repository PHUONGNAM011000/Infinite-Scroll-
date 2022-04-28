import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CustomizedDialogs from '../Dialog/DialogRemove';

const options = ['Edit', 'Remove'];

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [showDialog, setShowDialog] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    if (option === 'Remove') {
      setShowDialog(true);
      setAnchorEl(null);
      return;
    }

    if (option === 'Edit') {
      props.setPostDialog({
        id: props.id,
        title: props.title,
        body: props.body,
        media: props.media,
        comments: props.comments,
        isliked: props.isliked,
      });
      props.setAddNewPost(true);
      setAnchorEl(null);
      return;
    }
  };

  return (
    <>
      {showDialog && (
        <CustomizedDialogs
          id={props.id}
          removePostHandler={props.removePostHandler}
          setShowDialog={setShowDialog}
        />
      )}
      <IconButton
        onClick={handleClick}
        style={{ color: 'white', paddingRight: '0', paddingTop: '0' }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

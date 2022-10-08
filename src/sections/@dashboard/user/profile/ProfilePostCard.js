import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
// @mui
import {
  Box,
  Link,
  Card,
  Stack,
  Paper,
  Avatar,
  Checkbox,
  TextField,
  Typography,
  CardHeader,
  IconButton,
  AvatarGroup,
  InputAdornment,
  FormControlLabel,
  MenuItem,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
// hooks
import useAuth from '../../../../hooks/useAuth';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fShortenNumber } from '../../../../utils/formatNumber';

// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import MyAvatar from '../../../../components/MyAvatar';
import EmojiPicker from '../../../../components/EmojiPicker';
import MenuPopover from '../../../../components/MenuPopover';
// util
import axios from '../../../../utils/axios';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

ProfilePostCard.propTypes = {
  post: PropTypes.object,
};

export default function ProfilePostCard({ post }) {
  const { user } = useAuth();
  const commentInputRef = useRef(null);

  const fileInputRef = useRef(null);

  const [isLiked, setLiked] = useState(post.like.includes(user.moodleId));

  const [likes, setLikes] = useState(post.like.length);

  const [message, setMessage] = useState('');

  const hasComments = post.comment.length > 0;

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
    axios
      .post('/post/like', {
        postId: post._id['$oid'],
        moodleId: user.moodleId,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((reason) => {
        console.error(reason);
      });
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
    axios
      .post('/post/like', {
        postId: post._id['$oid'],
        moodleId: user.moodleId,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((reason) => {
        console.error(reason);
      });
  };

  const handleChangeMessage = (value) => {
    setMessage(value);
  };

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  const handleClickComment = () => {
    commentInputRef.current?.focus();
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link variant="subtitle2" color="text.primary">
            {user?.displayName}
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {fDate(post.createdAt)}
          </Typography>
        }
        action={<MoreMenuButton postId={post._id['$oid']} />}
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography>{post.message}</Typography>

        <Image alt="post media" src={post.cover?.preview} ratio="16/9" sx={{ borderRadius: 1 }} />

        <Stack direction="row" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
                checked={isLiked}
                icon={<Iconify icon={'eva:heart-fill'} />}
                checkedIcon={<Iconify icon={'eva:heart-fill'} />}
                onChange={isLiked ? handleUnlike : handleLike}
              />
            }
            label={fShortenNumber(likes)}
            sx={{ minWidth: 72, mr: 0 }}
          />
          <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
            {post.personLikes?.map((person) => (
              <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
            ))}
          </AvatarGroup>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleClickComment}>
            <Iconify icon={'eva:message-square-fill'} width={20} height={20} />
          </IconButton>
          <IconButton>
            <Iconify icon={'eva:share-fill'} width={20} height={20} />
          </IconButton>
        </Stack>

        {hasComments && (
          <Stack spacing={1.5}>
            {post.comment.map((comment) => (
              <Stack key={Math.random() * 100000} direction="row" spacing={2}>
                <Avatar alt={comment.name} src={comment.avatarUrl} />
                <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: 'background.neutral' }}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ sm: 'center' }}
                    justifyContent="space-between"
                    sx={{ mb: 0.5 }}
                  >
                    <Typography variant="subtitle2">{comment.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      {fDate(comment.postedAt)}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {comment.message}
                  </Typography>
                </Paper>
              </Stack>
            ))}
          </Stack>
        )}

        <Stack direction="row" alignItems="center">
          <MyAvatar />
          <TextField
            fullWidth
            size="small"
            value={message}
            inputRef={commentInputRef}
            placeholder="Write a comment…"
            onChange={(event) => handleChangeMessage(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClickAttach}>
                    <Iconify icon={'ic:round-add-photo-alternate'} width={24} height={24} />
                  </IconButton>
                  <EmojiPicker alignRight value={message} setValue={setMessage} />
                </InputAdornment>
              ),
            }}
            sx={{
              ml: 2,
              mr: 1,
              '& fieldset': {
                borderWidth: `1px !important`,
                borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
              },
            }}
          />
          <IconButton>
            <Iconify icon={'ic:round-send'} width={24} height={24} />
          </IconButton>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
        </Stack>
      </Stack>
    </Card>
  );
}

// ------------------------------------------------------------------------------
MoreMenuButton.propTypes = {
  postId: PropTypes.string,
};

function MoreMenuButton({ postId }) {
  const [open, setOpen] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { push, reload } = useRouter();
  const linkTo = `${PATH_DASHBOARD.blog.root}/post/edit/${postId}`;
  // --------------------------------------------------------------------------
  const postDeleteHandler = async () => {
    try {
      axios
        .post('/delete-post', {
          id: postId,
        })
        .then((response) => {
          if (response.status === 200) {
            enqueueSnackbar('Post deleted');
            reload();
          }
          if (response.status === 201) {
            enqueueSnackbar("Couldn't found the post.", {
              variant: 'error',
            });
          }
          if (response.status === 500) {
            enqueueSnackbar('Sorry an error has been occurred.', {
              variant: 'error',
            });
          }
        });
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
    }
  };

  // --------------------------------------------------------------------------
  const postEditHadler = () => {
    push(linkTo);
  };
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton size="large" onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem onClick={postEditHadler}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <FormDialogs postDeleteHandler={postDeleteHandler} />
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

FormDialogs.propTypes = {
  postDeleteHandler: PropTypes.func,
};

function FormDialogs({ postDeleteHandler }) {
  const [open, setOpen] = useState(false);
  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const deletePost = () => {
    postDeleteHandler();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem sx={{ color: 'error.main' }} onClick={handleClickOpen}>
        <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
        Delete
      </MenuItem>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post?
            <br /> Action cannot be reverted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={deletePost} variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

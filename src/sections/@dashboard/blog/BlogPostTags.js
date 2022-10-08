import PropTypes from 'prop-types';
// @mui
import { Box, Checkbox, FormControlLabel } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import axios from '../../../utils/axios';
// components
import Iconify from '../../../components/Iconify';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';

// ----------------------------------------------------------------------

BlogPostTags.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostTags({ post }) {
  const { user } = useAuth();

  const [isLiked, setLiked] = useState(post.like.includes(user.moodleId));
  const [isBookmarked, setBookmarked] = useState(user.bookmark.includes(post._id['$oid']));

  const [likes, setLikes] = useState(post.like.length);

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

  const handleBookmark = () => {
    setBookmarked(true);
    axios
      .post('/post/bookmark', {
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

  const handleUnBookmark = () => {
    setBookmarked(false);
    axios
      .post('/post/bookmark', {
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

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={isLiked}
              onChange={isLiked ? handleUnlike : handleLike}
              color="error"
              icon={<Iconify icon="eva:heart-fill" />}
              checkedIcon={<Iconify icon="eva:heart-fill" />}
            />
          }
          label={fShortenNumber(likes)}
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={isBookmarked}
              onChange={isBookmarked ? handleUnBookmark : handleBookmark}
              color="success"
              icon={<Iconify icon="eva:bookmark-outline" />}
              checkedIcon={<Iconify icon="eva:bookmark-fill" />}
            />
          }
          label={'Bookmark'}
        />
      </Box>
    </Box>
  );
}

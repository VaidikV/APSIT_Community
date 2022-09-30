import PropTypes from 'prop-types';
// @mui
import { Box, Checkbox, FormControlLabel } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import axios from '../../../utils/axios';
// components
import Iconify from '../../../components/Iconify';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

BlogPostTags.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostTags({ post }) {
  const { user } = useAuth();

  const { like, _id } = post;

  const likeHandler = async () => {
    try {
      await axios.post('/like', { moodleId: user.moodleId, postId: _id['$oid'] });
    } catch (e) {
      console.error(e.message);
    }
  };

  const bookmarkHandler = async () => {
    try {
      await axios.post('/bookmark', { moodleId: user.moodleId, postId: _id['$oid'] });
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              onChange={likeHandler}
              color="error"
              icon={<Iconify icon="eva:heart-fill" />}
              checkedIcon={<Iconify icon="eva:heart-fill" />}
            />
          }
          label={fShortenNumber(like)}
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              onChange={bookmarkHandler}
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

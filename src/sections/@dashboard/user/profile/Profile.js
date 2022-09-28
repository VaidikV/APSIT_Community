import PropTypes from 'prop-types';
// @mui
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
//
import ProfileAbout from './ProfileAbout';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileSocialInfo from './ProfileSocialInfo';

// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
  loading: PropTypes.bool,
};

export default function Profile({ myProfile, posts, loading }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileAbout profile={myProfile} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <Typography>My Posts</Typography>
          {loading && <CircularProgress />}
          {posts && !loading && posts.map((post) => <ProfilePostCard key={post._id['$oid']} post={post} />)}
          {!loading && !posts.length && <Typography variant={'body1'}>No posts found!</Typography>}
        </Stack>
      </Grid>
    </Grid>
  );
}

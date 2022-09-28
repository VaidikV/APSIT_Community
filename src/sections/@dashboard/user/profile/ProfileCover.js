import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// utils
import cssStyles from '../../../../utils/cssStyles';

// components
import MyAvatar from '../../../../components/MyAvatar';
import Image from '../../../../components/Image';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

ProfileCover.propTypes = {
  myProfile: PropTypes.object,
};

export default function ProfileCover({ myProfile }) {
  const { displayName, year, branch } = myProfile;

  return (
    <RootStyle>
      <InfoStyle>
        <MyAvatar
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h4">{displayName}</Typography>
          <Typography sx={{ opacity: 0.72 }}>{year + ' ' + branch} Student</Typography>
        </Box>
      </InfoStyle>
      <Image
        alt="profile cover"
        src={
          'https://images.unsplash.com/photo-1625139107083-43dd2344243b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
        }
        sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </RootStyle>
  );
}

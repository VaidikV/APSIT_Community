import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  profile: PropTypes.object,
};

export default function ProfileAbout({ profile }) {
  const { displayName, year, branch, div, rollNumber, moodleId, email, about } = profile;

  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{about || 'Kar kuchh aisa, Duniya banana chahe tere jaisa'}</Typography>

        <Stack direction="row">
          <IconStyle icon="ic:twotone-drive-file-rename-outline" />
          <Typography variant="body2">
            Name &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {displayName}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon="icon-park-twotone:branch" />
          <Typography variant="body2">
            Branch &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {branch}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon="icon-park-twotone:branch-one" />
          <Typography variant="body2">
            Div &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {div}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon="ic:twotone-numbers" />
          <Typography variant="body2">
            Roll no. &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {rollNumber}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon="carbon:increase-level" />
          <Typography variant="body2">
            Year &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {year}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon="icon-park-twotone:id-card" />
          <Typography variant="body2">
            MoodleID &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {moodleId}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'eva:email-fill'} />
          <Typography variant="body2">
            Email &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {email}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

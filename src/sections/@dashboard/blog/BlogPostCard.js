import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { Box, Card, Typography, CardContent, Link, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/Iconify';
import TextMaxLine from '../../../components/TextMaxLine';
import SvgIconStyle from '../../../components/SvgIconStyle';
import TextIconLabel from '../../../components/TextIconLabel';

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ post }) {
  const { title, _id, view, comment, share, author, createdAt } = post;

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: 'absolute',
            color: 'background.paper',
          }}
        />
      </Box>

      <PostContent
        title={title}
        id={_id['$oid']}
        name={author?.name}
        view={view}
        comment={comment.length}
        share={share}
        createdAt={createdAt}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

PostContent.propTypes = {
  comment: PropTypes.number,
  createdAt: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  share: PropTypes.number,
  like: PropTypes.number,
  id: PropTypes.any,
  title: PropTypes.string,
  view: PropTypes.number,
};

export function PostContent({ title, id, name, comment, like, createdAt }) {
  const linkTo = `${PATH_DASHBOARD.blog.root}/post/${id}`;
  const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: like, icon: 'eva:heart-fill' },
  ];

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
      }}
    >
      <Typography>{name}</Typography>
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
        }}
      >
        {fDate(createdAt)}
      </Typography>

      <NextLink href={linkTo} passHref>
        <Link color="inherit">
          <TextMaxLine variant={'subtitle2'} line={2} persistent>
            {title}
          </TextMaxLine>
        </Link>
      </NextLink>

      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          color: 'text.disabled',
        }}
      >
        {POST_INFO.map((info, index) => (
          <TextIconLabel
            key={index}
            icon={<Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />}
            value={fShortenNumber(info.number)}
            sx={{ typography: 'caption', ml: index === 0 ? 0 : 1.5 }}
          />
        ))}
      </Stack>
    </CardContent>
  );
}

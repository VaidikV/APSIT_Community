import orderBy from 'lodash/orderBy';
import { useState } from 'react';

// @mui
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// utils

// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import { SkeletonPostItem } from '../../../components/skeleton';
// sections
import { NewsPostCard } from '../../../sections/@dashboard/news';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

NewsPosts.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }
  if (sortBy === 'popular') {
    return orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};

export default function NewsPosts() {
  const { themeStretch } = useSettings();

  const posts = [
    {
      id: 'dfsadfdsafdsadsafsdafds',
      cover: '/news/1.jpeg',
      title: 'Welcome, AI-ML club🎉',
      view: 0,
      comment: 0,
      share: 0,
      author: 'Sana Sheikh',
      createdAt: new Date().toDateString(),
    },
    {
      id: 'dfsadfdsafssadsafsdafds',
      cover: '/news/2.jpeg',
      title: 'OP DevOps😎',
      view: 0,
      comment: 0,
      share: 0,
      author: 'Sana Sheikh',
      createdAt: new Date().toDateString(),
    },
    {
      id: 'dfsadfdsafddfdsfdsffds',
      cover: '/news/3.jpeg',
      title: 'Distribution of sanitary napkins in Sharda Vidyalaya.',
      view: 0,
      comment: 0,
      share: 0,
      author: 'Sana Sheikh',
      createdAt: new Date().toDateString(),
    },
  ];
  //
  // const isMountedRef = useIsMountedRef();
  //
  // const [posts, setPosts] = useState([]);
  //
  const [filters, setFilters] = useState('latest');
  //
  const sortedPosts = applySort(posts, filters);
  //
  // const getAllPosts = useCallback(async () => {
  //   try {
  //     const response = await axios.get('https://minimal-assets-api.vercel.app/api/blog/posts/all');
  //
  //     console.log(response);
  //     if (isMountedRef.current) {
  //       setPosts(response.data.posts.filter((element, idx) => idx < 3));
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [isMountedRef]);
  //
  // useEffect(() => {
  //   getAllPosts();
  // }, [getAllPosts]);

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="News"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'All news' }]}
        />
        <Grid container spacing={3}>
          {(!posts.length ? [...Array(3)] : sortedPosts).map((post, index) =>
            post ? (
              <Grid key={post.id} item xs={12}>
                <NewsPostCard post={post} index={index} />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          )}
        </Grid>
      </Container>
    </Page>
  );
}

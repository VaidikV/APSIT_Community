import { useEffect, useState, useCallback } from 'react';
import { sentenceCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Card, Divider, Container, Typography, Pagination } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// utils
import axios from '../../../../utils/axios';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import Markdown from '../../../../components/Markdown';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { SkeletonPost } from '../../../../components/skeleton';
// sections
import {
  BlogPostHero,
  BlogPostTags,
  BlogPostCommentForm,
  BlogPostCommentList,
} from '../../../../sections/@dashboard/blog';

// ----------------------------------------------------------------------

BlogPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function BlogPost() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const { query } = useRouter();

  const { id } = query;

  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);
  const [comment, setComment] = useState(['Hi']);
  console.log(post);
  const getPost = useCallback(async () => {
    try {
      const response = await axios.get('/post', {
        params: { id },
      });

      if (isMountedRef.current) {
        setPost(response.data.post);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }, [isMountedRef, id]);

  // const getRecentPosts = useCallback(async () => {
  //   try {
  //     const response = await axios.get('/api/blog/posts/recent', {
  //       params: { id },
  //     });
  //
  //     if (isMountedRef.current) {
  //       setRecentPosts(response.data.recentPosts);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [isMountedRef, id]);

  useEffect(() => {
    getPost();
    // getRecentPosts();
  }, [getPost]);

  const onComment = (value) => {
    setComment((prevState) => [...prevState, value.comment]);
  };

  return (
    <Page title="Blog: Post Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Post Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: sentenceCase(post?.title || 'Fetching') },
          ]}
        />

        {post && (
          <Card>
            <BlogPostHero post={post} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {post.description}
              </Typography>

              <Markdown children={post.content} />

              <Box sx={{ my: 5 }}>
                <Divider />
                <BlogPostTags post={post} />
                <Divider />
              </Box>

              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography variant="h4">Comments</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  ({comment.length || 0})
                </Typography>
              </Box>

              {/*<BlogPostCommentList post={post} />*/}
              {comment.map((comment, index) => (
                <Typography key={index} mb={2}>
                  {comment}
                </Typography>
              ))}

              {/*<Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>*/}
              {/*  <Pagination count={8} color="primary" />*/}
              {/*</Box>*/}

              <BlogPostCommentForm onComment={onComment} />
            </Box>
          </Card>
        )}

        {!post && !error && <SkeletonPost />}

        {error && <Typography variant="h6">404 {error}!</Typography>}
      </Container>
    </Page>
  );
}

// ---------------------------------------------------------------------
import useSettings from '../../../../../hooks/useSettings';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from '../../../../../utils/axios';
import HeaderBreadcrumbs from '../../../../../components/HeaderBreadcrumbs';
import { Container, Typography } from '@mui/material';
import Page from '../../../../../components/Page';
import { sentenceCase } from 'change-case';
import { PATH_DASHBOARD, PATH_PAGE } from '../../../../../routes/paths';
import { BlogNewPostForm } from '../../../../../sections/@dashboard/blog';
import Layout from '../../../../../layouts';
import useAuth from '../../../../../hooks/useAuth';
import { SkeletonNewPostForm } from '../../../../../components/skeleton';

// ----------------------------------------------------------------------

EditPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EditPost() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  const { push } = useRouter();
  const { query } = useRouter();
  const { id } = query;
  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/post', {
        params: { id },
      })
      .then((response) => {
        if (response.status === 200) {
          setPost(response.data.post);
        }

        if (post?.author.moodleId !== user.moodleId) {
          push(PATH_PAGE.page401);
        }

        if (response.data.post.length === 0) {
          setError('No post found');
        }
      })
      .catch((error) => {
        setError("The requested post doesn't exist");
      });
  }, []);

  return (
    <Page title="Blog: Post Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {!post && !error && <SkeletonNewPostForm />}
        {post?.author.moodleId === user.moodleId && (
          <>
            <HeaderBreadcrumbs
              heading="Post Details"
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                {
                  name: 'Blog',
                  href: PATH_DASHBOARD.blog.root,
                },
                { name: sentenceCase(post?.title || 'Fetching') },
                { name: 'Edit' },
              ]}
            />{' '}
            <BlogNewPostForm isEdit={true} post={post} />
          </>
        )}
        {error && <Typography variant="h6">404 {error}!</Typography>}
      </Container>
    </Page>
  );
}

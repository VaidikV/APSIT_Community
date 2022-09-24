// ---------------------------------------------------------------------
import useSettings from '../../../../../hooks/useSettings';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from '../../../../../hooks/useIsMountedRef';
import axios from '../../../../../utils/axios';
import HeaderBreadcrumbs from '../../../../../components/HeaderBreadcrumbs';
import { Container, Typography } from '@mui/material';
import Page from '../../../../../components/Page';
import { sentenceCase } from 'change-case';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
import { BlogNewPostForm } from '../../../../../sections/@dashboard/blog';
import Layout from '../../../../../layouts';

// ----------------------------------------------------------------------

EditPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EditPost() {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { id } = query;
  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);
  const isMountedRef = useIsMountedRef();

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get('/post', {
        params: { id },
      });

      console.log(response.data.post);
      if (isMountedRef.current) {
        setPost(response.data.post);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }, [isMountedRef, id]);

  useEffect(() => {
    getPost();
  });

  return (
    <Page title="Blog: Post Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Post Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: sentenceCase(post?.title || 'Fetching') },
            { name: 'Edit' },
          ]}
        />

        <BlogNewPostForm isEdit={true} post={post} />
        {error && <Typography variant="h6">404 {error}!</Typography>}
      </Container>
    </Page>
  );
}

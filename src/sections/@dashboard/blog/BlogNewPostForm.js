import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Stack, Button, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//components
import { RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';
//
import BlogNewPostPreview from './BlogNewPostPreview';
import axios from '../../../utils/axios';
import useAuth from '../../../hooks/useAuth';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

BlogNewPostForm.propTypes = {
  isEdit: PropTypes.bool,
  post: PropTypes.object,
};

export default function BlogNewPostForm({ isEdit, post }) {
  const { push } = useRouter();

  const [open, setOpen] = useState(false);

  const { user } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
    content: Yup.string().min(100).required('Content is required'),
    cover: Yup.mixed(),
  });

  const defaultValues = {
    view: 0,
    comment: [],
    share: 0,
    like: [],
    author: {
      name: user.displayName,
      moodleId: user.moodleId,
      avatarUrl: user.avatarUrl,
    },
    createdAt: new Date(),
    title: '',
    description: '',
    content: '',
    cover: null,
    tags: [],
    publish: true,
    comments: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
    ...post,
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const onSubmit = async (postData) => {
    try {
      await axios.post(isEdit ? '/edit-post' : '/create-post', { id: post?._id['$oid'], ...postData });
      reset();
      handleClosePreview();
      enqueueSnackbar(isEdit ? 'Post updated successfully' : 'Created new post successfully!');
      push(PATH_DASHBOARD.general.app);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const reader = new FileReader();
      reader.onload = function (e) {
        if (file) {
          setValue(
            'cover',
            Object.assign(file, {
              preview: e.target.result,
            })
          );
        }
      };
      reader.readAsDataURL(file);
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="Post Title" />

                <RHFTextField name="description" label="Description" multiline rows={3} />

                <div>
                  <LabelStyle>Content</LabelStyle>
                  <RHFEditor name="content" />
                </div>

                <div>
                  <LabelStyle>Cover</LabelStyle>
                  <RHFUploadSingleFile name="cover" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button fullWidth color="inherit" variant="outlined" size="large" onClick={handleOpenPreview}>
                Preview
              </Button>
              <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                Post
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>

      <BlogNewPostPreview
        values={values}
        isOpen={open}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
}

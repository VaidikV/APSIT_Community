import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
// utils
import { fData } from '../../../../utils/formatNumber';
// components
import { FormProvider, RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    year: Yup.string().required('Please select any option'),
    branch: Yup.string().required('Please select any option'),
    div: Yup.string()
      .uppercase()
      .required('Div is required')
      .matches(/^[A-Za-z]$/, 'Enter valid div'),
    rollNumber: Yup.string()
      .required('Roll number is required')
      .matches(/^[0-9]+$/, 'Only numbers are allowed')
      .max(3, 'Must be less than 4 digit'),
    avatarUrl: Yup.string,
    isPublic: Yup.bool,
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    about: Yup.string(),
  });

  const defaultValues = {
    moodleId: user.moodleId,
    firstName: user.firstName,
    lastName: user.lastName,
    year: user.year,
    branch: user.branch,
    div: user.div,
    rollNumber: user.rollNumber,
    isPublic: user.isPublic,
    email: user.email,
    avatarUrl: user.avatarUrl,
    about: user.about,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      // profileData is not working its returning empty object. That's why we are using values
      const values = watch();
      console.log(values);
      await axios.post('/update-user', {
        ...values,
        displayName: values.firstName + ' ' + values.lastName,
        avatarUrl: user.avatarUrl.preview,
      });
      enqueueSnackbar('Updated profile successfully!');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error has occurred. Please try again', {
        variant: 'error',
      });
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const reader = new FileReader();
      reader.onload = function (e) {
        if (file) {
          setValue(
            'avatarUrl',
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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="avatarUrl"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />

            <RHFSwitch name="isPublic" labelPlacement="start" label="Public Profile" sx={{ mt: 5 }} />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <RHFTextField name="firstName" label="First name" />
                <RHFTextField name="lastName" label="Last name" />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <RHFSelect name="year" label="Year" placeholder="Year">
                  <option value="" />
                  {['FE', 'SE', 'TE', 'BE'].map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect name="branch" label="Branch" placeholder="Branch">
                  <option value="" />
                  {['COMP', 'ELTC', 'IT', 'MECH', 'CIVL'].map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
                <RHFTextField name="div" label="Div" />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <RHFTextField name="rollNumber" label="Roll Number" />
              </Stack>
              <RHFTextField name="email" label="Email address" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="about" multiline rows={4} label="About" />

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

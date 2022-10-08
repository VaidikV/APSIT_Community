import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
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

    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    moodleId: Yup.string()
      .required('Moodle ID is required')
      .matches(/^[0-9]+$/, 'Only digits are allowed')
      .min(8, 'Must be exactly 8 digits')
      .max(8, 'Must be exactly 8 digits'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    year: '',
    branch: '',
    div: '',
    rollNumber: '',
    moodleId: '',
    email: '',
    password: '',
    bookmark: [],
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await register({ ...data, bookmark: [] });
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit?.message}</Alert>}

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
          <RHFTextField name="moodleId" label="MoodleID" />
        </Stack>
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { confirmRegistration, checkTokenValidation } from 'src/api/auth';

import FormProvider, { RHFCheckbox, RHFTextField } from 'src/components/hook-form';

import { RegisterConfirmSchema } from './jwt/schema';

export const defaultValues = {
  firstName: '',
  lastName: '',
  callPhone: '',
  company: '',
  password: '',
  confirmPassword: '',
  term1: false,
  term2: false,
};

export default function ConfirmRegisterView() {
  const router = useRouter();
  const location = useLocation();
  const [userId, setUserId] = useState(null);

  const methods = useForm({
    resolver: yupResolver(RegisterConfirmSchema),
    defaultValues,
  });

  const { handleSubmit, setValue } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const params = { userId, ...data };
    try {
      await confirmRegistration(params)
        .then((res) => {
          alert(res.message);
          router.push(paths.auth.jwt.login);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token') || '';
    checkTokenValidation(token)
      .then((res) => {
        if (res.status === 200) {
          const { id, call_phone, first_name, last_name, company_name } = res.data;

          setValue('firstName', first_name);
          setValue('lastName', last_name);
          setValue('company', company_name);
          setValue('callPhone', call_phone);
          setUserId(id);
        }
      })
      .catch((error) => {
        router.push('/');
        console.log(error?.message);
      });
  });
  return (
    <Stack spacing={5}>
      <Stack spacing={3.5}>
        <Stack spacing={2} sx={{ mb: 1, position: 'relative' }} alignItems="center">
          <Typography variant="h4">Confirm Registration</Typography>
          <Typography>Submit your details</Typography>
        </Stack>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={10} sx={{ width: 1, mb: 3 }} direction="row">
            <RHFTextField
              disabled
              name="firstName"
              label="First Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PermIdentityIcon />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              disabled
              name="lastName"
              label="Last Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PermIdentityIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack spacing={10} sx={{ width: 1, mb: 3 }} direction="row">
            <RHFTextField
              disabled
              name="callPhone"
              label="Call Phone"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalPhoneOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              disabled
              name="company"
              label="Company"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack spacing={10} sx={{ width: 1, mb: 3 }} direction="row">
            <RHFTextField
              type="password"
              label="Password"
              name="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <RHFCheckbox
              size="medium"
              name="term1"
              label={
                <Stack direction="row">
                  <Typography
                    variant="caption"
                    sx={{ textAlign: 'left', color: 'text.disabled', fontSize: '15px' }}
                  >
                    I confirm that i have read and understood the platform’s
                  </Typography>
                  <Link style={{ color: '#69ADFF' }}>Terms of use</Link>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '15px' }}>
                    and
                  </Typography>
                  <Link style={{ color: '#69ADFF' }}>privacy policy</Link>
                </Stack>
              }
            />
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <RHFCheckbox
              size="medium"
              name="term2"
              label={
                <Stack direction="row">
                  <Typography
                    variant="caption"
                    sx={{ textAlign: 'left', color: 'text.disabled', fontSize: '15px' }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing and
                  </Typography>
                </Stack>
              }
            />
          </Stack>
          <Stack sx={{ marginLeft: '1px', marginTop: '20px' }}>
            <ReCAPTCHA theme="light" sitekey="Your client site key" />
          </Stack>
          <Stack
            direction="row"
            gap={25}
            sx={{ justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}
          >
            <Stack direction="row" gap={2}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                style={{ width: '120px' }}
              >
                Send
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Stack>
    </Stack>
  );
}

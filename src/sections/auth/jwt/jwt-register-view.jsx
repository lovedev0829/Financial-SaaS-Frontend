import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import 'react-international-phone/style.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useParams } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_REGISTER } from 'src/config-global';

import CustomizedSteppers from 'src/components/stepper-view/customized-steppers';
import FormProvider, { RHFCheckbox, RHFTextField } from 'src/components/hook-form';

import { RegisterSchema } from './schema';

export default function JwtRegisterView() {
  const { register } = useAuthContext();
  const [notification, setNotification] = useState(false);
  const [notificationMessageBox, setNotificationMessageBox] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { companyRole } = params;

  const defaultValues = {
    firstName: '',
    lastName: '',
    callPhone: '',
    company: '',
    email: '',
    site: '',
    cnpj: '',
    message: '',
    term1: false,
    term2: false,
  };
  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.({ ...data, companyRole });
      router.push(PATH_AFTER_REGISTER);
    } catch (error) {
      setNotificationMessageBox(typeof error === 'string' ? error : error.message);
      setNotification(true);
    }
  });

  const loginRouter = (e) => {
    e.preventDefault();
    router.push(paths.auth.jwt.login);
  };

  useEffect(() => {
    const roles = ['issuer', 'distributor'];
    if (!roles.includes(companyRole)) {
      router.push(paths.auth.selectProfile);
    }
  }, [companyRole, router]);

  return (
    <Stack spacing={5}>
      <CustomizedSteppers activeStep={1} />
      <Stack spacing={3.5}>
        <Stack spacing={2} sx={{ mb: 1, position: 'relative' }} alignItems="center">
          <Typography variant="h4">Register</Typography>
          <Typography>Submit your details</Typography>
        </Stack>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={10} sx={{ width: 1, mb: 3 }} direction="row">
            <RHFTextField
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
            <Stack sx={{ width: 1 }}>
              <RHFTextField
                name="callPhone"
                label="Call Phone"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <RHFTextField
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
              label="Email"
              name="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              label="Confirm Email"
              name="confirmEmail"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack spacing={10} sx={{ width: 1, mb: 3 }} direction="row">
            <RHFTextField
              label="CNPJ"
              name="cnpj"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              label="Site"
              name="site"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LanguageOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack sx={{ width: 1, mb: 3 }}>
            <RHFTextField label="Message" name="message" multiline rows={6} />
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
            <ReCAPTCHA theme="light" sitekey="6LdFP-cpAAAAALlMed_fhe3BKr1iyYRgdS84x24E" />
          </Stack>
          <Stack
            direction="row"
            gap={25}
            sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 2 }}
          >
            <Stack direction="row" gap={1}>
              <Typography>Already have an account ?</Typography>
              <Link
                component={RouterLink}
                onClick={loginRouter}
                variant="subtitle2"
                style={{ color: '#69ADFF' }}
              >
                Login
              </Link>
            </Stack>
            <Stack direction="row" gap={2}>
              <Button
                variant="outlined"
                color="primary"
                endIcon={<ArrowBackOutlinedIcon />}
                sx={{ justifyContent: 'unset' }}
                onClick={router.back}
              />
              <LoadingButton
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                style={{ width: '120px' }}
                loading={isSubmitting}
              >
                Next
              </LoadingButton>
            </Stack>
          </Stack>
        </FormProvider>
        <Snackbar
          open={notification}
          autoHideDuration={1200}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
            {notificationMessageBox}
          </Alert>
        </Snackbar>
      </Stack>
    </Stack>
  );
}

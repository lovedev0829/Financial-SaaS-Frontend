import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import FormProvider, { RHFTextField } from 'src/components/hook-form';
import CustomizedSteppers from 'src/components/stepper-view/customized-steppers';

import { FormSchema } from './schema';

export const defaultValues = {
  firstName: '',
  lastName: '',
  callPhone: '',
  company: '',
  email: '',
  confirmEmail: '',
  site: '',
  message: '',
};

export default function JwtRegisterView() {
  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const handleNextStep = (e) => {
    e.preventDefault();
    router.push(paths.auth.confirmProfile);
  };
  const loginRouter = (e) => {
    e.preventDefault();
    router.push(paths.auth.jwt.login);
  };
  return (
    <Stack spacing={5}>
      <CustomizedSteppers activeStep={1} />
      <Stack spacing={3.5}>
        <Stack spacing={2} sx={{ mb: 1, position: 'relative' }} alignItems="center">
          <Typography variant="h4">Register</Typography>
          <Typography>Submit your details</Typography>
        </Stack>
        <FormProvider methods={methods}>
          <Stack spacing={10} sx={{ width: 1, mb: 3 }} direction="row">
            <RHFTextField
              name="firstname"
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
              name="lastname"
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
              name="callphone"
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
          <Stack sx={{ width: 1, mb: 3 }}>
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
            <Checkbox size="medium" />
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
          <Stack direction="row" alignItems="center" gap={1}>
            <Checkbox size="medium" />
            <Typography
              variant="caption"
              sx={{ textAlign: 'left', color: 'text.disabled', fontSize: '15px' }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing and
            </Typography>
          </Stack>
          <Stack sx={{ marginLeft: '1px', marginTop: '20px' }}>
            <ReCAPTCHA theme="light" sitekey="Your client site key" />
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
              <Button
                size="large"
                variant="contained"
                color="primary"
                endIcon={<ArrowRightAltIcon />}
                style={{ width: '120px' }}
                onClick={handleNextStep}
              >
                Next
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Stack>
    </Stack>
  );
}

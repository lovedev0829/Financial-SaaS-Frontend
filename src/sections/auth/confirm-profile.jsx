import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { AuthContext } from 'src/auth/context/jwt';

import CustomizedSteppers from 'src/components/stepper-view/customized-steppers';

export default function ConfirmProfileView() {
  const { companyProspect } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (companyProspect === null || companyProspect === undefined) {
      router.push('/');
    } else {
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [companyProspect, router]);

  return (
    <Stack spacing={7}>
      <CustomizedSteppers activeStep={3} />
      <Stack spacing={3.5}>
        <Stack spacing={2} sx={{ mb: 1, position: 'relative' }} alignItems="center">
          <Typography variant="h3">Confirmation</Typography>
          <Typography>Confirmation message</Typography>
        </Stack>
      </Stack>
      <Stack alignItems="center" gap={3} textAlign="center">
        <Box
          component="img"
          alt="auth"
          src="/assets/illustrations/confirm.png"
          spacing={10}
          sx={{
            width: '256.9px',
            height: '233px',
          }}
        />
        <Typography variant="h3">Thank You </Typography>
        <Typography>
          Your profile request has been submitted successfully. We will contact you shortly.
        </Typography>
        <Typography>
          In the mean time you can see our <Link style={{ color: '#69ADFF' }}>Info hub</Link>
        </Typography>
      </Stack>
    </Stack>
  );
}

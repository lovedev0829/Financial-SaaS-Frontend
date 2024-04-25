import { useState } from 'react';

import { Box } from '@mui/material';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import CustomizedSteppers from 'src/components/stepper-view/customized-steppers';

const activeStyle = {
   border: '2px solid #69ADFF'
};

const inactiveStyle = {
   border: '2px solid #d5d5d5'
};

const StyledBox = styled(Box)({
  borderRadius: '12px',
  width: "300px",
  padding: '12px',
  justifyContent: 'left',
  '&:hover': { activeStyle },
});

export default function SelectProfileView() {

  const router = useRouter();
  const [issuer, setIssuer]  = useState(false);
  const [distributor, setDistributor]  = useState(false);
  const [profileAlert, setProfileAlert] = useState(false);
  const handleChange = (event) => {
      if(event.target.value === 'issuer') {
         setDistributor(false);
         setIssuer(true);
      } else {
         setIssuer(false);
         setDistributor(true);
      }
  };

  const handleNextStep = () => {
      if(issuer === true || distributor === true){
         router.push(paths.auth.jwt.register)
      } else {
         setProfileAlert(true);
      }
  }

  return (
   <>
      <Stack spacing={10} >
         <CustomizedSteppers activeStep={0} />
         <Stack spacing={3.5}>
               <Stack spacing={2} sx={{ mb: 5, position: 'relative' }} alignItems='center'>
               <Typography variant="h4">Select Profile</Typography>
               <Typography>Choose your profile from below</Typography>
               </Stack>
               <Stack direction={{ xs: 'column', sm: 'row' }} spacing={5}>
               <StyledBox style={issuer ? activeStyle : inactiveStyle}>
                     <FormControl component="fieldset">
                     <FormControlLabel
                        key='profile'
                        value='0'
                        label='Issuer'
                        control={<Radio size="medium" value='issuer' checked={issuer} onChange={handleChange} />}
                        sx={{ textTransform: 'capitalize' }}
                     />
                     </FormControl>
                     <Typography>Small details about this Issuer account</Typography>
               </StyledBox>
               <StyledBox style={distributor ? activeStyle : inactiveStyle}>
                  <FormControl component="fieldset">
                     <FormControlLabel
                        key='profile'
                        value='1'
                        label='Distributor'
                        control={<Radio size="medium" value='distributor' checked={distributor} onChange={handleChange} />}
                        sx={{ textTransform: 'capitalize' }}
                     />
                     </FormControl>
                     <Typography>Small details about this Issuer account</Typography>
               </StyledBox>
               </Stack>
         </Stack>
      </Stack>
      <Stack position='absolute' style={{bottom:100}} direction='row' gap={30} alignItems="baseline">
         <Stack direction='row' gap={1}>
            <Typography>Already have an account ?</Typography>
            <Link component={RouterLink} href={paths.auth.jwt.login} variant="subtitle2" color="primary">
               Login
            </Link>
         </Stack>
         <Button  size="large" variant="contained" color="primary" endIcon={<ArrowRightAltIcon/>} style={{ width: "120px" }} onClick={handleNextStep}>
            Next
         </Button>
      </Stack>
      <Snackbar open={profileAlert}   autoHideDuration={1200} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Please choose profile you wanna register
        </Alert>
      </Snackbar>
   </>
  );
}

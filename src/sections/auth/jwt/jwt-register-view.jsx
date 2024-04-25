
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from "react-google-recaptcha";
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

import FormProvider, {
   RHFTextField,
 } from 'src/components/hook-form';
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
      e.preventDefault()
      router.push(paths.auth.confirmProfile);
   }
   const loginRouter = (e) => {
      e.preventDefault()
      router.push(paths.auth.jwt.login);
   }
  return (
   <Stack spacing={10} >
         <CustomizedSteppers activeStep={1} />
         <Stack spacing={3.5}>
               <Stack spacing={2} sx={{ mb: 1, position: 'relative' }} alignItems='center'>
                  <Typography variant="h4">Register</Typography>
                  <Typography>Submit your details</Typography>
               </Stack>
              <FormProvider methods={methods}>
               <Stack spacing={10} sx={{ width: 1, mb: 2 }} direction='row'  >
                  <Block>
                     <Typography variant="caption" sx={{ textAlign: 'left', color: 'text.disabled', fontSize: "15px"}} >
                        First Name
                     </Typography>
                     <RHFTextField name="firstname" 
                        InputProps={{
                           startAdornment: <InputAdornment position="start"><PermIdentityIcon/></InputAdornment>,
                        }}
                     />
                  </Block>
                  <Block>
                     <Typography variant="caption" sx={{ textAlign: 'left', color: 'text.disabled', fontSize: "15px"}} >
                        Last Name
                     </Typography>
                     <RHFTextField name="lastname" 
                        InputProps={{
                           startAdornment: <InputAdornment position="start"><PermIdentityIcon/></InputAdornment>,
                        }}
                     />
                  </Block>
               </Stack>
               <Stack spacing={10} sx={{ width: 1, mb: 2 }} direction='row'>
                  <Block>
                     <Typography variant="caption" sx={{ textAlign: 'left', color: 'text.disabled', fontSize: "15px"}} >
                        Call Phone
                     </Typography>
                     <RHFTextField name="callphone"
                        InputProps={{
                           startAdornment: <InputAdornment position="start"><LocalPhoneOutlinedIcon/></InputAdornment>,
                        }}
                     />
                  </Block>
                  <Block>
                     <Typography variant="caption" sx={{ textAlign: 'left', color: 'text.disabled', fontSize: "15px"}} >
                        Company
                     </Typography>
                     <RHFTextField name="company"  InputProps={{
                           startAdornment: <InputAdornment position="start"><BusinessOutlinedIcon/></InputAdornment>,
                        }} />
                  </Block>
               </Stack>
               <Stack spacing={10} sx={{ width: 1, mb: 2 }} direction='row'>
                  <Block>
                     <Typography variant="caption" sx={{ textAlign: 'left', color: 'text.disabled', fontSize: "15px"}} >
                        Email
                     </Typography>
                     <RHFTextField name="email"
                        InputProps={{
                           startAdornment: <InputAdornment position="start"><MailOutlinedIcon/></InputAdornment>,
                        }}
                     />
                  </Block>
                  <Block>
                     <Typography variant="caption" sx={{ textAlign: 'left', color: 'text.disabled', fontSize: "15px"}} >
                        Confirm Email
                     </Typography>
                     <RHFTextField name="confirmEmail" 
                        InputProps={{
                           startAdornment: <InputAdornment position="start"><MailOutlinedIcon/></InputAdornment>,
                        }}
                     />
                  </Block>
               </Stack>
               <Stack sx={{ width: 1, mb: 2 }} >
                  <Block>
                     <Typography variant="caption" sx={{ textAlign: 'left', color: 'text.disabled', fontSize: "15px"}} >
                        Site
                     </Typography>
                     <RHFTextField name="site" 
                        InputProps={{
                           startAdornment: <InputAdornment position="start"><LanguageOutlinedIcon/></InputAdornment>,
                        }}
                     />
                  </Block>
               </Stack>
               <Stack sx={{ width: 1, mb: 2 }} >
                  <Block>
                     <Typography variant="caption" sx={{ textAlign: 'left', color: 'text.disabled', fontSize: "15px"}} >
                        Message
                     </Typography>
                     <RHFTextField name="message"
                        multiline
                        rows={6}
                     />
                  </Block>
               </Stack>
               <Stack direction='row' alignItems='center' gap={1}>
                  <Checkbox size="medium" />
                  <Typography variant="caption" sx={{ textAlign: 'left', color: 'text.disabled', fontSize: "15px"}} >
                     I confirm that i have read and understood the platform’s
                  </Typography>
                  <Link style={{color: '#69ADFF'}}>Terms of use</Link>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: "15px"}} >
                     and
                  </Typography>
                  <Link style={{color: '#69ADFF'}}>privacy policy</Link>
               </Stack>
               <Stack direction='row' alignItems='center' gap={1}>
                  <Checkbox size="medium" />
                  <Typography variant="caption" sx={{ textAlign: 'left', color: 'text.disabled', fontSize: "15px"}} >
                     Lorem ipsum dolor sit amet, consectetur adipiscing  and
                  </Typography>
               </Stack>
               <Stack sx={{ marginLeft:"1px", marginTop:"20px" }} >
                  <ReCAPTCHA
                  theme='light'
                  sitekey="Your client site key"
                  />
               </Stack>
               <Stack direction='row' gap={25} sx={{ justifyContent:'space-between', alignItems: 'center', mt: 2 }}>
                     <Stack direction='row' gap={1}>
                        <Typography>Already have an account ?</Typography>
                        <Link component={RouterLink} onClick={loginRouter} variant="subtitle2" color="primary">
                           Login
                        </Link>
                     </Stack>
                     <Stack direction='row' gap={2}>
                        <Button variant="outlined" color="primary" endIcon={<ArrowBackOutlinedIcon/>} sx={{justifyContent: 'unset'}} onClick={ router.back } />
                        <Button  size="large" variant="contained" color="primary" endIcon={<ArrowRightAltIcon/>} style={{ width: "120px" }} onClick={handleNextStep}>
                           Next
                        </Button>
                     </Stack>
               </Stack>
              </FormProvider>
              
         </Stack>
      </Stack>
  );
}

// ----------------------------------------------------------------------

function Block({ sx, children }) {
   return (
     <Stack spacing={1} sx={{ width: 1, ...sx }}>
       {children}
     </Stack>
   );
 }
 
 
 
Block.propTypes = {
   children: PropTypes.node,
   sx: PropTypes.object,
};
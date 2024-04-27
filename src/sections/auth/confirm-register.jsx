
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
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import FormProvider, {
   RHFTextField,
 } from 'src/components/hook-form';

import { FormSchema } from "./jwt/schema";

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

export default function ConfirmRegisterView() {
   const router = useRouter();
   
   const methods = useForm({
      resolver: yupResolver(FormSchema),
      defaultValues,
    });

   const handleNextStep = (e) => {
      e.preventDefault()
      router.push(paths.auth.jwt.login);
   }
  
  return (
   <Stack spacing={5} >
         <Stack spacing={3.5}>
               <Stack spacing={2} sx={{ mb: 1, position: 'relative' }} alignItems='center'>
                  <Typography variant="h4">Confirm Registration</Typography>
                  <Typography>Submit your details</Typography>
               </Stack>
              <FormProvider methods={methods}>
               <Stack spacing={10} sx={{ width: 1, mb: 3 }} direction='row'  >
                     <RHFTextField 
                        name="firstname" 
                        label="First Name"
                        InputProps={{
                           startAdornment: <InputAdornment position="start"><PermIdentityIcon/></InputAdornment>,
                        }}
                     />
                     <RHFTextField 
                        name="lastname" 
                        label="Last Name"
                        InputProps={{
                           startAdornment: <InputAdornment position="start"><PermIdentityIcon/></InputAdornment>,
                        }}
                     />
               </Stack>
               <Stack spacing={10} sx={{ width: 1, mb: 3 }} direction='row'>
                     <RHFTextField 
                        name="callphone"
                        label="Call Phone"
                        InputProps={{
                           startAdornment: <InputAdornment position="start"><LocalPhoneOutlinedIcon/></InputAdornment>,
                        }}
                     />
                     <RHFTextField 
                        name="company"  
                        label="Company"
                        InputProps={{
                           startAdornment: <InputAdornment position="start"><BusinessOutlinedIcon/></InputAdornment>,
                        }} />
               </Stack>
               <Stack spacing={10} sx={{ width: 1, mb: 3 }} direction='row'>
                     <RHFTextField 
                        type="password"
                        label="Password"
                        name="password"
                        InputProps={{
                           startAdornment: <InputAdornment position="start"><HttpsOutlinedIcon/></InputAdornment>,
                        }}
                     />
                     <RHFTextField 
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword" 
                        InputProps={{
                           startAdornment: <InputAdornment position="start"><HttpsOutlinedIcon/></InputAdornment>,
                        }}
                     />
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
               <Stack direction='row' gap={25} sx={{ justifyContent:'flex-end', alignItems: 'center', mt: 2 }}>
                    
                     <Stack direction='row' gap={2}>
                        <Button  size="large" variant="contained" color="primary"  style={{ width: "120px" }} onClick={handleNextStep}>
                           Send
                        </Button>
                     </Stack>
               </Stack>
              </FormProvider>
              
         </Stack>
      </Stack>
  );
}
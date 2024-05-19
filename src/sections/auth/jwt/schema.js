import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .min(3, 'Mininum 3 characters')
    .max(32, 'Maximum 50 characters'),
  lastName: Yup.string()
    .required('First Name is required')
    .min(3, 'Mininum 3 characters')
    .max(32, 'Maximum 50 characters'),
  cnpj: Yup.string().required('CNPJ is required'),
  callPhone: Yup.string().required('Call Phone Number is required'),
  company: Yup.string().required('Company is required'),
  site: Yup.string().required('Site is required'),
  message: Yup.string().required('Message Name is required'),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  confirmEmail: Yup.string()
    .required('confirm Email is required')
    .oneOf([Yup.ref('email')], "Email's not match"),
});

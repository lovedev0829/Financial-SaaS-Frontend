import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .min(3, 'Mininum 3 characters')
    .max(32, 'Maximum 50 characters'),
  lastName: Yup.string()
    .required('Last Name is required')
    .min(3, 'Mininum 3 characters')
    .max(32, 'Maximum 50 characters'),
  cnpj: Yup.string().required('CNPJ is required'),
  callPhone: Yup.string()
    .required('Call Phone Number is required')
    .matches(
      /^(\+?\d{1,2}[\s-]?)?((\d{3})?([\s-]?)(\d{3})[\s-]?(\d{4}|x\d{4}))/,
      'Invalid phone number format'
    ),
  company: Yup.string().required('Company is required'),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  confirmEmail: Yup.string()
    .required('confirm Email is required')
    .oneOf([Yup.ref('email')], "Email's not match"),
  term1: Yup.bool() // use bool instead of boolean
    .oneOf([true], 'You must accept the terms and conditions'),
  term2: Yup.bool() // use bool instead of boolean
    .oneOf([true], 'You must accept the terms and conditions'),
});

export const RegisterConfirmSchema = Yup.object().shape({
  password: Yup.string().required('Email is required').min(6).max(12),
  confirmPassword: Yup.string()
    .required('confirm password is required')
    .oneOf([Yup.ref('password')], "Password's not match")
    .min(6)
    .max(12),
  term1: Yup.bool() // use bool instead of boolean
    .oneOf([true], 'You must accept the terms and conditions'),
  term2: Yup.bool() // use bool instead of boolean
    .oneOf([true], 'You must accept the terms and conditions'),
});

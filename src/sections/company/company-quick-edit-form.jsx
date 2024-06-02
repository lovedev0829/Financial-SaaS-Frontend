import * as Yup from 'yup';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMask } from '@react-input/mask';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';

import { COMPANY_STATUS_OPTIONS } from 'src/utils/common';

import { updateCompany } from 'src/api/company';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export default function CompanyQuickEditForm({ currentCompany, open, onClose, refreshTable }) {
  const { enqueueSnackbar } = useSnackbar();
  const cnpjRef = useMask({ mask: '__.___.___/____-__', replacement: '_' });

  const EditUserSchema = Yup.object().shape({
    company_code: Yup.string().required('Company Code is required'),
    company_name: Yup.string().required('Company Name is required'),
    company_nick_name: Yup.string().required('Company Nick Name is required'),
    cnpj: Yup.string().required('CNPJ is required'),
    institution_type: Yup.string().required('Institution Type is required'),
    business_email: Yup.string()
      .email('Invalid Email Address!')
      .required('Business Email is required'),
    cetip_account_num: Yup.string().required('Cetip Account Num is required'),
  });

  const defaultValues = useMemo(
    () => ({
      company_code: currentCompany?.company_code || '',
      company_name: currentCompany?.company_name || '',
      company_nick_name: currentCompany?.company_nick_name || '',
      cnpj: currentCompany?.cnpj || '',
      institution_type: currentCompany?.institution_type || '',
      company_address: currentCompany?.company_address || '',
      business_email: currentCompany?.business_email || '',
      status: currentCompany?.status || '',
      cetip_account_num: currentCompany?.cetip_account_num || '',
    }),
    [currentCompany]
  );

  const methods = useForm({
    resolver: yupResolver(EditUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const params = { id: currentCompany.id, ...data };
    try {
      await updateCompany(params)
        .then(() => {
          refreshTable();
          enqueueSnackbar('Update success!');
          onClose();
        })
        .catch((error) => {
          enqueueSnackbar(error?.message, { variant: 'error' });
        });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Quick Update</DialogTitle>

        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            marginTop={2}
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFSelect name="status" label="Status">
              {COMPANY_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

            <RHFTextField
              name="company_name"
              label="Company Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="company_code"
              label="Company Code"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyboardCommandKeyIcon />
                  </InputAdornment>
                ),
              }}
            />

            <RHFTextField
              name="company_nick_name"
              label="Company Nick Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CorporateFareIcon />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              label="CNPJ"
              name="cnpj"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessOutlinedIcon />
                  </InputAdornment>
                ),
                inputRef: cnpjRef,
              }}
            />

            <RHFTextField
              name="institution_type"
              label="Institution Type"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ListIcon />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="company_address"
              label="Company Address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="business_email"
              label="Business Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="cetip_account_num"
              label="Cetip Account Number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBalanceIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

CompanyQuickEditForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  currentCompany: PropTypes.object,
  refreshTable: PropTypes.func,
};

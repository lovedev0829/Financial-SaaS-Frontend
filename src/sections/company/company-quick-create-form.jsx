import * as Yup from 'yup';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { COMPANY_STATUS_OPTIONS } from 'src/utils/common';

import { createCompany } from 'src/api/company';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ComapnyQuickCreateForm({ open, onClose, refreshTable }) {
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    company_id: Yup.string().required('Company Id is required'),
    company_name: Yup.string().required('Company Name is required'),
    company_nick_name: Yup.string().required('Company Nick Name is required'),
    cnpj: Yup.string().required('CNPJ is required'),
    institution_type: Yup.string().required('Institution Type is required'),
    company_address: Yup.string().required('Company Address is required'),
    business_email: Yup.string()
      .email('Invalid Email Address!')
      .required('Business Email is required'),
    cetip_account_num: Yup.string().required('Cetip Account Num is required'),
  });

  const defaultValues = useMemo(
    () => ({
      company_id: '',
      company_name: '',
      company_nick_name: '',
      cnpj: '',
      institution_type: '',
      company_address: '',
      business_email: '',
      status: '',
      cetip_account_num: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createCompany(data)
        .then(() => {
          reset();
          refreshTable();
          enqueueSnackbar('Create success!');
          onClose();
        })
        .catch((error) => {
          alert('Something went wrong', { variant: 'error' });
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
        <DialogTitle>Quick Create Company</DialogTitle>

        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            marginTop={1}
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

            <RHFTextField name="company_name" label="Company Name" />
            <RHFTextField name="company_id" label="Company ID" />
            <RHFTextField name="company_nick_name" label="Company Nick Name" />
            <RHFTextField name="cnpj" label="CNPJ" />

            <RHFTextField name="institution_type" label="Institution Type" />
            <RHFTextField name="company_address" label="Company Address" />
            <RHFTextField name="business_email" label="Business Email" />
            <RHFTextField name="cetip_account_num" label="Cetip Account Number" />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Create
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

ComapnyQuickCreateForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  refreshTable: PropTypes.func,
};

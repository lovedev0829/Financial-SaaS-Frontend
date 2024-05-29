import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import { Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { fData } from 'src/utils/format-number';
import { EMPLOYEE_ROLE_OPTIONS } from 'src/utils/common';

import { createUser, uploadAvatar } from 'src/api/user';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export default function UserQuickCreateForm({
  open,
  onClose,
  refreshTable,
  masterEmail,
  company_id,
  company_role,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().min(3).max(10).required('First Name is required'),
    lastName: Yup.string().min(3).max(10).required('Last Name is required'),
    role: Yup.string().required('Role is required'),
    email: Yup.string().email('Email Address!').required('Email is required'),
  });

  const defaultValues = useMemo(
    () => ({
      avatarUrl: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
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
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    let params = {
      masterEmail,
      company_id,
      company_role,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      avatar: '',
      role: data?.role,
    };

    try {
      if (data.avatarUrl) {
        await uploadFile(data.avatarUrl)
          .then((res) => {
            params = { ...params, avatar: res };
          })
          .catch((error) => {
            alert(error);
          });
      }
      await createUser(params)
        .then(() => {
          reset();
          refreshTable();
          enqueueSnackbar('Create success!');
          onClose();
        })
        .catch((error) => {
          alert(error?.message, { variant: 'error' });
        });
    } catch (error) {
      console.error(error);
    }
  });

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    return new Promise((resolve, reject) => {
      uploadAvatar(formData)
        .then((res) => {
          resolve(res?.filename);
        })
        .catch((error) => {
          reject(error?.message);
        });
    });
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  useEffect(() => {
    reset();
  }, [reset]);

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
        <DialogTitle>Quick Create Employee</DialogTitle>

        <DialogContent>
          <Stack direction="row" gap={10}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
            <Box
              columnGap={2}
              display="grid"
              marginTop={1}
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="firstName" label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />
              <RHFTextField name="email" label="Email" />
              <RHFSelect name="role" label="Role">
                {EMPLOYEE_ROLE_OPTIONS.map((role) => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Box>
          </Stack>
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

UserQuickCreateForm.propTypes = {
  company_id: PropTypes.number,
  company_role: PropTypes.string,
  masterEmail: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  refreshTable: PropTypes.func,
};

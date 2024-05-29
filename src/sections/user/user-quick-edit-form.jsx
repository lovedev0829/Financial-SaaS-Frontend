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

import { endpoints } from 'src/utils/axios';
import { fData } from 'src/utils/format-number';
import { EMPLOYEE_ROLE_OPTIONS, EMPLOYEE_STATUS_OPTIONS } from 'src/utils/common';

import { updateuser, uploadAvatar } from 'src/api/user';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';

import { SERVER_URL } from '../../config-global';

// ----------------------------------------------------------------------

export default function UserQuickEditForm({ currentUser, open, onClose, refreshTable }) {
  const { enqueueSnackbar } = useSnackbar();

  const EditUserSchema = Yup.object().shape({
    first_name: Yup.string().min(3).max(10).required('First Name is required'),
    last_name: Yup.string().min(3).max(10).required('Last Name is required'),
    role: Yup.string().required('Role is required'),
    email: Yup.string().email('Email Address!').required('Email is required'),
  });

  const defaultValues = useMemo(
    () => ({
      avatar: `${SERVER_URL}${endpoints.user.avatarUrl}/${currentUser?.avatar}` || '',
      first_name: currentUser?.first_name || '',
      last_name: currentUser?.last_name || '',
      email: currentUser?.email || '',
      role: currentUser?.role || '',
      status: currentUser?.status || 'enabled',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(EditUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    let params = {
      id: currentUser?.id,
      company_id: currentUser?.company_id,
      firstName: data?.first_name,
      lastName: data?.last_name,
      email: data?.email,
      avatar: '',
      role: data?.role,
      status: data?.status,
    };

    try {
      if (typeof data?.avatar === 'object') {
        await uploadFile(data.avatar)
          .then((res) => {
            params = { ...params, avatar: res };
          })
          .catch((error) => {
            alert(error);
          });
      }
      await updateuser(params)
        .then(() => {
          refreshTable();
          enqueueSnackbar('Update success!');
          onClose();
        })
        .catch((error) => {
          alert(error?.message, { variant: 'error' });
          onClose();
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
        setValue('avatar', newFile, { shouldValidate: true });
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
        <DialogTitle>Quick Update</DialogTitle>

        <DialogContent>
          <Stack direction="row" gap={10}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatar"
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
              <RHFTextField name="first_name" label="First Name" />
              <RHFTextField name="last_name" label="Last Name" />
              <RHFTextField name="email" label="Email" />
              <RHFSelect name="role" label="Role">
                {EMPLOYEE_ROLE_OPTIONS.map((role) => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFSelect name="status" label="Status">
                {EMPLOYEE_STATUS_OPTIONS.map((status) => (
                  <MenuItem
                    key={status.value}
                    value={status.value}
                    selected={currentUser.status === status.value}
                  >
                    {status.label}
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
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

UserQuickEditForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  currentUser: PropTypes.object,
  refreshTable: PropTypes.func,
};

import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Stack } from '@mui/system';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import CardContent from '@mui/material/CardContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { updateCompanyProspectStatus } from 'src/api/company';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect } from 'src/components/hook-form';

import { USER_STATUS_OPTIONS } from '../../utils/common';
// ----------------------------------------------------------------------

export default function UserQuickEditForm({ currentUser, open, onClose, refreshTable }) {
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = useMemo(
    () => ({
      status: currentUser?.status,
    }),
    [currentUser]
  );
  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const params = {
        company_role: currentUser.company_role,
        user_id: currentUser.id,
        email: currentUser.email,
        cnpj: currentUser.cnpj,
        ...data,
      };

      await updateCompanyProspectStatus(params)
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

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 620 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Company Prospect</DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Account is waiting for confirmation
          </Alert>

          <Stack gap={2}>
            <RHFSelect name="status" label="Status">
              {USER_STATUS_OPTIONS.map((status) => (
                <MenuItem
                  key={status.value}
                  value={status.value}
                  selected={currentUser.status === status.value}
                >
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <Typography>Message</Typography>
            <CardContent sx={{ height: 320, overflow: 'auto' }}>{currentUser?.message}</CardContent>
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
  refreshTable: PropTypes.func,
  onClose: PropTypes.func,
  currentUser: PropTypes.object,
};

import * as Yup from 'yup';
import * as React from 'react';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

export default function CreateIssuanceRouterFrm({ issuance }) {
  const NewIssuanceSchema = Yup.object().shape({
    issuance_id_name: Yup.string().required('Issuance Identification is required'),
    asset_sub_type: Yup.string().required('Asset Subtype is required'),
    inter_rate_index: Yup.string().required('Interest Rate Indexer is required'),
    inter_rate_min: Yup.string().required('Address is required'),
    inter_rate_max: Yup.string().required('Country is required'),
    unit_price: Yup.string().required('Company is required'),
    emission_max_volume: Yup.string().required('State is required'),
    contract_min_size: Yup.string().required('City is required'),
    validate_proposal: Yup.string().required('Role is required'),
    issuance_expir_date: Yup.string().required('Zip code is required'),
    inter_calc_base: Yup.mixed().nullable().required('Avatar is required'),
    // not required
    detention_min_period: Yup.string(),
    redemption_min_date: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      issuance_id_name: issuance?.issuance_id_name || '',
      asset_sub_type: issuance?.asset_sub_type || '',
      inter_rate_index: issuance?.inter_rate_index || '',
      inter_rate_min: issuance?.inter_rate_min || '',
      inter_rate_max: issuance?.inter_rate_max || '',
      unit_price: issuance?.unit_price || '',
      emission_max_volume: issuance?.emission_max_volume || '',
      contract_min_size: issuance?.contract_min_size || '',
      validate_proposal: issuance?.validate_proposal || '',
      issuance_expir_date: issuance?.issuance_expir_date || '',
      inter_calc_base: issuance?.inter_calc_base || null,
      detention_min_period: issuance?.detention_min_period || '',
      redemption_min_date: issuance?.redemption_min_date || true,
    }),
    [issuance]
  );

  const methods = useForm({
    resolver: yupResolver(NewIssuanceSchema),
    defaultValues,
  });
  return (
    <FormProvider methods={methods}>
      <Typography variant="h5" sx={{ mb: 5 }}>
        Issuance Registration
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={12} md={4}>
          <Stack gap={2}>
            <Typography variant="h">Issuance Identification</Typography>
            <RHFTextField name="name" />
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack gap={2}>
            <Typography variant="h">Asset Subtype</Typography>
            <Select xs={12} value={10} id="assetSubtype">
              <MenuItem value={10}>LCI</MenuItem>
              <MenuItem value={20}>LCA</MenuItem>
              <MenuItem value={30}>CDB</MenuItem>
            </Select>
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack gap={2}>
            <Typography variant="h">Interest Rate Indexer</Typography>
            <Select xs={12} value={10} id="assetSubtype">
              <MenuItem value={10}>Pre-fixed rate (SELIC)</MenuItem>
              <MenuItem value={20}>LCA</MenuItem>
              <MenuItem value={30}>CDB</MenuItem>
            </Select>
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack gap={2}>
            <Typography variant="h">Interest Rate Information </Typography>
            <RHFTextField name="name" />
          </Stack>
        </Grid>
        <Grid
          xs={12}
          md={12}
          container
          sx={{ border: '1px solid #E5E5EE', borderRadius: 1, p: 2, m: 1 }}
        >
          <Grid xs={12} md={4}>
            <Stack gap={2}>
              <Typography component="span" sx={{ mt: 1, color: 'text.disabled' }}>
                Distributor Name
              </Typography>
              <Select xs={12} value={0} id="distributorName">
                <MenuItem value={0} selected>
                  Distributor Name
                </MenuItem>
                <MenuItem value={10}>LCI</MenuItem>
                <MenuItem value={20}>LCA</MenuItem>
                <MenuItem value={30}>CDB</MenuItem>
              </Select>
            </Stack>
          </Grid>
          <Grid xs={12} md={4}>
            <Stack gap={2}>
              <Typography component="span" sx={{ mt: 1, color: 'text.disabled' }}>
                Status of Issuance
              </Typography>
              <Select xs={12} value={0} id="issuanceStatus">
                <MenuItem value={0} selected>
                  Pending
                </MenuItem>
                <MenuItem value={20}>Canceled</MenuItem>
                <MenuItem value={30}>Rejected</MenuItem>
              </Select>
            </Stack>
          </Grid>
          <Grid xs={12} md={12}>
            <Button variant="contained" color="success" size="large" startIcon={<AddCircleIcon />}>
              Add More
            </Button>
          </Grid>
        </Grid>
        <Grid xs={12} md={12} container>
          <Stack gap={3} direction="row">
            <Button size="large" variant="contained" sx={{ bgcolor: '#A0A1AC' }}>
              Cancel
            </Button>
            <Button size="large" variant="contained" color="success">
              Save Changes
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

CreateIssuanceRouterFrm.propTypes = {
  issuance: PropTypes.object,
};

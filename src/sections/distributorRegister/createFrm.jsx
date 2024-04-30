import * as Yup from 'yup';
import * as React from 'react';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

export default function CreateDistributorFrm({ issuance }) {
  const NewDistributorSchema = Yup.object().shape({
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
    resolver: yupResolver(NewDistributorSchema),
    defaultValues,
  });
  return (
    <FormProvider methods={methods}>
      <Typography variant="h5" sx={{ mb: 5 }}>
        Distributor Registration
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={6} md={4}>
          <Stack gap={2}>
            <Typography variant="h">Issuance Identification</Typography>
            <RHFTextField name="name" />
          </Stack>
        </Grid>
        <Grid xs={6} md={4}>
          <Stack gap={2}>
            <Typography variant="h">Company Name</Typography>
            <RHFTextField name="name" />
          </Stack>
        </Grid>
        <Grid xs={6} md={4}>
          <Stack gap={2}>
            <Typography variant="h"> CNPJ</Typography>
            <RHFTextField name="name" />
          </Stack>
        </Grid>
        <Grid xs={6} md={4}>
          <Stack gap={2}>
            <Typography variant="h">Type of Institution</Typography>
            <RHFTextField name="name" />
          </Stack>
        </Grid>
        <Grid xs={6} md={4}>
          <Stack gap={2}>
            <Typography variant="h">Company's address</Typography>
            <RHFTextField name="name" />
          </Stack>
        </Grid>
        <Grid xs={6} md={4}>
          <Stack gap={2}>
            <Typography variant="h">Commercial phone </Typography>
            <RHFTextField name="name" />
          </Stack>
        </Grid>
        <Grid xs={6} md={4}>
          <Stack gap={2}>
            <Typography variant="h">Business Email</Typography>
            <RHFTextField name="name" />
          </Stack>
        </Grid>
        <Grid xs={6} md={4}>
          <Stack gap={2}>
            <Typography variant="h">Name of Legal Representative </Typography>
            <RHFTextField name="name" />
          </Stack>
        </Grid>
        <Grid xs={6} md={4}>
          <Stack gap={2}>
            <Typography variant="h">Legal Representative Contact </Typography>
            <RHFTextField name="name" />
          </Stack>
        </Grid>
        <Grid xs={6} md={4}>
          <Stack gap={2}>
            <Typography variant="h">Relationship Status </Typography>
            <RHFTextField name="name" />
          </Stack>
        </Grid>
        <Grid xs={6} md={4}>
          <Stack gap={2}>
            <Typography variant="h">Cetip Account Number </Typography>
            <RHFTextField name="name" />
          </Stack>
        </Grid>
        <Grid xs={6} md={12} container>
          <Grid xs={4} md={1.6}>
            <Button variant="contained" sx={{ bgcolor: '#A0A1AC', width: '150px', height: '50px' }}>
              Cancel
            </Button>
          </Grid>
          <Grid xs={4} md={1}>
            <Button variant="contained" color="success" sx={{ width: '150px', height: '50px' }}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

CreateDistributorFrm.propTypes = {
  issuance: PropTypes.object,
};

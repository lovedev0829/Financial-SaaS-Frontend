import { useForm } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import { Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Unstable_Grid2';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormProvider from 'src/components/hook-form';

export default function Notification() {
  const transactionEmails = [
    {
      label: 'Interesting',
      name: 'interest',
    },
    {
      label: 'Important',
      name: 'important',
    },
    {
      label: 'Essential',
      name: 'essential',
    },
  ];
  const NotificationEmails = [
    {
      label: 'Exchange rate',
      name: 'exchangeRate',
    },
    {
      label: 'Issuance Registration',
      name: 'issuanceRegister',
    },
    {
      label: 'Distributor Registration',
      name: 'distributorRegister',
    },
    {
      label: 'Issuance Router',
      name: 'issuanceRouter',
    },
  ];

  const MarketingEmails = [
    {
      label: 'Special offers',
      name: 'specialOffers',
    },
    {
      label: 'Newsletter and community updates',
      name: 'newsUpdates',
    },
    {
      label: 'Promotions',
      name: 'promotions',
    },
    {
      label: 'Surveys & interview invitations',
      name: 'invitations',
    },
    {
      label: 'Personalised interests ',
      name: 'pInterestes',
    },
  ];

  const methods = useForm();

  return (
    <FormProvider methods={methods}>
      <Stack gap={2}>
        <Grid container>
          <Grid xs={12} md={5}>
            <Typography>Transactional emails</Typography>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl component="fieldset">
              <RadioGroup>
                {transactionEmails.map((item) => (
                  <FormControlLabel
                    key={item.name}
                    value={item.name}
                    control={<Radio size="medium" color="primary" />}
                    label={item.label}
                    sx={{ textTransform: 'capitalize' }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={12} md={5}>
            <Typography>Notification emails</Typography>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl component="fieldset">
              {NotificationEmails.map((item) => (
                <FormControlLabel
                  key={item.name}
                  control={<Checkbox size="medium" color="primary" />}
                  label={item.label}
                  sx={{ textTransform: 'capitalize' }}
                />
              ))}
            </FormControl>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={12} md={5}>
            <Typography>Marketing emails </Typography>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl component="fieldset">
              {MarketingEmails.map((item) => (
                <FormControlLabel
                  key={item.name}
                  control={<Checkbox size="medium" color="primary" />}
                  label={item.label}
                  sx={{ textTransform: 'capitalize' }}
                />
              ))}
            </FormControl>
          </Grid>
        </Grid>
      </Stack>
    </FormProvider>
  );
}

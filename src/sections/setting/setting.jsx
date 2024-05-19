import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export default function Setting() {
  return (
    <Stack gap={2}>
      <Grid container gap={2} justifyContent="space-between">
        <Typography width="100px">Account</Typography>
        <Typography>Active</Typography>
        <Button color="inherit" variant="outlined" size="small">
          edit
        </Button>
      </Grid>
      <Grid container gap={2} justifyContent="space-between">
        <Typography width="187px">Security Question</Typography>
        <Typography>Mother&apos; birthplace</Typography>
        <Button color="inherit" variant="outlined" size="small">
          edit
        </Button>
      </Grid>
      <Grid container gap={2} justifyContent="space-between">
        <Typography width="100px">Account type</Typography>
        <Typography>Issuer</Typography>
        <Button color="inherit" variant="outlined" size="small">
          edit
        </Button>
      </Grid>
      <Grid container gap={2} justifyContent="space-between">
        <Typography>Download My Data</Typography>
        <Button color="inherit" variant="outlined" size="small">
          Download
        </Button>
      </Grid>
    </Stack>
  );
}

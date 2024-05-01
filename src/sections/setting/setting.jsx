import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export default function Setting() {
  return (
    <Stack gap={2}>
      <Grid container gap={2} justifyContent="space-between">
        <Typography>Account</Typography>
        <Typography>Active</Typography>
        <Typography>
          <Button color="inherit" variant="outlined" size="small">
            edit
          </Button>
        </Typography>
      </Grid>
      <Grid container gap={2} justifyContent="space-between">
        <Typography>Security Question</Typography>
        <Typography>Mother&apos; birthplace</Typography>
        <Typography>
          <Button color="inherit" variant="outlined" size="small">
            edit
          </Button>
        </Typography>
      </Grid>
      <Grid container gap={2} justifyContent="space-between">
        <Typography>Account type</Typography>
        <Typography>Issuer</Typography>
        <Typography>
          <Button color="inherit" variant="outlined" size="small">
            edit
          </Button>
        </Typography>
      </Grid>
      <Grid container gap={2} justifyContent="space-between">
        <Typography>Download My Data</Typography>
        <Typography>
          <Button color="inherit" variant="outlined" size="small">
            Download
          </Button>
        </Typography>
      </Grid>
    </Stack>
  );
}

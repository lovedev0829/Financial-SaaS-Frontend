import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';

import IssuanceTracking from './track';

export default function DashboardView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <IssuanceTracking
        title="Issuance tracking"
        tablist={[
          {
            value: 'confirmed',
            label: 'Confirmed',
            component: <div>Confirmed</div>,
          },
          {
            value: 'pending',
            label: 'Pending',
            component: <div>Pending</div>,
          },
          {
            value: 'cancelled',
            label: 'Cancelled',
            component: <div>Cancelled</div>,
          },
          {
            value: 'issued',
            label: 'Issued',
            component: <div>Issued</div>,
          },
        ]}
      />
    </Container>
  );
}

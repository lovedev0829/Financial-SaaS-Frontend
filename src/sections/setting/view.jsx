import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { useSettingsContext } from 'src/components/settings';

import SettingView from './setting';
import Notification from './notification';

export default function User() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack gap={3}>
        <Card>
          <CardHeader title="Setting" />
          <CardContent>
            <SettingView />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Edit Notification" />
          <CardContent>
            <Notification />
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}

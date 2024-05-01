import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';

export default function AnalysisView() {
  const settings = useSettingsContext();

  return <Container maxWidth={settings.themeStretch ? false : 'xl'} />;
}

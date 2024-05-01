import { Helmet } from 'react-helmet-async';

import SettingView from 'src/sections/setting/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Settings </title>
      </Helmet>
      <SettingView />
    </>
  );
}

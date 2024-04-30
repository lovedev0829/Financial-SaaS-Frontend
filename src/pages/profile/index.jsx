import { Helmet } from 'react-helmet-async';

import ProfileView from 'src/sections/profile/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Profile </title>
      </Helmet>
      <ProfileView />
    </>
  );
}

import { Helmet } from 'react-helmet-async';

import UserView from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Manage User </title>
      </Helmet>
      <UserView />
    </>
  );
}

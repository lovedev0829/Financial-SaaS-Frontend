import { Helmet } from 'react-helmet-async';

import IssuanceRouterView from 'src/sections/issuanceRouter/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Issuance Router </title>
      </Helmet>
      <IssuanceRouterView />
    </>
  );
}

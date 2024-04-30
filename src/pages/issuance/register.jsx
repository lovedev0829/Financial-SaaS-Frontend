import { Helmet } from 'react-helmet-async';

import IssuanceRegisterView from 'src/sections/issuanceRegister/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Issuance Register </title>
      </Helmet>
      <IssuanceRegisterView />
    </>
  );
}

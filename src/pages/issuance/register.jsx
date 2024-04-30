import { Helmet } from 'react-helmet-async';

import IssuanceRegisterView from 'src/sections/issuanceRegister/register';

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

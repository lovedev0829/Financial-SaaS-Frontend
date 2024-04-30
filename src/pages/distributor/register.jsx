import { Helmet } from 'react-helmet-async';

import DistributorRegisterView from 'src/sections/distributorRegister/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Distributor Register </title>
      </Helmet>
      <DistributorRegisterView />
    </>
  );
}

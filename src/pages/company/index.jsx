import { Helmet } from 'react-helmet-async';

import CompanyView from 'src/sections/company/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Company Management </title>
      </Helmet>
      <CompanyView />
    </>
  );
}

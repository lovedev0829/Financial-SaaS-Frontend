import { Helmet } from 'react-helmet-async';

import CompanyProspectView from 'src/sections/companyProspect/prospect';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Company Prospect Management </title>
      </Helmet>
      <CompanyProspectView />
    </>
  );
}
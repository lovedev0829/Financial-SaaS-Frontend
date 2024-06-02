import { Helmet } from 'react-helmet-async';

import CustomerView from 'src/sections/customer/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Analysis </title>
      </Helmet>
      <CustomerView />
    </>
  );
}

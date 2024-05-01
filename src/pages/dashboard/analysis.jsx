import { Helmet } from 'react-helmet-async';

import AnalysisView from 'src/sections/analysis/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Analysis And Reports </title>
      </Helmet>
      <AnalysisView />
    </>
  );
}

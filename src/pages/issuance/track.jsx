import { Helmet } from 'react-helmet-async';

import IssuanceTrackView from 'src/sections/issuanceTrack/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Issuance Track </title>
      </Helmet>
      <IssuanceTrackView />
    </>
  );
}

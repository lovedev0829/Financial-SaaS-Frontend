import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom';

import { useResponsive } from 'src/hooks/use-responsive';

export default function AuthClassicLayout({ children, image, title }) {

  const mdUp = useResponsive('up', 'md');
  let location = useLocation();
  
  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 500,
        pt: { xs: 10, md: 10 },
        pb: { xs: 10, md: 0 },
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (

      <Box
        component="img"
        alt="auth"
        src={image || location.key == "pdmq5vbb" ? '/assets/illustrations/auth2.png' :  '/assets/illustrations/auth1.png'}
        spacing={10}
        sx={{
          width: 1,
          height: 900,
          maxWidth: 1024,
          px: { xs: 2, md: 2 },
          pt: { xs: 1, md: 3 },
          pb: { xs: 1, md: 1 },
        }}
      />
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
      }}
    >
      {mdUp && renderSection}
      {renderContent}
    </Stack>
  );
}

AuthClassicLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
};

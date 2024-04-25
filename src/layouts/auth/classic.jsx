import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useResponsive } from 'src/hooks/use-responsive';

export default function AuthClassicLayout({ children, image, title }) {

  const mdUp = useResponsive('up', 'md');
  const location = useLocation();
  
  const [registerFrmStyle, setRegisterFrmStyle] = useState({
    maxWidth: 500,
    pt: { xs: 10, md: 10 },
    pb: { xs: 10, md: 0 },
  });


  const [coverImageStyle, setCoverImageStyle] = useState({
    maxWidth: 1024,
    height: 900,
    px: { xs: 2, md: 2 },
    pt: { xs: 1, md: 3 },
    pb: { xs: 1, md: 1 },
  });

  const getCoverImageURL = () => {

    if(location.pathname === "/auth/profile"){
        return  '/assets/illustrations/auth2.png';
    }if(location.pathname === "/auth/jwt/register"){
      return  '/assets/illustrations/auth3.png';
    }if(location.pathname === "/auth/confirm"){
      return  '/assets/illustrations/auth4.png';
    }
    return '/assets/illustrations/auth1.png'
  }

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        ...registerFrmStyle
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (

      <Box
        component="img"
        alt="auth"
        src={image || getCoverImageURL()}
        spacing={10}
        sx={{
          width: 1,
          ...coverImageStyle
        }}
      />
  );

  useEffect(() => {
    
    if(location.pathname === "/auth/jwt/register"){
      setRegisterFrmStyle({...registerFrmStyle, maxWidth: 900})
      setCoverImageStyle({...coverImageStyle, maxWidth:883, height:1200})
    }if(location.pathname === "/auth/confirm"){
      setCoverImageStyle({...coverImageStyle,maxWidth:783, height:900})
    }

  },[])

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

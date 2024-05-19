import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/auth/guard';
import AuthClassicLayout from 'src/layouts/auth/classic';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));
const SelectProfile = lazy(() => import('src/pages/auth/selectProfile'));
const ConfirmProfile = lazy(() => import('src/pages/auth/confirmProfile'));
const ConfirmRegister = lazy(() => import('src/pages/auth/confirmRegsiter'));

// ----------------------------------------------------------------------

const authJwt = {
  path: 'jwt',
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: 'login',
      element: (
        <GuestGuard>
          <AuthClassicLayout frmMaxWith={600}>
            <JwtLoginPage />
          </AuthClassicLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'register/:companyRole',
      element: (
        <GuestGuard>
          <AuthClassicLayout frmMaxWith={900}>
            <JwtRegisterPage />
          </AuthClassicLayout>
        </GuestGuard>
      ),
    },
  ],
};

const authProfile = {
  path: 'profile',
  element: (
    <GuestGuard>
      <AuthClassicLayout frmMaxWith={800}>
        <SelectProfile />
      </AuthClassicLayout>
    </GuestGuard>
  ),
};

const confirmRoutes = {
  path: 'confirm',
  element: (
    <GuestGuard>
      <AuthClassicLayout frmMaxWith={950}>
        <Outlet />
      </AuthClassicLayout>
    </GuestGuard>
  ),
  children: [
    // Index route for rendering ConfirmProfile at "/confirm"
    {
      index: true,
      element: <ConfirmProfile />,
    },
    // Nested route for rendering JwtRegisterPage at "/confirm/register"
    {
      path: 'register',
      element: <ConfirmRegister />,
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [authJwt, authProfile, confirmRoutes],
  },
];

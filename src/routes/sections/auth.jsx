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
          <AuthClassicLayout>
            <JwtLoginPage />
          </AuthClassicLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'register',
      element: (
        <GuestGuard>
          <AuthClassicLayout title="Manage the job more effectively with Minimal">
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
        <AuthClassicLayout>
          <SelectProfile />
        </AuthClassicLayout>
      </GuestGuard>
    ),
}
const confirmProfile = {
  path: 'confirm',
  element: (
    <GuestGuard>
      <AuthClassicLayout>
        <ConfirmProfile />
      </AuthClassicLayout>
    </GuestGuard>
  ),
}


export const authRoutes = [
  {
    path: 'auth',
    children: [authJwt, authProfile, confirmProfile],
  },
];

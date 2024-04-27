import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/index'));
const Analysis = lazy(() => import('src/pages/dashboard/analysis'));
const IssuanceRegsiter = lazy(() => import('src/pages/issuance/register'));
const IssuanceRouter = lazy(() => import('src/pages/issuance/router'));
const IssuanceTrack = lazy(() => import('src/pages/issuance/track'));
const DistributorRegister = lazy(() => import('src/pages/distributor/register'));
const User = lazy(() => import('src/pages/user/index'));
const Profile = lazy(() => import('src/pages/profile/index'));
const Setting = lazy(() => import('src/pages/setting/index'));
const Customer = lazy(() => import('src/pages/customer/index'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'analysis', element: <Analysis /> },
      {
        path: 'issuance',
        children: [
          { path: 'register', element: <IssuanceRegsiter /> },
          { path: 'router', element: <IssuanceRouter /> },
          { path: 'track', element: <IssuanceTrack /> },
        ],
      },
      {
        path: 'distributor',
        children: [
          { path: 'register', element: <DistributorRegister /> },
        ],
      },
      { path: 'user', element: <User /> },
      { path: 'profile', element: <Profile /> },
      { path: 'settings', element: <Setting /> },
      { path: 'customer', element: <Customer /> },
    ],
  },
];

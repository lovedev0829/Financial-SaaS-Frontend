import { useMemo } from 'react';

import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import Person2Icon from '@mui/icons-material/Person2';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EscalatorIcon from '@mui/icons-material/Escalator';
import InventoryIcon from '@mui/icons-material/Inventory';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

import { paths } from 'src/routes/paths';

const ICONS = {
  dashboard: <DashboardIcon/>,
  analysis: <InsertChartIcon/>,
  issuanceRegister: <EscalatorIcon />,
  distributorRegister: <AccountTreeIcon />,
  issuanceRrouter:<InventoryIcon />,
  issuanceTracking: <MonitorHeartIcon />,
  manageUsers: <PeopleIcon/>,
  profile: <Person2Icon />,
  setting:<SettingsIcon/>,
  customer:<SupportAgentIcon/>,
  logout: <LogoutIcon />

};

export function useNavData() {
  const data = useMemo(
    () => [

      // General
      {
        subheader: 'GENERAL',
        items: [
          { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
          { title: 'Analysis and Reports', path: paths.dashboard.analysis, icon: ICONS.analysis },
        ],
      },

      // Basic REGISTRATION
      {
        subheader: 'Basic REGISTRATION',
        items: [
          {
            title: 'Issuance Registration',
            path: paths.dashboard.issuance.register,
            icon: ICONS.issuanceRegister,
          },
          {
            title: 'Distributor Registration',
            path: paths.dashboard.distributor.register,
            icon: ICONS.distributorRegister,
          }
        ],
      },
      
       // Workflow
       {
        subheader: 'WORKFLOW',
        items: [
          {
            title: 'Issuance Router',
            path: paths.dashboard.issuance.router,
            icon: ICONS.issuanceRrouter,
          },
          {
            title: 'Issuance Tracking',
            path: paths.dashboard.issuance.track,
            icon: ICONS.issuanceTracking,
          }
        ],
      },
       // Workflow
       {
        subheader: 'USERS SETTINGS',
        items: [
          {
            title: 'Manage Users',
            path: paths.dashboard.user,
            icon: ICONS.manageUsers ,
          },
        ],
      },
      // My account
      {
        subheader: 'MY ACCOUNT',
        items: [
          {
            title: 'Profile',
            path: paths.dashboard.profile,
            icon: ICONS.profile,
          },
          {
            title: 'Settings',
            path: paths.dashboard.settings,
            icon: ICONS.setting,
          },
          {
            title: 'Customer Support',
            path: paths.dashboard.customer,
            icon: ICONS.customer,
          },
        ],
      },
    ],
    []
  );

  return data;
}

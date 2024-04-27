// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
    selectProfile: `${ROOTS.AUTH}/profile`,
    confirmProfile: `${ROOTS.AUTH}/confirm`,
    confirmRegister: `${ROOTS.AUTH}/confirm/register`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    analysis: `${ROOTS.DASHBOARD}/analysis`,
    issuance: {
      register: `${ROOTS.DASHBOARD}/issuance/register`,
      router: `${ROOTS.DASHBOARD}/issuance/router`,
      track: `${ROOTS.DASHBOARD}/issuance/track`,
    },
    distributor: {
      register: `${ROOTS.DASHBOARD}/distributor/register`,
    },
    user: `${ROOTS.DASHBOARD}/user`,
    profile: `${ROOTS.DASHBOARD}/profile`,
    settings: `${ROOTS.DASHBOARD}/settings`,
    customer: `${ROOTS.DASHBOARD}/customer`,
  },
};

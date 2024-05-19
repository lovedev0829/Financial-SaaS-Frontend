import { paths } from 'src/routes/paths';

export const SERVER_URL = 'http://localhost:8080';
export const ASSETS_API = import.meta.env.VITE_ASSETS_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'

// ROOT  AFTER REGISTER SUCCESSFUL
export const PATH_AFTER_REGISTER = paths.auth.confirmProfile;

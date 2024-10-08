import axios from 'axios';

import { SERVER_URL } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: SERVER_URL });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/signup',
    checkTokenValidation: '/api/auth/validateToken',
    confirmRegistration: '/api/auth/confirm/register',
  },
  company: {
    list: '/api/company/list',
    delete: '/api/company/delete',
    update: '/api/company/update',
    create: '/api/company/create',
    prospect: '/api/company/prospects',
    deleteProspects: '/api/company/prospects/delete',
    userStatusUpdate: '/api/company/user/status',
  },
  user: {
    list: '/api/user/list',
    delete: '/api/user/delete',
    create: '/api/user/create',
    update: '/api/user/update',
    uploadAvatar: '/api/user/upload/avatar',
    avatarUrl: '/api/user/upload/avatar',
  },
};

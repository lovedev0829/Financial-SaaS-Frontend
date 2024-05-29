import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetCompanyEmployees(company_id) {
  const URL = `${endpoints.user.list}/${company_id}`;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      users: data?.users || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      mutate,
      usersEmpty: !isLoading && !data?.users.length,
    }),
    [data?.users, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export function deleteUsers(ids) {
  const URL = endpoints.user.delete;

  return new Promise((resolve, reject) => {
    axios
      .post(URL, {
        selectedIds: ids,
      })
      .then(() => {
        resolve({ status: 'success' });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function createUser(params) {
  const URL = endpoints.user.create;

  return new Promise((resolve, reject) => {
    axios
      .post(URL, params)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function updateuser(params) {
  const URL = endpoints.user.update;

  return new Promise((resolve, reject) => {
    axios
      .post(URL, params)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function uploadAvatar(file) {
  const URL = endpoints.user.uploadAvatar;

  return new Promise((resolve, reject) => {
    axios
      .post(URL, file)
      .then((res) => {
        resolve(res?.data);
      })
      .catch((error) => {
        console.log('here', error);
        reject(error);
      });
  });
}

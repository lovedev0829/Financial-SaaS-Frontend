import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetCompanyProspects() {
  const URL = endpoints.company.prospect;

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

export function useGetCompanyies() {
  const URL = endpoints.company.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      companies: data?.companies || [],
      companiesLoading: isLoading,
      companiesError: error,
      companiesValidating: isValidating,
      mutate,
      companiesEmpty: !isLoading && !data?.companies.length,
    }),
    [data?.companies, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export function updateCompanyProspectStatus(params) {
  const URL = endpoints.company.userStatusUpdate;

  return new Promise((resolve, reject) => {
    axios
      .post(URL, params)
      .then(() => {
        resolve({ status: 'success' });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function deleteCompany(ids) {
  const URL = endpoints.company.delete;

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

export function deleteCompanyProspect(ids) {
  const URL = endpoints.company.deleteProspects;

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

export function updateCompany(params) {
  const URL = endpoints.company.update;

  return new Promise((resolve, reject) => {
    axios
      .post(URL, params)
      .then(() => {
        resolve({ status: 'success' });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function createCompany(params) {
  const URL = endpoints.company.create;

  return new Promise((resolve, reject) => {
    axios
      .post(URL, params)
      .then(() => {
        resolve({ status: 'success' });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

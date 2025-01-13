import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Data } from '../types/AppDataType';

export const dataApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    fetchData: builder.query<Data, void>({
      query: () => '/data.json',
    }),
  }),
});

// Export the hook for fetching data
export const { useFetchDataQuery } = dataApi;

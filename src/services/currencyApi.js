import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createRequest } from 'src/utils';

const baseUrl = 'https://api.coingecko.com/api/v3';

export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getExchangeRateList: builder.query({
      query: () => createRequest(`/exchange_rates`),
    }),
  }),
});

export const { useGetExchangeRateListQuery } = currencyApi;

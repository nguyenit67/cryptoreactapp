import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import createRequest from 'src/helpers/createRequest';

// const exchangeApiHeaders = {
//   'x-rapidapi-host': 'coingecko.p.rapidapi.com',
//   'x-rapidapi-key': '248c3ec71amsh2c89a3ef99fcf97p19ab04jsn10b87d042901',
// };

const baseUrl = 'https://api.coingecko.com/api/v3';

export const exchangeApi = createApi({
  reducerPath: 'exchangeApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getExchanges: builder.query({
      query: () => createRequest(`/exchanges`),
    }),
  }),
});

export const { useGetExchangesQuery } = exchangeApi;

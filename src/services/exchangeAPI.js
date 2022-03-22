import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { createRequest } from 'src/utils';

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
      query: ({ page, per_page }) =>
        createRequest(
          `/exchanges`,
          {},
          {
            page,
            per_page,
          }
        ),
      transformResponse: (response, _meta, arg) => {
        console.log('inside /exchanges', { arg });

        // const count = axios.get(`${baseUrl}/exchanges/list`);

        // console.log('axios /exchanges/list', count);

        return {
          data: response,
          pagination: {
            page: arg.page,
            limit: arg.per_page,
            // total: count,
          },
        };
      },
    }),
    getExchangesCount: builder.query({
      query: () => createRequest(`/exchanges/list`),
      transformResponse: (response) => {
        console.log('transformResponse', response);
        return Number(response?.length) || 0;
      },
    }),
  }),
});

export const { useGetExchangesQuery, useGetExchangesCountQuery } = exchangeApi;

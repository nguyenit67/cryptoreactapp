import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createRequest } from 'src/utils';

const cryptoNewsHeaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
  'x-rapidapi-key': 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA',
  // 'x-rapidapi-key': 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA',
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest('/news/search', cryptoNewsHeaders, {
          q: newsCategory,
          safeSearch: 'Off',
          textFormat: 'Raw',
          freshness: 'Day',
          count,
        }),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

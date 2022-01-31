import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from 'src/services/cryptoApi';
import { cryptoNewsApi } from 'src/services/cryptoNewsApi';
import { currencyApi } from 'src/services/currencyApi';
import { exchangeApi } from 'src/services/exchangeAPI';

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [exchangeApi.reducerPath]: exchangeApi.reducer,
    [currencyApi.reducerPath]: currencyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cryptoApi.middleware,
      cryptoNewsApi.middleware,
      exchangeApi.middleware,
      currencyApi.middleware
    ),
});

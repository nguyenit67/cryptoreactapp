import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from 'src/services/cryptoApi';
import { cryptoNewsApi } from 'src/services/cryptoNewsApi';

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
});

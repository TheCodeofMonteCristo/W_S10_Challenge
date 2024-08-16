import { configureStore } from '@reduxjs/toolkit'

import ordersReducer from './ordersSlice'
import { ordersApi } from './ordersApi' 





export const resetStore = () => configureStore({
    reducer: {
        orders: ordersReducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
    // add your reducer(s) here
  },
    middleware: getDefault => getDefault().concat(
        ordersApi.middleware,
        // if using RTK Query for your networking: add your middleware here
        // if using Redux Thunk for your networking: you can ignore this
    ),
})

export const store = resetStore()

import { configureStore } from '@reduxjs/toolkit'
import tablesReducer from './tablesSlice'

const store = configureStore({
  reducer: {
    tables: tablesReducer
  }
});

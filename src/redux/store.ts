import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import companyReducer from './Slices/companySlice';
import topicReducer from './Slices/topicSlice';
import questionReducer from './Slices/questionSlice';
import tableReducer from './Slices/tableSlice';
import databaseReducer from './Slices/databaseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    topic: topicReducer,
    question: questionReducer,
    table: tableReducer,
    database: databaseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
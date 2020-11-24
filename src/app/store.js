import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../redux/blogSlice';

export default configureStore({
  reducer: {
    blog: blogReducer,
  },
});

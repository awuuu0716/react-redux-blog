import { createSlice } from '@reduxjs/toolkit';
import { getPaginatePosts, getMe, login as loginAPI } from '../WebAPI';
import { createPaginateArr, setAuthToken } from '../utils';

export const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    paginate: [],
    userData: null,
    isLodingUser: false,
    loginResponse: null,
    errorMessage: '',
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPaginate: (state, action) => {
      state.paginate = action.payload;
    },
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setIsLodingUser: (state, action) => {
      state.isLodingUser = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setLoginResponse: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setPosts,
  setPaginate,
  setUser,
  setIsLodingUser,
  setErrorMessage,
  setLoginResponse,
} = blogSlice.actions;

export const getPosts = (page) => (dispatch) => {
  getPaginatePosts(page)
    .then((res) => {
      const cloneResponse = res.clone();
      const totalPages = Math.ceil(
        cloneResponse.headers.get('x-total-count') / 5
      );
      dispatch(setPaginate(createPaginateArr(totalPages)));
      return res.json();
    })
    .then((posts) => {
      dispatch(setPosts(posts));
    });
};

export const getUser = () => (dispatch) => {
  getMe().then((res) => {
    if (res.ok) dispatch(setUser(res.data));
    dispatch(setIsLodingUser(false));
  });
};

export const login = (username, password) => (dispatch) => {
  return loginAPI(username, password).then((data) => {
    if (data.ok === 0) {
      dispatch(setErrorMessage(data.message));
      return;
    }
    setAuthToken(data.token);
    return getMe().then((res) => {
      if (res.ok !== 1) {
        dispatch(setErrorMessage(res.toString()));
        return;
      }
      dispatch(setUser(res.data));
      return res;
    });
  });
};

export const selectPosts = (state) => state.blog.posts;
export const selectPaginate = (state) => state.blog.paginate;
export const selectUser = (state) => state.blog.userData;
export const selectIsLodingUser = (state) => state.blog.isLodingUser;
export const selectErrorMessage = (state) => state.blog.errorMessage;

export default blogSlice.reducer;

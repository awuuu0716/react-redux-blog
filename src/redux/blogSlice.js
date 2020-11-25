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
  },
});

export const {
  setPosts,
  setPaginate,
  setUser,
  setIsLodingUser,
  setErrorMessage,
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
  loginAPI(username, password).then((data) => {
    // 錯誤處理
    if (data.ok === 0) {
      setErrorMessage(data.message);
      return;
    }
    setAuthToken(data.token);
    getMe().then((res) => {
      // handleError
      if (response.ok !== 1) {
        setErrorMessage(res.toString());
        return;
      }
      dispatch(setUser(res.data));
      dispatch(setIsSubmit(false));
    });
  });
};

export const selectPosts = (state) => state.blog.posts;
export const selectPaginate = (state) => state.blog.paginate;
export const selectUser = (state) => state.blog.userData;
export const selectIsLodingUser = (state) => state.blog.isLodingUser;

export default blogSlice.reducer;

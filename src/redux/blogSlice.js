import { createSlice } from '@reduxjs/toolkit';
import { getPaginatePosts, getMe } from '../WebAPI';
import { createPaginateArr } from '../utils';

export const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    paginate: [],
    userData: null,
    isLodingUser: false,
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
  },
});

export const {
  setPosts,
  setPaginate,
  setUser,
  setIsLodingUser,
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

export const selectPosts = (state) => state.blog.posts;
export const selectPaginate = (state) => state.blog.paginate;
export const selectUser = (state) => state.blog.userData;
export const selectIsLodingUser = (state) => state.blog.isLodingUser;

export default blogSlice.reducer;

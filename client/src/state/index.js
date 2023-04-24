import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  posts: [],
  canvases: [],
  draftItems: [],
  itemForCanvas : null,
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFollow: (state, action) => {
      if (state.user) {
        state.user.followings = [
          ...state.user.followings,
          action.payload.userId,
        ];
      } else {
        console.error("user followings non existent");
      }
    },
    setUnfollow: (state, action) => {
      if (state.user) {
        state.user.followings = state.user.followings.filter(
          (following) => following !== action.payload.userId
        );
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setCanvases: (state, action) => {
      state.canvases = action.payload.canvases;
    },
    setCanvas: (state, action) => {
      const updatedCanvases = state.canvases.map((canvas) => {
        if (canvas._id === action.payload.canvas._id)
          return action.payload.canvas;
        return canvas;
      });
      state.canvases = updatedCanvases;
    },
    setDraftItems: (state, action) => {
      state.draftItems = action.payload.draftItems;
    },
    setItemForCanvas: (state, action) => {
      state.itemForCanvas = action.payload.itemForCanvas;
    },
    setAddRemoveFavourites: (state, action) => {
      if (state.user) {
        state.user.favourites = action.payload.favourites;
      } else {
        console.error("user friends non-existent :(");
      }
    },
  },
});

export const {
  setFollow,
  setUnfollow,
  setLogin,
  setLogout,
  setPost,
  setPosts,
  setCanvas,
  setCanvases,
  setDraftItems,
  setAddRemoveFavourites,
  setItemForCanvas,
} = authSlice.actions;
export default authSlice.reducer;

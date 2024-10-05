import { createSlice } from "@reduxjs/toolkit";
import { getAllComments, getAllPosts } from "../../action/postAction";

const initialState = {
  posts: [],
  isError: false,
  postfetched: false,
  isLoading: false,
  loggedIn: false,
  message: "",
  comments: [],
  postId: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: () => initialState,
    resetPostId: (state) => {
      state.postId = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching all the posts...";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.postfetched = true;
        state.posts = action.payload.posts.reverse();
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        console.log("Payload received:", action.payload);
        state.postId = action.payload.post_id;
      });
  },
});

export  const { reset, resetPostId } = postSlice.actions;

export default postSlice.reducer;





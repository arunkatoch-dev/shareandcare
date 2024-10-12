import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendURL } from "../../constants";

const initialState = {
  isAddQuestionPending: false,
  isCreatingPostPending: false,
  isHomepageFeedPending: false,
  isAddingNewAnsPending: false,
  togglePostsWindow: false,
  toggleAddAnswerWindow: false,
  addQuestionWindow: false,
  addPostWindow: false,
  questionId: "",
  homepageFeedData: [],
  defaultPage: 1,
  hasMore: true,
  profileDisplay: true, // userProfile component profile section display.
  questionsByYouDisplay: false,
  answersByYouDisplay: false,
  postsByYouDisplay: false,
};
const homepageSlice = createSlice({
  name: "homepage Slice",
  initialState: initialState,
  reducers: {
    togglePostsWindowReducer: (state, action) => {
      state.togglePostsWindow = action.payload;
    },
    toggleQueNdPostWindowReducer: (state, action) => {
      state.addQuestionWindow = action.payload.addQuestionWindow;
      state.addPostWindow = action.payload.addPostWindow;
    },
    toggleAddAnswerWindowReducer: (state, action) => {
      const { questionId, answerWindowDisplay } = action.payload;
      state.toggleAddAnswerWindow = answerWindowDisplay;
      state.questionId = questionId;
    },
    toggleUserProfileMenusReducer: (state, action) => {
      const {
        profileDisplay,
        questionsByYouDisplay,
        answersByYouDisplay,
        postsByYouDisplay,
      } = action.payload;
      state.profileDisplay = profileDisplay;
      state.questionsByYouDisplay = questionsByYouDisplay;
      state.answersByYouDisplay = answersByYouDisplay;
      state.postsByYouDisplay = postsByYouDisplay;
    },
  },

  extraReducers: (builder) => {
    //    Add Question  ---------->>>>>>>>
    builder.addCase(addQuestion.pending, (state) => {
      state.isAddQuestionPending = true;
    });
    builder.addCase(addQuestion.fulfilled, (state, action) => {
      state.isAddQuestionPending = false;
      state.togglePostsWindow = false;
      alert(action.payload.msg);
    });
    builder.addCase(addQuestion.rejected, (state) => {
      state.isAddQuestionPending = false;
      window.alert(`Oops something went wrong plz try again`);
    });

    //    Create Post  ---------->>>>>>>>
    builder.addCase(createPost.pending, (state) => {
      state.isCreatingPostPending = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isCreatingPostPending = false;
      state.togglePostsWindow = false;
      alert(action.payload.msg);
    });
    builder.addCase(createPost.rejected, (state) => {
      state.isCreatingPostPending = false;
      window.alert(`Oops something went wrong plz try again`);
    });

    //    Add New Answer  ---------->>>>>>>>
    builder.addCase(addNewAnswer.pending, (state) => {
      state.isAddingNewAnsPending = true;
    });
    builder.addCase(addNewAnswer.fulfilled, (state, action) => {
      state.isAddingNewAnsPending = false;
      state.toggleAddAnswerWindow = false;
      if (action.payload.msg === "success") {
        alert("Answer added Successfully..");
      }
    });
    builder.addCase(addNewAnswer.rejected, (state) => {
      state.isAddingNewAnsPending = false;
      window.alert(`Oops something went wrong plz try again`);
    });

    //    Homepage Feed Data Fetching  ---------->>>>>>>>
    builder.addCase(fetchHomepageFeed.pending, (state) => {
      state.isHomepageFeedPending = true;
    });
    builder.addCase(fetchHomepageFeed.fulfilled, (state, action) => {
      const { feedData } = action.payload;
      if (feedData.length < 1) {
        state.hasMore = false;
      }
      state.isHomepageFeedPending = false;
      state.defaultPage += 1;
      state.homepageFeedData = [...feedData, ...state.homepageFeedData];
    });
    builder.addCase(fetchHomepageFeed.rejected, (state) => {
      state.isHomepageFeedPending = false;
      window.alert(`Oops something went wrong plz try again`);
    });
  },
});

// Add New Question------>>>>>>
export const addQuestion = createAsyncThunk("AddQuestion", async (details) => {
  const addQuestion = await axios.post(`${backendURL}/question`, details, {
    credentials: "include",
    withCredentials: true,
  });
  return await addQuestion.data;
});

// Add New Post ---- >>>>>>>
export const createPost = createAsyncThunk("createPost", async (details) => {
  const createPost = await axios.post(`${backendURL}/post`, details, {
    credentials: "include",
    withCredentials: true,
  });
  return await createPost.data;
});

// Add New Answer ---- >>>>>>>
export const addNewAnswer = createAsyncThunk(
  "addNewAnswer",
  async (details) => {
    const addNewAnswer = await axios.put(`${backendURL}/question`, details, {
      credentials: "include",
      withCredentials: true,
    });
    return await addNewAnswer.data;
  }
);

// fetchHomepageFeed ---- >>>>>>>
export const fetchHomepageFeed = createAsyncThunk(
  "fetchHomepageFeed",
  async ({ defaultPage }) => {
    const fetchHomepageFeed = await axios.get(
      `${backendURL}/feed?page=${defaultPage}`,
      {
        credentials: "include",
        withCredentials: true,
      }
    );
    return await fetchHomepageFeed.data;
  }
);

export const {
  togglePostsWindowReducer,
  toggleQueNdPostWindowReducer,
  toggleAddAnswerWindowReducer,
  toggleUserProfileMenusReducer,
} = homepageSlice.actions;
export default homepageSlice.reducer;

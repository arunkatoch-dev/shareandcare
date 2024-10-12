import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendURL } from "../../constants";

const initialState = {
  isProfileMenuLoading: false,
  isQuestionsMenuLoading: false,
  isAnswersMenuLoading: false,
  isPostsMenuLoading: false,
  isDeleteQuestionLoading: false,
  isDeleteAnswerLoading: false,
  isDeletePostLoading: false,
  isanswerUpdationLoading: false,
  isPostUpdationLoading: false,
  hasMoreProfileMenuData: true,
  hasMoreQuestionsMenuData: true,
  hasMoreAnswersMenuData: true,
  hasMorePostsMenuData: true,
  defaultProfileMenuPage: 1,
  defaultQuestionsMenuPage: 1,
  defaultAnswersMenuPage: 1,
  defaultPostsMenuPage: 1,
  userProfileMenuData: [],
  userQuestionsMenuData: [],
  userAnswersMenuData: [],
  userPostsMenuData: [],
  createSpaceWindow: false,
  deleteDialogWindow: false,
  deleteAnswerDialogWindow: false,
  deletePostDialogWindow: false,
  editDialogWindow: false, // edit question dialog window
  editAnswerDialogWindow: false,
  editPostDialogWindow: false,
  questionToDeleteDetails: { questionId: "", question: "" },
  answerToDeleteDetails: {
    questionId: "",
    question: "",
    answer: "",
    answerId: "",
  },
  questionToEditDetails: { questionId: "", question: "" },
  postToDeleteDetails: { _id: "", postBy: "", post: "" },
  answerToEditDetails: {
    questionId: "",
    answerId: "",
    answer: "",
    question: "",
  },
  postToEditDetails: { _id: "", post: "", postBy: "" },
  isQuestionUpdationLoading: false,
};
const userProfileSlice = createSlice({
  name: "userProfileSlice",
  initialState: initialState,
  reducers: {
    toggleCreateSpaceWindow: (state, action) => {
      state.createSpaceWindow = action.payload;
    },
    toggleDeleteDialogBox: (state, action) => {
      state.deleteDialogWindow = action.payload;
    },
    toggleDeleteAnswerDialogBox: (state, action) => {
      state.deleteAnswerDialogWindow = action.payload;
    },
    togglePostDeleteDialogbox: (state, action) => {
      state.deletePostDialogWindow = action.payload;
    },

    deleteQuestionDetails: (state, action) => {
      const { questionId, question } = action.payload;
      state.questionToDeleteDetails = { questionId, question };
    },
    deletePostDetails: (state, action) => {
      const { _id, postBy, post } = action.payload;
      state.postToDeleteDetails = { _id, postBy, post };
    },
    deleteAnswerDetails: (state, action) => {
      const { questionId, question, answer, answerId } = action.payload;
      state.answerToDeleteDetails = {
        questionId,
        question,
        answer,
        answerId,
      };
    },

    toggleEditDialogbox: (state, action) => {
      state.editDialogWindow = action.payload;
    },
    toggleAnswerEditDialogbox: (state, action) => {
      state.editAnswerDialogWindow = action.payload;
    },
    togglePostEditDialogbox: (state, action) => {
      state.editPostDialogWindow = action.payload;
    },

    editQuestionDetails: (state, action) => {
      const { questionId, question } = action.payload;
      state.questionToEditDetails = { questionId, question };
    },
    editAnswerDetails: (state, action) => {
      const { questionId, answerId, answer, question } = action.payload;
      state.answerToEditDetails = { questionId, answerId, answer, question };
    },
    editPostDetails: (state, action) => {
      const { post, _id, postBy } = action.payload;
      state.postToEditDetails = { post, _id, postBy };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfileMenuFeed.pending, (state) => {
      state.isProfileMenuLoading = true;
    });
    builder.addCase(fetchUserProfileMenuFeed.fulfilled, (state, action) => {
      const { userProfileFeed } = action.payload;
      if (userProfileFeed.length < 1) {
        state.hasMoreProfileMenuData = false;
      }
      state.isProfileMenuLoading = false;
      state.defaultProfileMenuPage += 1;
      state.userProfileMenuData = [
        ...state.userProfileMenuData,
        ...userProfileFeed,
      ];
    });
    builder.addCase(fetchUserProfileMenuFeed.rejected, (state) => {
      state.isProfileMenuLoading = false;
      window.alert(`Oops something went wrong plz try again`);
    });
    builder.addCase(fetchUserQuestionMenuFeed.pending, (state) => {
      state.isQuestionsMenuLoading = true;
    });
    builder.addCase(fetchUserQuestionMenuFeed.fulfilled, (state, action) => {
      const { questionsByUser } = action.payload;
      if (questionsByUser.length < 1) {
        state.hasMoreQuestionsMenuData = false;
      }
      state.isQuestionsMenuLoading = false;
      state.defaultQuestionsMenuPage += 1;
      state.userQuestionsMenuData = [
        ...state.userQuestionsMenuData,
        ...questionsByUser,
      ];
    });
    builder.addCase(fetchUserQuestionMenuFeed.rejected, (state) => {
      state.isQuestionsMenuLoading = false;
      window.alert(`Oops something went wrong plz try again`);
    });
    // +-+-+-+-+-+-+-+-+-+     Update Question       -+-+-+-+-+-+-+-+-+-
    builder.addCase(questionUpdation.pending, (state) => {
      state.isQuestionUpdationLoading = true;
    });
    builder.addCase(questionUpdation.fulfilled, (state, action) => {
      const { msg, details } = action.payload;
      if (msg === "success") {
        state.isQuestionUpdationLoading = false;
        state.editDialogWindow = false;
        window.alert(details);
      }
    });
    builder.addCase(questionUpdation.rejected, (state) => {
      state.isQuestionUpdationLoading = false;
      window.alert(`Oops something went wrong plz try again`);
    });
    // +-+-+-+-+-+--+--+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    builder.addCase(fetchUserAnswersMenuFeed.pending, (state) => {
      state.isAnswersMenuLoading = true;
    });
    builder.addCase(fetchUserAnswersMenuFeed.fulfilled, (state, action) => {
      const { answersByUser } = action.payload;
      if (answersByUser.length < 1) {
        state.hasMoreAnswersMenuData = false;
      }
      state.isAnswersMenuLoading = false;
      state.defaultAnswersMenuPage += 1;
      state.userAnswersMenuData = [
        ...state.userAnswersMenuData,
        ...answersByUser,
      ];
    });
    builder.addCase(fetchUserAnswersMenuFeed.rejected, (state) => {
      state.isAnswersMenuLoading = false;
      window.alert(`Oops something went wrong plz try again`);
    });
    //   +-+-+-+- Posts +-+-+-+-+-+-+-+-

    builder.addCase(fetchUserPostsMenuFeed.pending, (state) => {
      state.isPostsMenuLoading = true;
    });
    builder.addCase(fetchUserPostsMenuFeed.fulfilled, (state, action) => {
      const { postsByUser } = action.payload;
      if (postsByUser.length < 1) {
        state.hasMorePostsMenuData = false;
      }
      state.isPostsMenuLoading = false;
      state.defaultPostsMenuPage += 1;
      state.userPostsMenuData = [...state.userPostsMenuData, ...postsByUser];
    });
    builder.addCase(fetchUserPostsMenuFeed.rejected, (state) => {
      state.isPostsMenuLoading = false;
      window.alert(`Oops something went wrong plz try again`);
    });

    // +-+-+-+-+-+-+-+-+-+     Update Post       -+-+-+-+-+-+-+-+-+-
    builder.addCase(postUpdation.pending, (state) => {
      state.isPostUpdationLoading = true;
    });
    builder.addCase(postUpdation.fulfilled, (state, action) => {
      const { msg, details } = action.payload;
      if (msg === "success") {
        state.isPostUpdationLoading = false;
        state.editPostDialogWindow = false;
        window.alert(details);
      }
    });
    builder.addCase(postUpdation.rejected, (state) => {
      state.isPostUpdationLoading = false;
      window.alert(`Oops something went wrong plz try again`);
    });

    // *-*-*-*-*-*-*-*-*-* Delete Question -*-*-*-*-*-*/-*-*-*-*-*-*
    builder.addCase(deleteQuestionByUser.pending, (state) => {
      state.isDeleteQuestionLoading = true;
    });
    builder.addCase(deleteQuestionByUser.fulfilled, (state, action) => {
      state.isDeleteQuestionLoading = false;
      if (action.payload.msg === "success") {
        state.deleteDialogWindow = false;
        window.alert(
          `question deleted successfully. Refresh page to watch results`
        );
      }
    });
    builder.addCase(deleteQuestionByUser.rejected, (state) => {
      state.isDeleteQuestionLoading = false;
      window.alert(`Oops something went wrong plz try again`);
    });

    // +-+-+-+-+-+-+-+-+-+     Update Answer       -+-+-+-+-+-+-+-+-+-
    builder.addCase(answerUpdation.pending, (state) => {
      state.isanswerUpdationLoading = true;
    });
    builder.addCase(answerUpdation.fulfilled, (state, action) => {
      const { msg, details } = action.payload;
      if (msg === "success") {
        state.isanswerUpdationLoading = false;
        state.editAnswerDialogWindow = false;
        window.alert(details);
      }
    });
    builder.addCase(answerUpdation.rejected, (state) => {
      state.isanswerUpdationLoading = false;
      window.alert(`Oops something went wrong plz try again`);
    });

    // *-*-*-*-*-*-*-*-*-* Delete Answer -*-*-*-*-*-*/-*-*-*-*-*-*
    builder.addCase(deleteAnswerByUser.pending, (state) => {
      state.isDeleteAnswerLoading = true;
    });
    builder.addCase(deleteAnswerByUser.fulfilled, (state, action) => {
      state.isDeleteAnswerLoading = false;
      if (action.payload.msg === "success") {
        state.deleteAnswerDialogWindow = false;
        window.alert(
          `Anser deleted successfully. Refresh page to watch results`
        );
      }
    });
    builder.addCase(deleteAnswerByUser.rejected, (state) => {
      state.isDeleteAnswerLoading = false;
      window.alert(`Oops something went wrong plz try again`);
    });

    // *-*-*-*-*-*-*-*-*-* Delete Post -*-*-*-*-*-*/-*-*-*-*-*-*

    builder.addCase(deletePostByUser.pending, (state) => {
      state.isDeletePostLoading = true;
    });
    builder.addCase(deletePostByUser.fulfilled, (state, action) => {
      state.isDeletePostLoading = false;
      if (action.payload.msg === "success") {
        state.deletePostDialogWindow = false;
        window.alert(
          `Post deleted successfully. Refresh page to watch results`
        );
      }
    });
    builder.addCase(deletePostByUser.rejected, (state) => {
      state.isDeletePostLoading = false;
      window.alert(`Oops something went wrong plz try again`);
    });
  },
});

// User Profile Menu Feed ---- >>>>>>>
export const fetchUserProfileMenuFeed = createAsyncThunk(
  "fetchUserProfileMenuFeed",
  async ({ defaultPage, userEmail }) => {
    const fetchUserProfileMenuFeed = await axios.post(
      `${backendURL}/userProfile?page=${defaultPage}`,
      { userEmail },
      {
        credentials: "include",
        withCredentials: true,
      }
    );
    return await fetchUserProfileMenuFeed.data;
  }
);
// User Questions Menu Feed ---- >>>>>>>
export const fetchUserQuestionMenuFeed = createAsyncThunk(
  "fetchUserQuestionMenuFeed",
  async ({ defaultPage, userEmail }) => {
    const fetchUserQuestionMenuFeed = await axios.post(
      `${backendURL}/userProfileQuestions?page=${defaultPage}`,
      { userEmail },
      {
        credentials: "include",
        withCredentials: true,
      }
    );
    return await fetchUserQuestionMenuFeed.data;
  }
);
// User Update Question (User Profile Section) ---- >>>>>>>
export const questionUpdation = createAsyncThunk(
  "questionUpdation",
  async ({ questionId, question }) => {
    const questionUpdation = await axios.patch(
      `${backendURL}/userProfileQuestions`,
      { questionId, question },
      {
        credentials: "include",
        withCredentials: true,
      }
    );
    return await questionUpdation.data;
  }
);
// User Delete Question ---- >>>>>>>
export const deleteQuestionByUser = createAsyncThunk(
  "deleteQuestionByUser",
  async ({ _id }) => {
    const deleteQuestionByUser = await axios.delete(
      `${backendURL}/userProfileQuestions/${_id}`,
      {
        credentials: "include",
        withCredentials: true,
      }
    );
    return await deleteQuestionByUser.data;
  }
);

// User Update Answer ----->>>>>>>
export const answerUpdation = createAsyncThunk(
  "answerUpdation",
  async ({ questionId, answer, answerId }) => {
    const answerUpdation = await axios.patch(
      `${backendURL}/userProfileAnswers`,
      { questionId, answer, answerId },
      {
        credentials: "include",
        withCredentials: true,
      }
    );
    return await answerUpdation.data;
  }
);

// User Delete Answer ---- >>>>>>>
export const deleteAnswerByUser = createAsyncThunk(
  "deleteAnswerByUser",
  async ({ _id, answerId }) => {
    const deleteAnswerByUser = await axios.delete(
      `${backendURL}/userProfileAnswers/${_id}/${answerId}`,
      {
        credentials: "include",
        withCredentials: true,
      }
    );
    return await deleteAnswerByUser.data;
  }
);
// User Answers Menu Feed ---- >>>>>>>
export const fetchUserAnswersMenuFeed = createAsyncThunk(
  "fetchUserAnswersMenuFeed",
  async ({ defaultPage, userEmail }) => {
    const fetchUserAnswersMenuFeed = await axios.post(
      `${backendURL}/userProfileAnswers?page=${defaultPage}`,
      { userEmail },
      {
        credentials: "include",
        withCredentials: true,
      }
    );
    return await fetchUserAnswersMenuFeed.data;
  }
);
// User posts Menu Feed ---- >>>>>>>
export const fetchUserPostsMenuFeed = createAsyncThunk(
  "fetchUserPostsMenuFeed",
  async ({ defaultPage, userEmail }) => {
    const fetchUserPostsMenuFeed = await axios.post(
      `${backendURL}/userProfilePosts?page=${defaultPage}`,
      { userEmail },
      {
        credentials: "include",
        withCredentials: true,
      }
    );
    return await fetchUserPostsMenuFeed.data;
  }
);

// User Update Post ----->>>>>>>
export const postUpdation = createAsyncThunk(
  "postUpdation",
  async ({ _id, post }) => {
    const postUpdation = await axios.patch(
      `${backendURL}/userProfilePosts`,
      { _id, post },
      {
        credentials: "include",
        withCredentials: true,
      }
    );
    return await postUpdation.data;
  }
);

// User Delete Post ---- >>>>>>>
export const deletePostByUser = createAsyncThunk(
  "deletePostByUser",
  async ({ _id }) => {
    const deletePostByUser = await axios.delete(
      `${backendURL}/userProfilePosts/${_id}`,
      {
        credentials: "include",
        withCredentials: true,
      }
    );
    return await deletePostByUser.data;
  }
);

export const {
  toggleDeleteDialogBox,
  toggleDeleteAnswerDialogBox,
  togglePostDeleteDialogbox,
  deleteQuestionDetails,
  deletePostDetails,
  deleteAnswerDetails,
  toggleCreateSpaceWindow,
  toggleEditDialogbox,
  toggleAnswerEditDialogbox,
  togglePostEditDialogbox,
  editQuestionDetails,
  editAnswerDetails,
  editPostDetails,
} = userProfileSlice.actions;
export default userProfileSlice.reducer;

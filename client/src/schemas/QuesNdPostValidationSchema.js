import * as Yup from "yup";

export const addQuestionValidation = Yup.object({
  addQuestion: Yup.string()
    .min(10, "question length must be greater than 10 chars.")
    .required("Type something to Add"),
});
export const createPostValidation = Yup.object({
  createPost: Yup.string()
    .min(100, "type min 100 chars to Post.")
    .required("type something to Post"),
});
export const addAnswerValidation = Yup.object({
  addAnswer: Yup.string().required("Answer cannot be empty"),
});

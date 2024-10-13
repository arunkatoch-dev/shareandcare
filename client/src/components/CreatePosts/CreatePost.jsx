/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  togglePostsWindowReducer,
} from "../../slices/homepageSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { createPostValidation } from "../../schemas/QuesNdPostValidationSchema";

const CreatePost = () => {
  const { userName, userEmail } =
  useSelector((state) => state.authSlice);
  const [createPostVal, setCreatePostVal] = useState("");
  const dispatch = useDispatch();
  const changeInputFunc = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setCreatePostVal((createPostVal) => (createPostVal = value));
  };
  const onCancelHandler = (e) => {
    e.preventDefault();
    setCreatePostVal((createPostVal) => (createPostVal = ""));
    dispatch(togglePostsWindowReducer(false));
  };
  return (
    <Formik
      initialValues={{
        createPost: "",
      }}
      validationSchema={createPostValidation}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          const d = new Date();
          let day = d.getDate();
          let month = d.getMonth() + 1;
          let year = d.getFullYear();
          let fullDate = `${day}-${month}-${year}`;
          dispatch(
            createPost({
              post: values.createPost,
              postBy: userName,
              postOn: fullDate,
              postByUserId: userEmail,
            })
          );
          // alert(JSON.stringify(values, null, 2));
          
          setSubmitting(false);
          resetForm();
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form
          autoComplete="off"
          className="w-full h-full flex items-center justify-between flex-col p-2"
        >
          <Field
            type="text"
            component="textarea"
            autoComplete="off"
            name="createPost"
            className="w-full h-full outline-none text-lg p-2 font-light resize-none hover:border-blue-500"
            placeholder="say something..."
          />
          <ErrorMessage
            name="createPost"
            component="div"
            className="text-sm text-red-700 flex items-center justify-center py-2"
          />
          <div className="w-full flex items-center justify-end gap-3 border-t border-t-gray-300 pt-3">
            <button
              className="text-base text-gray-700  hover:text-gray-800"
              onClick={onCancelHandler}
            >
        
              Cancel
            </button>
            <button
              type="submit"
              className="text-base px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePost;

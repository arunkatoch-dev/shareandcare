import { useDispatch, useSelector } from "react-redux";
import {
  addQuestion,
  togglePostsWindowReducer,
} from "../../slices/homepageSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addQuestionValidation } from "../../schemas/QuesNdPostValidationSchema";

const AddQuestion = () => {
  const { userName, userEmail } =
    useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const onCancelHandler = (e) => {
    e.preventDefault();
    dispatch(togglePostsWindowReducer(false));
  };
  return (
    <Formik
      initialValues={{
        addQuestion: "",
      }}
      validationSchema={addQuestionValidation}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          const d = new Date();
          let day = d.getDate();
          let month = d.getMonth() + 1;
          let year = d.getFullYear();
          let fullDate = `${day}-${month}-${year}`;

          dispatch(
            addQuestion({
              question: values.addQuestion,
              questionBy: userName,
              questionByUserId: userEmail,
              dateStamp: fullDate,
            })
          );

          setSubmitting(false);
          resetForm();
        }, 2000);
      }}
    >
      {({ isSubmitting }) => (
        <Form
          autoComplete="off"
          className="w-full h-full flex items-center justify-between flex-col p-2"
        >
          <Field
            type="text"
            autoComplete="off"
            name="addQuestion"
            className="w-full h-12 outline-none text-lg p-2 border-b border-b-gray-300 font-light hover:border-blue-500"
            placeholder={`Start your Question with "What", "How", "Why", etc.`}
          />
          <ErrorMessage
            name="addQuestion"
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
              {isSubmitting ? "Adding..." : "Add question"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddQuestion;

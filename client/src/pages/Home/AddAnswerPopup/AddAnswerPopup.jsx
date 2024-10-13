import {
  addNewAnswer,
  toggleAddAnswerWindowReducer,
} from "../../../slices/homepageSlice";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addAnswerValidation } from "../../../schemas/QuesNdPostValidationSchema";

const AddAnswerPopup = () => {
  const dispatch = useDispatch();
  const { userName, userEmail } =
    useSelector((state) => state.authSlice);
  const questionId = useSelector((state) => state.homepageSlice.questionId);
  const closePopUpWindow = (e) => {
    e.preventDefault();
    dispatch(toggleAddAnswerWindowReducer({ answerWindowDisplay: false }));
  };

  return (
    <div className="w-full h-screen flex items-center justify-center backdrop-blur-sm bg-black/75 fixed top-0 left-0">
      <div className="w-[730px] h-[400px] bg-white rounded-lg flex flex-col p-2">
        <Formik
          initialValues={{
            addAnswer: "",
          }}
          validationSchema={addAnswerValidation}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              const d = new Date();
              let day = d.getDate();
              let month = d.getMonth() + 1;
              let year = d.getFullYear();
              let fullDate = `${day}-${month}-${year}`;

              dispatch(
                addNewAnswer({
                  id: questionId,
                  answer: values.addAnswer,
                  answerBy: userName,
                  answerOn: fullDate,
                  answerByUserId: userEmail,
                })
              );
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
                name="addAnswer"
                className="w-full outline-none px-4 pt-5 border-b hover:border-b-blue-500 text-gray-700 text-lg font-light"
                placeholder="=> Write your answer here."
              />
              <ErrorMessage
                name="addAnswer"
                component="div"
                className="text-sm text-red-700 flex items-center justify-center py-2"
              />
              <div className="w-full flex items-center justify-end gap-3 border-t border-t-gray-300 pt-3">
                <button
                  className="text-base text-gray-700  hover:text-gray-800"
                  onClick={closePopUpWindow}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-base px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Answer"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddAnswerPopup;

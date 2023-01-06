import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { files } from "@/store/common/actions";

export function FileUpload({ onClick }) {
  const dispatch = useDispatch();

  function onFilesUpload(event) {
    const {
      target: { files },
    } = event;
    setFieldValue("files", Object.values(files));
    handleSubmit();
  }

  const initialValues = {
    files: [],
  };

  const validationSchema = Yup.object().shape({
    files: Yup.array()
      .of(
        Yup.mixed().test("fileFormat", "Invalid file format", (value) => {
          if (value) {
            return Promise.resolve(
              ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
            );
          }
          return true;
        })
      )
      .max(2, "Cannot select more than 2 attachments"),
  });

  const FormikVal = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const filesURL = values.files.map((item) => URL.createObjectURL(item));
      console.log(filesURL, errors);
      dispatch(files.save(filesURL));
    },
  });

  const { values, errors, handleSubmit, setFieldValue } = FormikVal;

  return (
    <div>
      <label htmlFor="file-input">Select Files:</label>
      <input
        name="files"
        type="file"
        id="file-input"
        max={2}
        onInput={(event) => {
          onFilesUpload(event);
        }}
        multiple
        accept="image/jpeg,image/png,application/pdf"
      />
      <div>
        {errors.files
          ? Array.isArray(errors.files) && errors.files.length
            ? errors.files.find((val) => val != null)
            : errors.files
          : values.files.length > 0
          ? "Files Selected : " + values.files.length
          : ""}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles.css";
import RadioButtonGroup from "./RadioButtonGroup";
import { Form } from "reactstrap";
import Select from "react-select";

export function FormThree() {
  const initialValues = {
    FileName: "",
    po: "",
    requiredFormat: "",
    colors: "",
    blending: "no",
    rush: "no",
    additionalInstructions: "",
    files: [],
  };

  const [isSubmit, setSubmit] = useState(false);
  const [isAlertVisible, setAlertVisiblity] = useState(false);

  const validationSchema = Yup.object().shape({
    FileName: Yup.string().required("File Name is required"),
    po: Yup.string().required("PO Input is required"),
    requiredFormat: Yup.string().required("Required format is required"),
    colors: Yup.string().required("Colors is required"),
    blending: Yup.string().required("Blending is required"),
    rush: Yup.string().required("Rush is required"),
    additionalInstructions: Yup.string().max(
      500,
      "Additional instructions must be 500 characters or less"
    ),
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
    onSubmit: (values) => {},
  });

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const { values, errors, handleSubmit, handleChange, handleBlur, setFieldValue } = FormikVal;

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmit(true);
        handleSubmit();
      }}
    >
      <div>
        <label>FileName : </label>
        <input
          type="text"
          name="FileName"
          value={values.FileName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isSubmit && errors.FileName && <div>{errors.FileName}</div>}
      </div>
      <div>
        <label>PO Input: </label>
        <input
          type="text"
          name="po"
          value={values.po}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isSubmit && errors.po && <div>{errors.po}</div>}
      </div>

      <div>
        <Select
          name="requiredFormat"
          placeholder="Required Format"
          styles={{
            placeholder: (base) => ({
              ...base,
              fontSize: "1em",
              color: "#A5B2C4",
              fontWeight: 400,
            }),
          }}
          value={values.requiredFormat.value}
          onChange={(e) => {
            FormikVal.setFieldValue("requiredFormat", e.value);
          }}
          options={options}
        />
        {isSubmit && errors.requiredFormat && <div>{errors.requiredFormat}</div>}
      </div>

      <div>
        <label>Colors : </label>

        <input
          type="text"
          name="colors"
          value={values.colors}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isSubmit && errors.colors && <div>{errors.colors}</div>}
      </div>
      <div>
        <label>Additional Instructions : </label>

        <textarea
          name="additionalInstructions"
          value={values.additionalInstructions}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isSubmit && errors.additionalInstructions && <div>{errors.additionalInstructions}</div>}
      </div>
      <div>
        <label>Blending : </label>

        <RadioButtonGroup
          name="blending"
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "not sure", label: "Not sure" },
          ]}
          label="Blending"
          onChange={handleChange}
          value={values.blending}
        />
        {isSubmit && errors.blending && <div>{errors.blending}</div>}
      </div>
      <div>
        <label>Rush : </label>

        <RadioButtonGroup
          name="rush"
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "not sure", label: "Not sure" },
          ]}
          label="Rush"
          onChange={handleChange}
          value={values.rush}
        />
        {isSubmit && errors.rush && <div>{errors.rush}</div>}
      </div>
      <div>
        <label htmlFor="file-input">Select Files:</label>
        <input
          name="files"
          type="file"
          id="file-input"
          max={2}
          onChange={(event) => {
            const {
              target: { files },
            } = event;
            setFieldValue("files", Object.values(files));
            setAlertVisiblity(true);
          }}
          multiple
          accept="image/jpeg,image/png,application/pdf"
        />
        {isAlertVisible && errors.files
          ? Array.isArray(errors.files) && errors.files.length
            ? (alert(errors.files.find((val) => val !== "undefined")),
              setAlertVisiblity(false),
              setFieldValue("files", []))
            : (alert(errors.files), setAlertVisiblity(false), setFieldValue("files", []))
          : null}
        <br />
        {values.files.length > 0 && !errors.files ? (
          <div>
            <p>Selected files: {values.files.length}</p>
          </div>
        ) : (
          <p>No files selected</p>
        )}
      </div>

      <button type="submit">Submit</button>
    </Form>
  );
}

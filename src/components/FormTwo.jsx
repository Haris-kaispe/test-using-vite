import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles.css";
import RadioButtonGroup from "./RadioButtonGroup";
import { Form } from "reactstrap";
import Select from "react-select";

export function FormTwo() {
  const initialValues = {
    orderName: "",
    po: "",
    requiredFormat: "",
    width: "",
    height: "",
    product: "",
    placement: "",
    colors: "",

    rush: "no",
    additionalInstructions: "",
    files: [],
  };

  const [isSubmit, setSubmit] = useState(false);
  const [isAlertVisible, setAlertVisiblity] = useState(false);

  const validationSchema = Yup.object().shape({
    orderName: Yup.string()
      .required("Order name is required")
      .matches(/^\d{3,20}$/, "Order name must be a number between 3 and 20 digits"),
    po: Yup.string().required("PO is required"),
    requiredFormat: Yup.string().required("Required format is required"),
    width: Yup.string().required("Width is required"),
    height: Yup.string().required("Height is required"),
    product: Yup.string().required("Product is required"),
    placement: Yup.string().required("Placement is required"),
    colors: Yup.string().required("Colors is required"),

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
        <label>OrderName : </label>
        <input
          type="number"
          name="orderName"
          value={values.orderName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isSubmit && errors.orderName && <div>{errors.orderName}</div>}
      </div>
      <div>
        <label>PO : </label>
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
        <label>Format : </label>
        <input
          type="text"
          name="requiredFormat"
          value={values.requiredFormat}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isSubmit && errors.requiredFormat && <div>{errors.requiredFormat}</div>}
      </div>
      <div>
        <label>Width : </label>

        <input
          type="text"
          name="width"
          value={values.width}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isSubmit && errors.width && <div>{errors.width}</div>}
      </div>
      <div>
        <label>Height : </label>

        <input
          type="text"
          name="height"
          value={values.height}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isSubmit && errors.height && <div>{errors.height}</div>}
      </div>
      <div>
        <Select
          name="product"
          placeholder="Products"
          styles={{
            placeholder: (base) => ({
              ...base,
              fontSize: "1em",
              color: "#A5B2C4",
              fontWeight: 400,
            }),
          }}
          value={values.product.value}
          onChange={(e) => {
            FormikVal.setFieldValue("product", e.value);
          }}
          options={options}
        />
        {isSubmit && errors.product && <div>{errors.product}</div>}
      </div>
      <div>
        <Select
          name="placement"
          placeholder="Placement"
          styles={{
            placeholder: (base) => ({
              ...base,
              fontSize: "1em",
              color: "#A5B2C4",
              fontWeight: 400,
            }),
          }}
          value={values.placement.value}
          onChange={(e) => {
            FormikVal.setFieldValue("placement", e.value);
          }}
          options={options}
        />
        {isSubmit && errors.product && <div>{errors.product}</div>}
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
            ? (setAlertVisiblity(false),
              alert(errors.files.find((val) => val !== "undefined")),
              setFieldValue("files", []))
            : (setAlertVisiblity(false), alert(errors.files), setFieldValue("files", []))
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

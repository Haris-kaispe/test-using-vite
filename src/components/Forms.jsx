import React, { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles.css";
import RadioButtonGroup from "./RadioButtonGroup";
import { Form } from "reactstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { item, files, formData } from "@/store/common/actions";
import Table from "./Table";
import { FileUpload } from "./FileUpload";
import { v4 as uuidv4 } from "uuid";
import { Tab } from "react-bootstrap";
import { columns } from "@/utils/helper";

export default function FormOne() {
  const dispatch = useDispatch();

  const { list } = useSelector((state) => ({
    list: state.exampleReducer.list,
  }));

  const initialValues = {
    id: "",
    orderName: "",
    po: "",
    requiredFormat: "",
    width: "",
    height: "",
    product: "",
    placement: "",
    colors: "",
    blending: "no",
    rush: "no",
    additionalInstructions: "",
    files: [],
  };
  const [isSubmit, setSubmit] = useState(false);
  const validationSchema = Yup.object().shape({
    orderName: Yup.string()
      .required("Order name is required")
      .matches(/^\d{3,20}$/, "Order name must be a number between 3 and 20 digits"),
    po: Yup.string().required("PO is required").matches(/^\d+$/, "PO must be a number"),
    requiredFormat: Yup.string().required("Required format is required"),
    width: Yup.string().required("Width is required").matches(/^\d+$/, "Width must be a number"),
    height: Yup.string().required("Height is required").matches(/^\d+$/, "Height must be a number"),
    product: Yup.string().required("Product is required"),
    placement: Yup.string().required("Placement is required"),
    colors: Yup.string().required("Colors is required"),
    blending: Yup.string().required("Blending is required"),
    rush: Yup.string().required("Rush is required"),
    additionalInstructions: Yup.string().max(
      500,
      "Additional instructions must be 500 characters or less"
    ),
  });

  const FormikVal = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(formData.add(values));
    },
  });

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const { values, errors, handleSubmit, handleChange, handleBlur, setFieldValue } = FormikVal;

  const handleTableChange = useCallback((type, { cellEdit }) => {
    if (type === "cellEdit") {
      dispatch(formData.updateCell(cellEdit));
    }
  }, []);

  const handleChildClick = useCallback((files) => {}, []);

  const TableFields = {
    remote: {
      filter: true,
      pagination: true,
      sort: true,
      cellEdit: true,
    },
    columns: columns,
    keyfield: "id",
    defaultSorted: true,
    handleTableChange: handleTableChange,
    value: "list",
    reducer: "exampleReducer",
  };

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmit(true);
          setFieldValue("id", uuidv4());
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
            type="number"
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
            type="number"
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
            type="number"
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
            type="number"
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
          {isSubmit && errors.placement && <div>{errors.placement}</div>}
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

        <button type="submit">Submit</button>
      </Form>
      <FileUpload onClick={handleChildClick} />

      <Table TableFields={TableFields} />
    </div>
  );
}

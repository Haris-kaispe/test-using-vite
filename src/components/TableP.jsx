import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

import paginationFactory from "react-bootstrap-table2-paginator";

//import "bootstrap/dist/css/bootstrap.css";
//import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const products = [
  { id: 1, name: "apple", price: 1 },
  { id: 2, name: "orange", price: 2 },
  { id: 3, name: "banana", price: 3 },
  { id: 4, name: "peach", price: 2 },
  { id: 5, name: "carrot", price: 1 },
  { id: 6, name: "grapes", price: 4 },
  { id: 7, name: "mango", price: 1 },
  { id: 8, name: "potatoe", price: 3 },
  { id: 9, name: "onion", price: 3 },
];

const columns = [
  {
    dataField: "id",
    text: "Product ID",
    sort: true,
  },
  {
    dataField: "name",
    text: "Product Name",
    sort: true,
  },
  {
    dataField: "price",
    text: "Product Price",
    sort: true,
    validator: (newValue, row, column) => {
      if (isNaN(newValue)) {
        return {
          valid: false,
          message: "Price should be numeric",
        };
      }
      if (newValue > 5) {
        return {
          valid: false,
          message: "Price should less than 6",
        };
      }
      return true;
    },
  },
];

const defaultSorted = [
  {
    dataField: "name",
    order: "desc",
  },
];

export default function TableP() {
  return (
    <BootstrapTable
      bootstrap4
      keyField="id"
      data={products}
      columns={columns}
      defaultSorted={defaultSorted}
      cellEdit={cellEditFactory({
        mode: "click",
        blurToSave: true,
      })}
      pagination={paginationFactory({ sizePerPage: 5 })}
    />
  );
}

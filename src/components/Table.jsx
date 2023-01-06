import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useSelector } from "react-redux";
import cellEditFactory from "react-bootstrap-table2-editor";
import PropTypes from "prop-types";
export default function Table(props) {
  const { remote, keyfield, defaultSorted, handleTableChange, value, reducer, columns } =
    props.TableFields;

  const list = useSelector((state) => state[reducer][value]);

  return (
    <BootstrapTable
      bootstrap4
      keyField={keyfield}
      data={list}
      columns={columns}
      remote={remote}
      cellEdit={cellEditFactory({
        mode: "click",
        blurToSave: true,
      })}
      onTableChange={handleTableChange}
    />
  );
}

Table.propTypes = {
  TableFields: PropTypes.shape({
    remote: PropTypes.shape({
      filter: PropTypes.bool,
      pagination: PropTypes.bool,
      sort: PropTypes.bool,
      cellEdit: PropTypes.bool,
    }),
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        dataField: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        editable: PropTypes.bool,
      })
    ),
    keyfield: PropTypes.string.isRequired,
    defaultSorted: PropTypes.bool,
    handleTableChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    reducer: PropTypes.string.isRequired,
  }).isRequired,
};

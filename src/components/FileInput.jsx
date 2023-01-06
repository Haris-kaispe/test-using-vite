import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function FileInput() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

  const handleChange = (event) => {
    const {
      target: { files },
    } = event;
    if (files.length < 3) {
      for (let i = 0; i < files.length; i++) {
        if (!allowedTypes.includes(files[i].type)) {
          alert("Error: Only jpeg, png, and pdf files are allowed.");
          setSelectedFiles([]);
          return;
        }
      }
      setSelectedFiles(files);
    } else {
      alert("You are only allowed to upload a maximum of 2 files");
      setSelectedFiles([]);
    }
  };

  return (
    <div>
      <label htmlFor="file-input">Select Files:</label>
      <input
        type="file"
        id="file-input"
        multiple
        max={2}
        onChange={handleChange}
        accept="image/jpeg,image/png,application/pdf"
      ></input>
      <br />
      {selectedFiles.length > 0 ? (
        <div>
          <p>Selected files: {selectedFiles.length}</p>
        </div>
      ) : (
        <p>No files selected</p>
      )}
    </div>
  );
}

export default FileInput;

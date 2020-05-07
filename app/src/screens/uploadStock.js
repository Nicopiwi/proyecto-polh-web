import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FileDrop } from "react-file-drop";
import Dropzone from "react-dropzone";
import "./css/upload.css";

const UploadStock = (props) => {
  const [fileNames, setFileNames] = useState([]);
  const handleDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    setFileNames(acceptedFiles.map((file) => file.name));
  };
  useEffect(() => {
    console.log(fileNames);
  }, [fileNames]);
  return (
    <Fragment>
      <img
        src={require("../assets/stock.svg")}
        alt="No stock"
        width="250"
        height="250"
      ></img>
      <h2 style={{ marginTop: "16px" }} id="emptyListText">
        Si lo desea, suba los datos de su inventario
      </h2>

      <div
        style={{
          borderStyle: "dashed",
          borderColor: "black",
          marginTop: "32px",
        }}
      >
        <Dropzone onDrop={handleDrop}>
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject,
          }) => {
            // additional CSS depends on dragging status
            const additionalClass = isDragAccept
              ? "accept"
              : isDragReject
              ? "reject"
              : "";

            return (
              <div
                {...getRootProps({
                  className: `dropzone ${additionalClass}`,
                })}
              >
                <input {...getInputProps()} />
                <span>{isDragActive ? "🗂" : "🗂"}</span>
                <p>Súbalo en formato (excel) .xslx .xls o como .csv</p>
              </div>
            );
          }}
        </Dropzone>
      </div>
    </Fragment>
  );
};

export default UploadStock;

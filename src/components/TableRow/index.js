import React from "react";
import "./style.css";

const TableRow = ({ row }) => {
  const toTitleCase = (string) => {
    return string
      .replaceAll("_", " ")
      .split(" ")
      .map((word) => {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  const {
    logId,
    applicationType,
    applicationId,
    actionType,
    creationTimestamp,
  } = {
    ...row,
    applicationType: row.applicationType
      ? toTitleCase(row.applicationType)
      : "",
    actionType: row.actionType ? toTitleCase(row.actionType) : "",
  };

  return (
    <tr>
      <td>{logId}</td>
      <td>{applicationType}</td>
      <td>{applicationId}</td>
      <td>{actionType}</td>
      <td>-/-</td>
      <td>{creationTimestamp}</td>
    </tr>
  );
};

export default TableRow;

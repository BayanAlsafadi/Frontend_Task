import React, { useContext, useState } from "react";
import { dataContext } from "../../App";
import TableRow from "../TableRow";
import "./style.css";
import { BsArrowUpCircleFill as Ascending } from "react-icons/bs";
import { BsFillArrowDownCircleFill as Descending } from "react-icons/bs";

const Dashboard = () => {
  const { data, setData, currentData } = useContext(dataContext);

  // ----------------------------------------------------------------------

  const [sortedField, setSortedField] = useState("");
  const [order, setOrder] = useState("asc");

  // ----------------------------------------------------------------------

  const handleSortChange = (value) => {
    const sortOrder = value === sortedField && order === "asc" ? "desc" : "asc";
    setSortedField(value);
    setOrder(sortOrder);
    handleSorting(value, sortOrder);
  };

  // ----------------------------------------------------------------------

  const handleSorting = (sortField, sortOrder) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[sortField] === null) return 1;
      if (b[sortField] === null) return -1;
      if (a[sortField] === null && b[sortField] === null) return 0;
      return (
        a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
          numeric: true,
        }) * (sortOrder === "asc" ? 1 : -1)
      );
    });
    setData(sortedData);
  };

  // ----------------------------------------------------------------------

  const fields = [
    { label: "Log ID", value: "logId", sorted: true },
    { label: "Application Type", value: "applicationType", sorted: false },
    { label: "Application ID", value: "applicationId", sorted: false },
    { label: "Action", value: "actionType", sorted: false },
    { label: "Action Details", value: "", sorted: false },
    { label: "Date:Time", value: "creationTimestamp", sorted: true },
  ];

  // ----------------------------------------------------------------------

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <table id="dashboard">
          <tbody>
            <tr>
              {fields.map(({ value, label }) => {
                return (
                  <th key={value}>
                    <div className="table-header">
                      <p> {label} </p>
                      <button
                        className="sort-btn"
                        onClick={() => {
                          handleSortChange(value);
                        }}
                      >
                        {sortedField === value && order === "asc" ? (
                          <Descending style={{ color: "#10489b" }} />
                        ) : (
                          <Ascending style={{ color: "#10489b" }} />
                        )}
                      </button>
                    </div>
                  </th>
                );
              })}
            </tr>
            {currentData.map((element, index) => {
              return <TableRow row={element} key={index} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

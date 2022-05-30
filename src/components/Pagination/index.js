import React, { useContext } from "react";
import { dataContext } from "../../App";
import { Link } from "react-router-dom";

import "./style.css";

const Pagination = () => {
  const { totalData, recordsPerPage, paginate } = useContext(dataContext);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => {
        return (
          <Link
            key={number}
            to="/"
            onClick={() => {
              paginate(number);
            }}
          >
            {number}
          </Link>
        );
      })}
    </div>
  );
};

export default Pagination;

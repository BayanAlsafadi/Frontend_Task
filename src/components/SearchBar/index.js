import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { dataContext } from "../../App";

const SearchBar = () => {
  const { types, setData, data, setTypes, currentData } =
    useContext(dataContext);
  const [reset, setReset] = useState(false);
  const [selectedAppType, setSelectedAppType] = useState("none");
  const [selectedActionType, setSelectedActionType] = useState("none");
  const [selectedToDate, setSelectedToDate] = useState("");
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedAppId, setSelectedAppId] = useState("");

  // ----------------------------------------------------------------------

  const [actionType, setActionType] = useState("");
  const [applicationType, setApplicationType] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  // ----------------------------------------------------------------------

  const getData = async () => {
    let result;
    try {
      result = await axios.get(
        "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f/application"
      );
      if (result) {
        const auditLog = result.data.result.auditLog;
        setData(auditLog);
        getTypes(auditLog);
      }
    } catch (err) {
      throw err;
    }
  };

  // ----------------------------------------------------------------------
  // This function is for getting the application and action types from the api for the options of dropdown list

  const getTypes = (data) => {
    let actionTypes = data
      .map(({ actionType }) => {
        return actionType;
      })
      .filter((element) => {
        return element;
      });

    let applicationTypes = data
      .map(({ applicationType }) => {
        return applicationType;
      })
      .filter((element) => {
        return element;
      });

    actionTypes = [...new Set(actionTypes)];
    applicationTypes = [...new Set(applicationTypes)];

    setTypes([{ actionTypes, applicationTypes }]);
  };

  // ----------------------------------------------------------------------

  const search = () => {
    setData(filteredList);
  };

  const filterByActionType = (filteredData) => {
    if (!actionType) {
      return filteredData;
    }
    const filteredActionTypes = filteredData.filter((element, index) => {
      return element.actionType == actionType;
    });

    return filteredActionTypes;
  };

  // ----------------------------------------------------------------------

  const filterByApplicationId = (filteredData) => {
    if (!applicationId) {
      return filteredData;
    }
    const filteredApplicationId = filteredData.filter((element, index) => {
      return element.applicationId == applicationId;
    });

    return filteredApplicationId;
  };

  // ----------------------------------------------------------------------

  const filterByApplicationType = (filteredData) => {
    if (!applicationType) {
      return filteredData;
    }
    const filteredApplicationTypes = filteredData.filter((element, index) => {
      return element.applicationType == applicationType;
    });

    return filteredApplicationTypes;
  };

  // ----------------------------------------------------------------------

  const filterByFromDate = (filteredData) => {
    if (!fromDate) {
      return filteredData;
    }
    const filteredFromDate = filteredData.filter((element, index) => {
      const timeStamp = new Date(
        element.creationTimestamp.split(" ")[0]
      ).getTime();
      return timeStamp >= fromDate;
    });
    return filteredFromDate;
  };

  // ----------------------------------------------------------------------

  const filterByToDate = (filteredData) => {
    if (!toDate) {
      return filteredData;
    }
    const filteredToDate = filteredData.filter((element, index) => {
      const timeStamp = new Date(
        element.creationTimestamp.split(" ")[0]
      ).getTime();
      return timeStamp <= toDate;
    });
    return filteredToDate;
  };

  // ----------------------------------------------------------------------

  const resetFilters = () => {
    getData();
    setToDate("");
    setFromDate("");
    setActionType("");
    setApplicationId("");
    setApplicationType("");
    setSelectedActionType("none");
    setSelectedAppType("none");
    setSelectedToDate("");
    setSelectedFromDate("");
    setSelectedAppId("");
  };
  // ----------------------------------------------------------------------

  useEffect(() => {
    getData();
  }, []);

  // ----------------------------------------------------------------------

  useEffect(() => {
    let filteredData = filterByActionType(currentData);
    filteredData = filterByApplicationType(filteredData);
    filteredData = filterByApplicationId(filteredData);
    filteredData = filterByToDate(filteredData);
    filteredData = filterByFromDate(filteredData);
    setFilteredList(filteredData);
  }, [actionType, applicationId, applicationType, toDate, fromDate]);

  // ----------------------------------------------------------------------
  useEffect(() => {
    if (reset) {
      resetFilters();
    }
  }, [reset]);
  // ----------------------------------------------------------------------

  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <div className="field-container">
          <p className="input-label">Employee Name</p>
          <input
            placeholder="e.g. Admin.User"
            type="text"
            className="filter-option"
            name="employeeName"
          />
        </div>
        <div className="field-container">
          <p className="input-label">Action type</p>

          <select
            className="filter-option"
            onChange={(e) => {
              setActionType(e.target.value);
              setSelectedActionType(e.target.value);
            }}
            name="actionType"
            value={selectedActionType}
          >
            <option value="none" disabled hidden>
              Select an Option
            </option>
            {types.length > 0 &&
              types[0].actionTypes.map((type, index) => {
                return (
                  <option value={type} key={index}>
                    {type
                      .replaceAll("_", " ")
                      .split(" ")
                      .map(
                        (word) =>
                          word[0].toUpperCase() + word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="field-container">
          <p className="input-label">Application type</p>
          <select
            className="filter-option"
            onChange={(e) => {
              setApplicationType(e.target.value);
              setSelectedAppType(e.target.value);
            }}
            value={selectedAppType}
          >
            <option value="none" disabled hidden>
              Select an Option
            </option>

            {types.length > 0 &&
              types[0].applicationTypes.map((type, index) => {
                return (
                  <option value={type} key={index}>
                    {type
                      .replaceAll("_", " ")
                      .split(" ")
                      .map(
                        (word) =>
                          word[0].toUpperCase() + word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="field-container">
          <p className="input-label">From Date</p>
          <input
            placeholder="Select Date"
            type="date"
            onChange={(e) => {
              setFromDate(new Date(e.target.value).getTime());
              setSelectedToDate(e.target.value);
            }}
            className="filter-option"
            value={selectedToDate}
          />
        </div>
        <div className="field-container">
          <p className="input-label">To Date</p>
          <input
            placeholder="Select Date"
            type="date"
            onChange={(e) => {
              setToDate(new Date(e.target.value).getTime());
              setSelectedFromDate(e.target.value);
            }}
            className="filter-option"
            value={selectedFromDate}
          />
        </div>
        <div className="field-container">
          <p className="input-label">Application ID</p>
          <input
            placeholder={"e.g. 219841/2021"}
            type="text"
            onChange={(e) => {
              setApplicationId(e.target.value);
              setSelectedAppId(e.target.value);
            }}
            className="filter-option"
            value={selectedAppId}
          />
        </div>
        <div className="buttons">
          <button
            className="search-btn"
            onClick={() => {
              search();
            }}
          >
            Search Logger
          </button>
          <button
            className="reset-btn"
            onClick={() => {
              setReset(true);
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

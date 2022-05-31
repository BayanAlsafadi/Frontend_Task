import "./App.css";
import SearchBar from "./components/SearchBar";
import { createContext, useState } from "react";
import Dashboard from "./components/Dashboard";
import Pagination from "./components/Pagination";

export const dataContext = createContext();

function App() {
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  // ----------------------------------------------------------------------
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstPage = indexOfLastRecord - recordsPerPage;
  const currentData = data.slice(indexOfFirstPage, indexOfLastRecord);
  // ----------------------------------------------------------------------

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  return (
    <div className="App">
      <dataContext.Provider
        value={{
          types,
          setData,
          data,
          currentData,
          setTypes,
          recordsPerPage,
          totalData: data.length,
          paginate,
        }}
      >
        <SearchBar />
        <Dashboard />
        <Pagination />
      </dataContext.Provider>
    </div>
  );
}

export default App;

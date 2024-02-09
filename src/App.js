import "./App.css";
import { useState, useEffect, useContext } from "react";
import React from "react";

import { SearchBox } from "./components/SearchBox";
import { NameContext } from "./Context/nameContext";
function App() {
  const [data, setData] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [ascendingSort, setAscendingSort] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const { searchTerm } = useContext(NameContext);
  console.log("search term :", searchTerm);

  const resultAsSearch = () => {
    setFilteredData(
      data.filter(
        (item) =>
          searchTerm.length > 0 && item.API.toLowerCase().includes(searchTerm)
      )
    );
  };

  useEffect(() => {
    if (data.length <= 0) {
      fetchData();
    }
    if (searchTerm.trim() !== "") {
      console.log(searchTerm.length);
      resultAsSearch();
    }
  }, [searchTerm]);

  const fetchData = async () => {
    try {
      const data = await fetch("https://api.publicapis.org/entries");
      const { entries } = await data.json();
      console.log("data:", entries);
      setData(entries);
      setFilteredData(entries);
    } catch (error) {
      console.log("error", error?.message);
    }
  };

  if (data?.length <= 0) {
    return;
  }

  const changePageNumber = (pageNumber) => {
    setSelectedPage(pageNumber);
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const startIndex = (selectedPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data?.length);

  const sortTheData = () => {
    if (ascendingSort) {
      setData(data.sort((a, b) => b.API.localeCompare(a.API)));
      setAscendingSort(false);
    } else {
      setData(data.sort((a, b) => a.API.localeCompare(b.API)));
      setAscendingSort(true);
    }
  };

  return (
    <div className="App">
      <div>Total Count :{data?.length}</div>

      <SearchBox />

      <table className="table">
        <tr>
          <th>Count </th>
          <th onClick={sortTheData}>
            API <span>v</span>
          </th>
          <th>Description</th>
        </tr>
        {filteredData?.slice(startIndex, endIndex).map((item, index) => (
          <tr key={index}>
            <td>{startIndex + index + 1}</td>
            <td>{item?.API}</td>
            <td>{item?.Description}</td>
          </tr>
        ))}
      </table>

      <div className="pagination">
        <button
          disabled={selectedPage === 1}
          onClick={() => setSelectedPage((prevState) => prevState - 1)}
        >
          ⬅️
        </button>
        <div className="page-count">
          {Array.from({ length: totalPages }, (_, index) => (
            <div
              key={index}
              className={`page-number ${
                selectedPage === index + 1 ? "active-page" : ""
              }`}
              onClick={() => changePageNumber(index + 1)}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <button
          disabled={selectedPage === totalPages}
          onClick={() => setSelectedPage((prevState) => prevState + 1)}
        >
          ➡️
        </button>
      </div>
    </div>
  );
}

export default App;

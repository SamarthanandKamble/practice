import React, { useContext, useState } from "react";
import { NameContext } from "../Context/nameContext";

export const SearchBox = () => {
  const { searchTerm, setSearchTerm } = useContext(NameContext);

  return (
    <div>
      <input
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

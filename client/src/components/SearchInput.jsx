import React, { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    onSearch(input);
    console.log(input);
  };

  return (
    <div className="search-container">
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Search Country...."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="search-input"
        />
      </form>
    </div>
  );
};

export default SearchInput;

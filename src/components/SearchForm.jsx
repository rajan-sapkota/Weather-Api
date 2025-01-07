import React, { useState } from "react";

function SearchForm({ onSearchSubmit, unitSystem, setUnitSystem }) {
  const [place, setPlace] = useState("");

  const handleUnitToggle = () => {
    setUnitSystem(prev => (prev === "metric" ? "imperial" : "metric"));
  };

  const handleSearchChange = (e) => {
    setPlace(e.target.value);
  };

  const handleClearInput = () => {
    setPlace(""); // Clears the input field
  };

  return (
    <div className="flex flex-col items-center p-4">
      <form
        onSubmit={(e) => onSearchSubmit(e, place)}
        className="w-full max-w-md bg-white p-4 rounded-lg shadow-md flex items-center"
      >
        <div className="relative flex-grow">
          <input
            type="text"
            value={place}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-l-md text-black focus:outline-none border"
            placeholder="Enter city name"
          />
          {place && (
            <button
              type="button"
              onClick={handleClearInput}
              className="absolute right-2 top-2 text-gray-500"
            >
              &times; {/* Cross button to clear input */}
            </button>
          )}
        </div>

        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-6 py-2 rounded-r-md"
        >
          Search
        </button>
      </form>

    </div>
  );
}

export default SearchForm;
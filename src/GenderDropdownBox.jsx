import React, { useState } from "react";
import "./dropdownCountry.css";
import Select from "react-select";

export default function GenderDropBox(props) {
  // React state to manage selected options
  const [selectedOptions, setSelectedOptions] = useState();

  // Array of all options
  const optionList = [
    { value: "male", label: "male" },
    { value: "female", label: "female" },
    { value: "nonbinary", label: "nonbinary" },
  ];


  // Function triggered on selection
  function handleSelect(gender) {
    console.log(gender["value"])
    props.onGenderChange(gender["value"])
  }
  
  return (
    <div className="app">
      <div className="dropdown-container">
        <Select
          options={optionList}
          placeholder="Select gender"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
        />
      </div>
    </div>
  );
}


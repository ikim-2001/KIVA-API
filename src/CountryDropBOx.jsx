import React, { useState } from "react";
import "./dropdownCountry.css";
import Select from "react-select";

export default function CountryDropBox(props) {
  // React state to manage selected options
  const [selectedOptions, setSelectedOptions] = useState();

  // Array of all options
  const optionList = [
    { value: "KE", label: "Kenya" },
    { value: "VN", label: "Vietnam" },
    { value: "PH", label: "Phillippines" },
    { value: "AL", label: "Albania" },
    { value: "BO", label: "Bolivia" }
  ];


  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
    console.log(data)
    props.onCountryChange(data)
  }
  
  return (
    <div className="app">
      <div className="dropdown-container">
        <Select
          options={optionList}
          placeholder="Select country"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
        />
      </div>
    </div>
  );
}


import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import Infobox from "../src/infobox"
import { format } from 'react-string-format';
import GenderBox from './genderBox';
import CountryBox from './countryBox';
import LimitBox from './limitBox';
import Button from '@mui/material/Button';
import SortButtons from './SortButtons';
import CountryDropBox from './CountryDropBOx';
import GenderDropBox from './GenderDropdownBox';
import sortAlpha from "./sortObjects";


const FormInput = () => {
    const [response, setResponse] = useState(null);
    const [renderedOutput, setRenderedOutput] = useState(null);
    const [count, setCount] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState();
    const [gender, setGender] = useState({
      "gender": ""
    });
    const [countLimit, setCountLimit] = useState(0);


    const handleActiveCountries = (data) => {
      setSelectedOptions(data);
    }

    function handleCountChange(event) {
      setCountLimit(event.target.value)
    }

    function parseCountries() {
      let cleanCountries = []
      for (let i = 0; i < selectedOptions.length; i ++) {
        cleanCountries.push(selectedOptions[i]["value"])
      }
      return cleanCountries
    }

    const fetchData = async (gender, activeCountries, countLimit) => {
      try {
        const graphql_query = parseFormData(gender, activeCountries, countLimit)
        const res = await fetch('https://api.kivaws.org/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: graphql_query}),
        })
        var data = await res.json();
        data = parseJson(data);
        console.log(data)
        setResponse(data);
      } catch (error) {
        console.error(error);
      }
    };

    function parseFormData(gender, countries, count_limit) {
      let parsedGender = gender["gender"]
      let parsedCountries = "["
      for (let i = 0; i < countries.length; i++) {
        parsedCountries+= (`"${countries[i]}"` + ",")
      }
      parsedCountries += "]"

      
        let graphql_query = format('{ lend { loans(filters: {gender: {0} country:  {1}}, limit: {2}) { totalCount values { name loanAmount image { url(presetSize: default) } activity { name } geocode { country { isoCode name } } lenders(limit: 0) { totalCount } ... on LoanPartner { partnerName } ... on LoanDirect { trusteeName } } } } }', parsedGender, parsedCountries, count_limit);
        console.log(graphql_query)
        return graphql_query
    }
  
    function parseJson(data) {
      var res = []
      data = data["data"]["lend"]["loans"]["values"];
  
      for (let i = 0; i < data.length; i++) {
        var parsedJson = {
          "activity": data[i]["activity"]["name"],
          "country": data[i]["geocode"]["country"]["name"],
          "image_url": data[i]["image"]["url"],
          "lenders": data[i]["lenders"]["totalCount"],
          "loanAmount": data[i]["loanAmount"],
          "name": data[i]["name"],
          "partnerName": data[i]["trusteeName"] ? data[i]["trusteeName"] : data[i]["partnerName"]
        }
        res.push(parsedJson)
      }
      return res
    }
    
  const [submitted, setSubmitted] = useState(false);

  function handleNameClick() {
    console.log(renderedOutput)
    let unsortedArr = renderedOutput
    const sortedData = [...unsortedArr].sort((a, b) => {
      return a["props"]["name"] > b["props"]["name"] ? 1 : -1
    })
    setRenderedOutput(sortedData)
  }

  function handleCountryClick() {
    console.log(renderedOutput)
    let unsortedArr = renderedOutput
    const sortedData = [...unsortedArr].sort((a, b) => {
      return a["props"]["country"] > b["props"]["country"] ? 1 : -1
    })
    setRenderedOutput(sortedData)
  }

  function handleLendersClick() {
    console.log(renderedOutput)
    let unsortedArr = renderedOutput
    const sortedData = [...unsortedArr].sort((a, b) => {
      return a["props"]["lenders"] > b["props"]["lenders"] ? 1 : -1
    })
    setRenderedOutput(sortedData)
  }


  const handleSubmit = (event) => {
    // setCount(count+1)
    event.preventDefault();
    let cleanCountries = parseCountries();
    fetchData(gender, cleanCountries, countLimit)
    setSubmitted(true);
    if (response != null) {
      const grid = []
      for (let i = 0; i < response.length; i ++) {
        const item = response[i]
        grid.push(
          response && <Infobox  
          key={i}
          activity={item["activity"]} 
          lenders={item["lenders"]}
          loanAmount={item["loanAmount"]}
          name={item["name"]}
          country={item["country"]} 
          image_url={item["image_url"]}
          partnerName={item["partnerName"]}/>
        )
      } 
      setRenderedOutput(
      <p name={""}>RESULTS </p> && grid)
    }
  };

  function handleGenderChange(newGender) {
    setGender({
      ...gender, 
      ["gender"]: newGender
    })
  }



  return (
    <div>
    <div style={{
      borderWidth: "10px",
      border: '3px solid rgba(147, 233, 190, 1)',
        left: '50%',
        transform: 'translate(142%, 0%)',
                marginTop: "3%",
        width: '20%',
        height: '40%',
        borderRadius: '10%',
        padding: "3%",
        alignItems: "center",
        paddingBottom: "20px"
      }}>
      <form onSubmit={handleSubmit}>

      <LimitBox onCountChange={handleCountChange}></LimitBox>
      <br/>
      <GenderDropBox onGenderChange={handleGenderChange}></GenderDropBox>
        <br />
        <CountryDropBox onCountryChange={handleActiveCountries}></CountryDropBox>
        <br />

        <br />
        <br></br>
            <Button sx={{backgroundColor: "rgb(147, 233, 190)", color: "white"}} variant="contained"
            style={{
              borderWidth: "3px",
              borderColor: "rgb(147, 233, 190)",
              borderRadius: '10%',
              alignItems: "center",
              marginLeft: "28%",
              fontFamily: "Poppins, Arial, sans-serif",
              fontSize: "20px",
              fontWeight: "bolder",
              cursor: 'pointer'
            }} 
            type="submit"
            variant="outlined">Submit</Button>

      </form>
    </div>
    {(submitted && <SortButtons onNameClicked={handleNameClick}
                                                    onCountryClicked={handleCountryClick}
                                                    onLendersClicked={handleLendersClick}></SortButtons>)}
            {renderedOutput}
    </div>
  );
};

export default FormInput;
// import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import Infobox from "../src/infobox"
import { format } from 'react-string-format';
import GenderBox from './genderBox';
import CountryBox from './countryBox';
import LimitBox from './limitBox';
import Button from '@mui/material/Button';
import SortButtons from './SortButtons';



const FormInput = () => {
    const [response, setResponse] = useState(null);
    const [renderedOutput, setRenderedOutput] = useState(null);
    const [count, setCount] = useState(0);
    const [gender, setGender] = useState({
      "gender": ""
    });
    const [countLimit, setCountLimit] = useState(0);
    const [activeCountries, setActiveCountries] = useState({
      "AL": false,
      "BO": false,
      "KE": false,
      "PH": false,
      "US": false,
      "VN": false,
    })
  
    const handleActiveCountries = (event, nation) => {
      setActiveCountries({
        ...activeCountries,
        [nation]: event.target.checked,
      });
    };

    function handleCountChange(event) {
      setCountLimit(event.target.value)
    }

    useEffect(() => {
      // Perform operation that depends on the updated value of input here.
      console.log(gender)
    }, [gender]);

    useEffect(() => {
      // Perform operation that depends on the updated value of input here.
      console.log(activeCountries)
    }, [activeCountries]);

    useEffect(() => {
      // Perform operation that depends on the updated value of input here.
      console.log(countLimit)
    }, [countLimit]);

    const fetchData = async (gender, activeCountries, countLimit) => {
      try {
        const graphql_query = parseFormData(gender, activeCountries, countLimit)
        console.log(graphql_query)
        setCount(count+1)
        const res = await fetch('https://api.kivaws.org/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: graphql_query}),
        })
        var data = await res.json();
        data = parseJson(data);
        setResponse(data);
      } catch (error) {
        console.error(error);
      }
    };

    function parseFormData(gender, countries, count_limit) {
      let parsedGender = gender["gender"]
      let parsedCountries = "["
      for (const [nation, isActive] of Object.entries(countries)) {
        if (isActive) {
          parsedCountries+= (`"${nation}"` + ",")
        }
      }
      parsedCountries += "]"
      console.log(parsedCountries)
      console.log(parsedGender)
      console.log(count_limit)

      
        let graphql_query = format('{ lend { loans(filters: {gender: {0} country:  {1}}, limit: {2}) { totalCount values { name loanAmount image { url(presetSize: default) } activity { name } geocode { country { isoCode name } } lenders(limit: 0) { totalCount } ... on LoanPartner { partnerName } ... on LoanDirect { trusteeName } } } } }', parsedGender, parsedCountries, count_limit);
        console.log(graphql_query)
        return graphql_query
    }
  
    function parseJson(data) {
      console.log(data)
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
      console.log(res)
      return res
    }
  
    useEffect(() => {
      if (response != null) {
      const grid = []
      grid.push(<SortButtons></SortButtons>)
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
      let finalGrid = [];
      for (let j = 0; j < grid.length; j += 7){
        finalGrid.push(grid.slice(j, j+7))
      }
      finalGrid.unshift(<br></br>,
      <br></br>,
      <br></br>,
      <br></br>,
      <br></br>,
      <br></br>,
      )
      setRenderedOutput(
      <p>RESULTS </p> && finalGrid)
    }
    }, [count]);
    

  const [submitted, setSubmitted] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(gender, activeCountries, countLimit)
    setSubmitted(true);
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
      <GenderBox onGenderChange={handleGenderChange}></GenderBox>
        <br />
        <CountryBox onCountryChange={handleActiveCountries}></CountryBox>
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
    {submitted && (
        <div>
            {renderedOutput}
        </div>
      )}
    </div>
  );
};

export default FormInput;

// import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import Infobox from "../src/infobox"
import { format } from 'react-string-format';
import SortButton from './SortButton';
import GenderBox from './genderBox';
import CountryBox from './countryBox';
import LimitBox from './limitBox';



const FormInput = () => {
    const [response, setResponse] = useState(null);
    const [renderedOutput, setRenderedOutput] = useState(null);
    const [count, setCount] = useState(0);
    const [gender, setGender] = useState({
      "gender": ""
    });
    const [country, setCountry] = useState("");
    const [countLimit, setCountLimit] = useState("");
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
      console.log(activeCountries)
    };


    const fetchData = async (gender, country, count_limit) => {
      try {
        const graphql_query = parseFormData(gender, country, count_limit)
        
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

    function parseFormData(gender, country, count_limit) {
        let graphql_query = format('{ lend { loans(filters: {gender: {0} country: ["{1}"]}, limit: {2}) { totalCount values { name loanAmount image { url(presetSize: default) } activity { name } geocode { country { isoCode name } } lenders(limit: 0) { totalCount } ... on LoanPartner { partnerName } ... on LoanDirect { trusteeName } } } } }', gender, country, count_limit);
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
      for (let j = 0; j < grid.length; j += 4){
        finalGrid.push(grid.slice(j, j+4))
      }
      console.log(finalGrid)
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
    

  const [formData, setFormData] = useState({
    gender: '',
    country: '',
    count_limit: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(formData.gender, formData.country, formData.count_limit)
    setSubmitted(true);

  };

  function handleGenderChange(newGender) {
    setGender({
      ...gender, 
      ["gender"]: newGender
    })
    console.log(gender)
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

      <LimitBox></LimitBox>
      <br/>
      <GenderBox onGenderChange={handleGenderChange}></GenderBox>
        <br />
        <CountryBox onCountryChange={handleActiveCountries}></CountryBox>
        <br />

        <br />
        <br></br>
        <button  style={{
        backgroundColor: '#DDDDDD',
        borderRadius: '10%',
        padding: "5%",
        alignItems: "center",
        marginLeft: "28%",
        fontFamily: "Poppins, Arial, sans-serif",
        fontSize: "20px",
        fontWeight: "bolder",
        cursor: 'pointer',

      }}
      
        type="submit" >Submit</button>
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
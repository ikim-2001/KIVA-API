// import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import Infobox from "../src/infobox"
import { format } from 'react-string-format';



const FormInput = () => {
    const [response, setResponse] = useState(null);
    const [renderedOutput, setRenderedOutput] = useState(null);
    const [count, setCount] = useState(0);
    const [gender, setGender] = useState(false);
    const [country, setCountry] = useState(false);
    const [countLimit, setCountLimit] = useState(false);

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
      setRenderedOutput(<p>RESULTS </p> && finalGrid)
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



  return (
    <div>
    <div style={{
      background: 'linear-gradient(to right, #3EB489, #4299E1)',
        boxShadow: "10px 2px 50px teal",
        marginLeft: '33%',
        marginTop: "3%",
        width: '20%',
        height: '40%',
        borderRadius: '10%',
        padding: "3%",
        alignItems: "center",
        paddingBottom: "20px"
      }}>
      <form onSubmit={handleSubmit}>

      <label style={{fontFamily: "Poppins, Arial, sans-serif",
                  fontSize: "25px",
                  fontWeight: "bolder",
                  transition: "0.3s",
                  fontSize: gender ? "23px" :  "20px",
}}>
          Gender:
          <input 
          
          onFocus={(e) => {
            setGender(true)
        console.log('Focused on Gender');
      }}
      onBlur={(e) => {
        setGender(false)
        console.log('Lost focus on Gender');
      }}
          style={{width: "100%",
          fontSize: gender ? "25px" :  "20px",
          marginLeft: "-2.5%",
          padding: "2%",
        height: "200%"}}
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </label>

        <br />
        <label style={{fontFamily: "Poppins, Arial, sans-serif",
                  fontSize: "25px",
                  fontWeight: "bolder",
                  transition: "0.3s",
                  fontSize: country ? "23px" :  "20px",
}}>
          Country:
          <input 
          
          onFocus={(e) => {
            setCountry(true)
        console.log('Focused on country');
      }}
      onBlur={(e) => {
        setCountry(false)
        console.log('Lost focus on country');
      }}
          style={{width: "100%",
          fontSize: gender ? "25px" :  "20px",
          marginLeft: "-2.5%",
          padding: "2%",
        height: "200%"}}
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </label>

        <br />

        <label style={{fontFamily: "Poppins, Arial, sans-serif",
                  fontSize: "25px",
                  fontWeight: "bolder",
                  transition: "0.3s",
                  fontSize: countLimit ? "23px" :  "20px",
}}>
          Count Limit:
          <input onFocus={(e) => {
            setCountLimit(true)
        console.log('Focused on count Limit');
      }}
      onBlur={(e) => {
        setCountLimit(false)
        console.log('Lost focus on count Limit');
      }}
          style={{width: "100%",
          fontSize: countLimit ? "25px" :  "20px",
          marginLeft: "-2.5%",
          padding: "2%",
        height: "200%"}}
            type="text"
            name="count_limit"
            value={formData.count_limit}
            onChange={handleChange}
          />
        </label>

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

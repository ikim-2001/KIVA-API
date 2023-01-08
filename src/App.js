import React, { useState, useEffect } from 'react';
import Infobox from "../src/infobox"
import FormInput from './Form';

const App = () => {
  return (
    <div>
      <div style={{ 
        margin: "auto",
        width: "100%",
        padding: "10px",
  height: "200px",
}}>
  <p style={{
    fontWeight: "bolder",
    textAlign: "center", 
  fontFamily: "Poppins, Arial, sans-serif",
  fontSize: "50px"}}>KIVA API Project</p>
    <p style={{
    fontWeight: "bolder",
    textAlign: "center", 
  fontFamily: "Poppins, Arial, sans-serif",
  fontSize: "30px"}}>Query anything from <a href="https://www.kiva.org/pgtmp/home" target="_blank"><span style={{textDecoration: "none", color: "rgb(147, 233, 190)"}}>KIVA</span></a>!</p>
</div>

      <FormInput></FormInput>
      <div style={{ 
        margin: "auto",
        width: "100%",
        padding: "10px",
  height: "200px",
}}>
  <p style={{
    textAlign: "center", 
  fontFamily: "Maven Pro",
  fontSize: "50px"}}></p>
</div>
    </div>
  );
};




export default App;

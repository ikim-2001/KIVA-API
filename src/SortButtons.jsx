import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const buttonStyle = {
    borderWidth: "3px",
    borderColor: "rgb(147, 233, 190)",
    borderRadius: '10%',
    alignItems: "center",
    fontFamily: "Poppins, Arial, sans-serif",
    fontSize: "20px",
    fontWeight: "bolder",
    cursor: 'pointer'
  }

  const stackStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

export default function SortButtons() {
  return (
    <div id="sort">
    <p style={{
        fontWeight: "bolder",
        textAlign: "center", 
      fontFamily: "Poppins, Arial, sans-serif",
      fontSize: "30px"}}>
        Sort By:
      </p>
    <Stack style={stackStyles} spacing={4} direction="row">
      <Button  style={buttonStyle} 
       sx={{backgroundColor: "rgb(147, 233, 190)", color: "white"}} variant="contained">Name</Button>
      <Button  style={buttonStyle}
      sx={{backgroundColor: "rgb(147, 233, 190)", color: "white"}} variant="contained">Loan Value</Button>
      <Button style={buttonStyle}
       sx={{backgroundColor: "rgb(147, 233, 190)", color: "white"}} variant="contained">Country</Button>
    </Stack>
    </div>
  );
}
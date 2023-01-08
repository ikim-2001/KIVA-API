import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

export default function CountryBox(props) {
  const [activeCountries, setActiveCountries] = useState({
    "AL": false,
    "BO": false,
    "KE": false,
    "PH": false,
    "US": false,
    "VN": false,
  })

  const handleChange = (event, nation) => {
    props.onCountryChange(event, nation)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={activeCountries}
          label="country"
          onChange={handleChange}
        >
     <FormGroup sx={{minWidth: 20}} style={{"alignItems": "center"}}>

     <FormControlLabel onChange={(e) => handleChange(e, "AL")} control={<Checkbox />} label="AL" />
     <FormControlLabel onChange={(e) => handleChange(e, "BO")} control={<Checkbox />} label="BO" />
     <FormControlLabel onChange={(e) => handleChange(e, "KE")} control={<Checkbox />} label="KE" />
     <FormControlLabel onChange={(e) => handleChange(e, "PH")} control={<Checkbox />} label="PH" />
     <FormControlLabel onChange={(e) => handleChange(e, "US")} control={<Checkbox />} label="US" />
      <FormControlLabel onChange={(e) => handleChange(e, "VN")} control={<Checkbox />} label="VN" />

    </FormGroup>
        </Select>
      </FormControl>
    </Box>
  );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function GenderBox(props) {
  const [gender, setgender] = React.useState('');

  const handleChange = (event, gender) => {
    setgender(event.target.value);
    // console.log(gender)
    props.onGenderChange(event.target.value)
  };

  return (
    <Box sx={{ minWidth: 120, bgcolor: "#fff", borderRadius: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="gender"
          onChange={(e) => handleChange(e, e.target.value)}
        >
          <MenuItem value={"male"}>male</MenuItem>
          <MenuItem value={"female"}>female</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';

export default function LimitBox(props) {
  const [input, setInput] = useState('');
  const handleChange = (event) => {
    setInput(event.target.value);
    props.onCountChange(event)
  };

  useEffect(() => {
    // Perform operation that depends on the updated value of input here.
    // console.log(input)
  }, [input]);

  return (
    <Box
      component="form"
      style={{"marginLeft": "10%"}}
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField  value={input}
                        onChange={handleChange} 
                        id="outlined-basic" 
                        label="Count Limit" 
                        variant="outlined" />
    </Box>
  );
}

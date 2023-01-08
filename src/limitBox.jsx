import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function LimitBox() {
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
      <TextField id="outlined-basic" label="Count Limit" variant="outlined" />
    </Box>
  );
}
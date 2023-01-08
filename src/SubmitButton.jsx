import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  greenButton: {
    color: theme.palette.getContrastText("#FFF"),
    backgroundColor: "#FFF"[500],
    '&:hover': {
      backgroundColor: "#FFF"[700],
    },
  },
}));

export default function SubmitButton() {
  const classes = useStyles();

  return (
    <Button variant="contained" className={classes.greenButton}>
      Green Button
    </Button>
  );
}
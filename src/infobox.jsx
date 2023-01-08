import React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Infobox = (props) => {

  const [isHover, setIsHover] = useState(false);

  const boxAttribs = 
{transition: "0.3s",
transform: isHover ? "scale(1.05)" : "scale(1)",
    float: "left",
    marginLeft: "2%",
    width: "10%",
    marginTop: "3%",
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center',}

  const handleMouseEnter = () => {
     setIsHover(true);
  };

  const handleMouseLeave = () => {
     setIsHover(false);
  };

  return (
    <Card sx={{ maxWidth: 345, maxHeight: 230 }}
    style={boxAttribs}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
            <CardMedia
         sx={{ maxWidth: 345, maxHeight: 500 }}
        title={props.name}
      >
         <img style={{
          height: "20%",
    zIndex: "-2",
    position: "relative",
                        width: "100%"}}src={props.image_url}  sx={{ maxWidth: 345, maxHeight: 500 }}></img>
      <CardActions style={{"marginTop": "-26%"}} sx={{bgcolor:"#fff"}}>
        <Button style={{"marginTop": "-4%"}} size="small">Share</Button>
        <a style={{"marginTop": "-4%"}} href='https://www.kiva.org/pgtmp/home'>
        <Button size="small">More</Button>
        </a>
      </CardActions>
      </CardMedia>
      <CardContent style={{marginTop: "-20%"}}>
        <Typography gutterBottom variant="h9" component="div">
          {props.name} ({props.country})
        </Typography>
        <Typography style={{"fontSize": "12px"}} variant="body2" color="text.secondary">
        {props.lenders} lenders in {props.activity} (${props.loanAmount}) 
        </Typography>
      </CardContent>
  </Card>
  );
};


export default Infobox;

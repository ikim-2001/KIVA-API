import React from 'react';
import { useState } from 'react';

const Infobox = (props) => {

  const [isHover, setIsHover] = useState(false);

  const boxAttribs = 
{transition: "0.3s",
transform: isHover ? "scale(1.05)" : "scale(1)",
    float: "left",
    marginLeft: "4%",
    width: "20%",
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
    <div 
    style={boxAttribs}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    >
      
    <a style={{transform: 'translateY(25%)',}}
    href={props.image_url} target="_blank" rel="noreferrer">
    <img style={{borderTopLeftRadius:"5%",
    borderTopRightRadius: "5%", 
    transform: 'translateY(25%)',
    zIndex: "-2",
    position: "relative",
                        width: "100%"}}src={props.image_url}></img>
      </a>
    <div style={{
        }}>

        <div className='box' style={{ 
                  boxShadow: "10px 2px 50px teal",
          height: "150px",
          padding: "5%",
      background: 'linear-gradient(to right, #3EB489, #4299E1)',
      borderBottomRightRadius:"5%",
      borderBottomLeftRadius: "5%"}}>
                <div key="count">
                <p style={{ fontSize: "25px",
                 fontWeight: "bolder",
                marginTop: "-1%",
                    fontFamily: "Poppins, Arial, sans-serif",}}>{props.name} ({props.country})</p>
                <p style={{ fontFamily: "Poppins, Arial, sans-serif",
                                marginTop: "-3%",
                fontSize: "15px",}}>{props.partnerName}</p>
                <p style={{ fontSize: "15px",
                                marginTop: "-1%",
             }}>{props.lenders} Lenders (${props.loanAmount})</p>
                {/* <p>Activity: {props.activity}</p> */}
            </div>
    </div>
  </div>
  </div>
  );
};

export default Infobox;

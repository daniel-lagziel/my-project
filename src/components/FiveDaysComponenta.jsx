import React from 'react'
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
export default function FiveDaysComponenta(props) {
  return (
    <div className='fiveDaysCard' style={{ border:'solid 1px black', margin:'10px'}}>
    <p> {weekday[new Date(props.post.date+", 2022").getDay()]}</p>
    <p></p>
      <p>min: {props.post.minTemp}</p>
      <p>max: {props.post.maxTemp}</p>
      <img className='iconFiveDays' src={props.post.icon} />
      
    </div>
  )
}

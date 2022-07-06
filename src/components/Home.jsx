import React from 'react';
import { useState } from 'react';
import FiveDaysComponenta from './FiveDaysComponenta';

export default function Home(props) {
  const [searchCity, setsearchCity] = useState('');
    const saveInput=(e)=>{
        setsearchCity(e.target.value)
        const value=e.target.value;
        let suggestions=[];
        if (value.length>0){
            const regex= new RegExp(`^${value}`, 'i');
            suggestions= props.searchCityHistory.sort().filter(v=> regex.test(v));
        } 
        setState(()=>({suggestions}));
    }
    const renderSuggestions=()=>{
      const {suggestions}=state;
      if (suggestions.length===0){
          return null
        }

        return(<ul name='off' className='AutoCompleteText_ul' >
          {suggestions.map((itam)=>{return <li id='li' onClick={printInInput} className='AutoCompleteText_li' >{itam}</li>})}
      </ul>    
)
    
      }  
      const printInInput  = (event)=> {
          document.getElementsByClassName('AutoCompleteText_input').textInput.value=event.target.innerHTML;
          setsearchCity(event.target.innerHTML); 
          if((state.suggestions.length==1&& state.suggestions==event.target.innerHTML)){
           state.suggestions=[]   
          }  
      };
    const [state, setState] = useState({
       suggestions:[] 
    })
    const addSearchCityHistory=()=>{
        var sum=0
        props.searchCityHistory.forEach((itam)=>{
        if (itam==searchCity) {
          sum++
        }
      })
      if (sum==0){
        props.searchCityHistory.push(searchCity)
      
      }
      }
      
    const ok=()=>{
        if ((searchCity>='a'&&searchCity<='z')||(searchCity>='A'&&searchCity<='Z')){
            props.search(searchCity)
    .then(data=>props.updateUI(data))
    .catch(err=> console.log(err));
    addSearchCityHistory()
}
else{
    alert('english only')}
    document.getElementsByClassName('AutoCompleteText_input').textInput.value='';
}
    const add=()=>{
       props.addFavorite() 
    }
    const rmove=()=>{
        props.rmoveFavorite()
    }
    const styleHome={
      fontColor:'',
      backGround:''
    }
    if (new Date().getHours()>=22||new Date().getHours()<6){
      styleHome.fontColor='white'
      styleHome.backGround='rgba(88, 146, 233, 0.6)'
    }
    const iconImg="https://www.accuweather.com//images/weathericons/"+props.show.WeatherIcon+".svg"
    const mapmap=props.fiveDays.map((itam, pos)=>{
      return <FiveDaysComponenta post={itam} key={pos}/>})
    return <div className='headerDiv'>
                <input className='AutoCompleteText_input'  id='textInput' type="text"   onChange={saveInput}/>
     {renderSuggestions()}

      <button className='buttonHome' style={{color:styleHome.fontColor}}  onClick={ok}>Search City</button>
         <div className='headerDiv'>
             <button className='buttonHome' style={{margin:'10px', borderRadius:'5px',color:styleHome.fontColor}} onClick={add}>add to favorite</button>
             <button className='buttonHome' style={{margin:'10px',  borderRadius:'5px', color:styleHome.fontColor}} onClick={rmove}>Rmove from favorite</button>
         </div>
     <div className='headerDiv' style={{display:'flex', justifyContent:'center'}}>
         <div className='toDayDiv' >
             <h3 style={{color:styleHome.fontColor}}>{props.show.cityName}</h3>
             <p>{props.show.WeatherText}</p>
             <p style={{color:styleHome.fontColor}}>{props.show.temp}c</p>
             <img className='todayIcon' src={iconImg} />
         </div>
     <div style={{margin:'70px'}} className='fiveDaysDiv' > 
           {mapmap}
      </div>
     </div>
     
  </div>
}

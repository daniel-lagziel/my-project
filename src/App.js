import {  useState } from 'react';
import './App.css';
import Favorite from './components/Favorite';
import Header from './components/Header';
import Home from './components/Home';


function App() {
  const style={backgroundImage:'url(https://wallpaperaccess.com/full/2113857.jpg)'};
  if(new Date().getHours()>6||new Date().getHours()<20){
style.backgroundImage='url(https://cdn.wallpapersafari.com/57/14/9Xatny.jpg)'
  }
  document.body.style.backgroundImage=style.backgroundImage;
  const backGroundBody=()=>{
    let hour= new Date().getHours()
    let min= new Date().getMinutes()
    // if(hour>=22||hour<6){
    //   style.backgroundImage='url(https://wallpaperaccess.com/full/2113857.jpg)'
    // }
  }
  backGroundBody()
  const styleBody={};

const [show, setShow]=useState({
  cityName:'',
  weatherText:'',
  temp:'',
  favorite:'',
  WeatherText:'',
  WeatherIcon:''
})
const [searchCityHistory, setsearchCityHistory] = useState([])
const [fiveDays, setFiveDays]=useState([
  {
    date:'',
    IconPhrase: '',
    maxTemp:'',
    minTemp:'', 
    icon:''

  },
  {
    date:'',
    IconPhrase: '',
    maxTemp:'',
    minTemp:'',
    icon:''

  },
  {
    date:'',
    IconPhrase: '',
    maxTemp:'',
    minTemp:'',
    icon:''
  },
  {
    date:'',
    IconPhrase: '',
    maxTemp:'',
    minTemp:'',
    icon:''
  },
  {
    date:'',
    IconPhrase: '',
    maxTemp:'',
    minTemp:'',
    icon:''
  }
])
const [favoriteCity,setFavoriteCity]=useState([
])
const [scrnFlag, setScrnFlag] = useState('home');
const changeScrn=()=>{
  if(scrnFlag=== 'home'){
    return <Home searchCityHistory={searchCityHistory} setsearchCityHistory={setsearchCityHistory} search={search} updateUI={updateUI} show={show} fiveDays={fiveDays} addFavorite={addFavorite} rmoveFavorite={rmoveFavorite}  />
  }
  else if(scrnFlag=== 'favorite'){
    return <Favorite favoriteCity={favoriteCity} search={search} updateUI={updateUI} /> 
  }
}
const key='ivG9STnMGSiQIBWOJfui7djXFxnyx2rq';
const getWeather= async(id)=>{
  const base='http://dataservice.accuweather.com/currentconditions/v1/';
  const query= `${id}?apikey=${key}`;
  const response= await fetch(base+query)
  const data= await response.json();
  return data[0]
}
const getCity=async(city)=>{
  const base='http://dataservice.accuweather.com/locations/v1/cities/search'
  const query= `?apikey=${key}&q=${city}`;
  const response= await fetch(base+query)
  const data= await response.json();
  return data[0];
}
const getWeatherFiveDays= async (id)=>{
  const base='http://dataservice.accuweather.com/forecasts/v1/daily/5day/'
  const query= `${id}?apikey=${key}`;
  const response= await fetch(base+query);
  const data= await response.json();
  return data;
}
const search= async(city)=>{
  const cityDets= await getCity(city);
  const weather= await getWeather(cityDets.Key);
  const fiveDays= await getWeatherFiveDays(cityDets.Key);
  return{ cityDets,weather, fiveDays}
}
const weatherTelAviv=async(city)=>{
  if (show.cityName===''){
    show.cityName='tel aviv'
    search('tel aviv')
    .then(data=>updateUI(data))
    .catch(err=> console.log(err));
  }
}  
if (show.cityName===''){
  weatherTelAviv('tel aviv') 
}
const fToC=(fTemp)=>{
  var fToCel = (fTemp - 32) * 5 / 9
  return fToCel.toFixed(1);
}
const updateUI=(data)=>{
  const cityDets= data.cityDets;
  const weather= data.weather;
  const fDays=data.fiveDays.DailyForecasts;
  show.cityName=cityDets.EnglishName;
  show.weatherText=weather.WeatherText;
  show.temp=weather.Temperature.Metric.Value;
  show.WeatherText=weather.WeatherText;
  show.WeatherIcon=weather.WeatherIcon;
  fiveDays.forEach((itam,i,fives)=>{
    fiveDays[i].date=fDays[i].Date.slice(5,10);
    fiveDays[i].maxTemp=fToC(fDays[i].Temperature.Maximum.Value) +'c';
    fiveDays[i].minTemp=fToC(fDays[i].Temperature.Minimum.Value) +'c';
    fiveDays[i].IconPhrase=fDays[i].Day.IconPhrase;
    fiveDays[i].icon="https://www.accuweather.com//images/weathericons/"+fDays[i].Day.Icon+".svg"
  })
  setScrnFlag('favorite');
  setScrnFlag('home')
}
const addFavorite=()=>{ 
  var sum=0
favoriteCity.forEach((itam)=>{
  if (itam.cityName===show.cityName) {
    sum++
    alert ('The city is a favorite');
  }
})
if (sum==0){
  favoriteCity.push({cityName:show.cityName,temp:show.temp, icon:"https://www.accuweather.com//images/weathericons/0"+show.WeatherIcon+".svg"})

}
}
const rmoveFavorite=()=>{
  favoriteCity.forEach((itam,i)=>{
    if (itam.cityName===show.cityName) {
      favoriteCity.splice(i,1)
    }
  })
  
}

  return (
    <div className="App">
      <h1>heyy</h1>
      <Header setScrnFlag={setScrnFlag}/>
      <hr/>
      {changeScrn()}
</div>
    
  );
}

export default App;

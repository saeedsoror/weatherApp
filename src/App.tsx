import './mobile.css'
import './App.css'
import FirstCard from './FirstCard'
import SecCard from './SecCard'
import './lap.css'
function App() { 
  const getWeatherIcon : string = (description: string) => {
      description = description.toLowerCase();
      if (description.includes("clear")) return <img src="/public/newImg/sun.svg" alt={description} className='theImgInApp' />;
      if (description.includes("cloud")) return <img src="/public/newImg/cloudy.svg" alt={description} className='theImgInApp' />;
      if (description.includes("rain")) return <img src="/public/newImg/rain.svg" alt={description} className='theImgInApp' />;
      if (description.includes("storm")) return <img src="/public/newImg/storm.svg" alt={description} className='theImgInApp' />;
      if (description.includes("snow")) return <img src="/public/newImg/overcast-snow.svg" alt={description} className='theImgInApp' />;
      if (description.includes("mist")) return <img src="/public/newImg/fog.svg" alt={description} className='theImgInApp' />;
      if (description.includes("drizzle")) return <img src="/public/newImg/drizzle.svg" alt={description} className='theImgInApp' />;
      if (description.includes("haze")) return <img src="/public/newImg/newImg2/v.svg" alt={description} className='theImgInApp' />;
      return <img src="/public/thermometer.png" alt={description} className='theImgInApp' />;
    };
  return (
    <>
      <div className="mainCont">
        <div className="theBackground"></div>
        <FirstCard iconsWeather={getWeatherIcon} />
        <SecCard iconsWeather={getWeatherIcon} />
      </div> 
    </>
  )
}

export default App

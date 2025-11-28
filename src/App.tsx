import './mobile.css'
import './App.css'
import FirstCard from './FirstCard'
import SecCard from './SecCard'
import './lap.css'
import type { JSX } from 'react'
function App() { 
  const getWeatherIcon = (description: string) : JSX.Element => {
      description = description.toLowerCase();
      if (description.includes("clear")) return <img src="/newImg/sun.svg" alt={description} className='theImgInApp' />;
      if (description.includes("cloud")) return <img src="/newImg/cloudy.svg" alt={description} className='theImgInApp' />;
      if (description.includes("rain")) return <img src="/newImg/rain.svg" alt={description} className='theImgInApp' />;
      if (description.includes("storm")) return <img src="/newImg/storm.svg" alt={description} className='theImgInApp' />;
      if (description.includes("snow")) return <img src="/newImg/overcast-snow.svg" alt={description} className='theImgInApp' />;
      if (description.includes("mist")) return <img src="/newImg/fog.svg" alt={description} className='theImgInApp' />;
      if (description.includes("fog")) return <img src="/newImg/newImg2/v.svg" alt={description} className='theImgInApp' />;
      if (description.includes("drizzle")) return <img src="/newImg/drizzle.svg" alt={description} className='theImgInApp' />;
      if (description.includes("haze")) return <img src="/newImg/newImg2/v.svg" alt={description} className='theImgInApp' />;
      return <img src="/thermometer.png" alt={description} className='theImgInApp' />;
    };
  return (
    <>
      <div className="mainCont">
        <div className="theBackground"></div>
        <FirstCard />
        <SecCard iconsWeather={getWeatherIcon} />
      </div> 
    </>
  )
}

export default App

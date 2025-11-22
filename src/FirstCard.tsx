import { useEffect, useRef, useState, type JSX } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
interface props{
    iconsWeather: JSX.Element;
};

export default function FirstCard({iconsWeather} : props) {
  interface TimeData {
    name: string;
    weather: { main: string, description: string , icon:string }[];
    base: string;
    timezone: number;
    dt: number;
    main:{ temp : number , feels_like: string , humidity : number}; 
    wind: {
      speed: number;
      deg: number;
    };
    dt_txt: string;
    uvi: number;
    visibility: number;
  }

  useEffect(()=>{
    AOS.init({duration : 800})
  })




  const [data, setData] = useState<TimeData | null>(null);
  const [timeString, setTimeString] = useState<string>("loading...");
  const [fore , setFore] = useState<TimeData | []>([]);







  
  useEffect(() => {
    const fetchFore = async () =>{
      const res = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=Cairo&appid=ee9ff75b71b9000191b31045e429e4f2&units=metric");
      const data = await res.json();
      setFore(data.list.slice(0,4));
    }
    fetchFore();
  },[]);







  

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const res = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=Cairo&appid=ee9ff75b71b9000191b31045e429e4f2&units=metric"
        );
        const ddata = await res.json();
        setData(ddata);
      } catch {
        console.error("error fetching data");
      };
    };

    fetchTime();
    const interval = setInterval(fetchTime, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!data) return;

    const updateCityTime = () => {
      const now = new Date();
      const localOffset = now.getTimezoneOffset() * 60;
      const cityTime = new Date(now.getTime() + (data.timezone + localOffset) * 1000);
      const formattedTime = cityTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTimeString(formattedTime);
    };

    updateCityTime();
    const timer = setInterval(updateCityTime, 10000);

    return () => clearInterval(timer);
  }, [data]);

  useEffect(() => {
    const spot = document.querySelector(".light-spot") as HTMLElement | null;
    if (!spot) return;

    const handleMove = (e: MouseEvent) => {
      spot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    document.addEventListener("mousemove", handleMove);

    return () => {
      document.removeEventListener("mousemove", handleMove);
    };
  }, []);
  const numRef = useRef<HTMLHeadingElement>(null)
  useEffect(()=>{
    const el = numRef.current
    if(!el || !data) return
    const goul = Math.round(data.main.temp);
    let curent = 0;

    const speed = (1500 / goul);
    const timer = setInterval(() => {
      curent++;
      el.textContent = curent.toString();
      if(curent === goul){
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  },[data])

  
  // .toFixed(1)






  const getWeatherIcon : string = (description: string) => {
      description = description.toLowerCase();
      if (description.includes("clear")) return "☀️";
      if (description.includes("cloud")) return "☁️";
      if (description.includes("rain")) return "🌧️";
      if (description.includes("storm")) return "⛈️";
      if (description.includes("snow")) return "❄️";
      return "🌡️";
    };

    const getWeatherIcon2 : string = (description: string) => {
      description = description.toLowerCase();
      if (description.includes("clear")) return <img src="/public/newImg/sun.svg" alt={description} className='theMainImgInApp' />;
      if (description.includes("cloud")) return <img src="/public/newImg/cloudy.svg" alt={description} className='theMainImgInApp' />;
      if (description.includes("rain")) return <img src="/public/newImg/rain.svg" alt={description} className='theMainImgInApp' />;
      if (description.includes("storm")) return <img src="/public/newImg/storm.svg" alt={description} className='theMainImgInApp' />;
      if (description.includes("snow")) return <img src="/public/newImg/overcast-snow.svg" alt={description} className='theMainImgInApp' />;
      if (description.includes("mist")) return <img src="/public/newImg/fog.svg" alt={description} className='theMainImgInApp' />;
      if (description.includes("drizzle")) return <img src="/public/newImg/drizzle.svg" alt={description} className='theMainImgInApp' />;
      if (description.includes("haze")) return <img src="/public/newImg/newImg2/v.svg" alt={description} className='theMainImgInApp' />;
      return <img src="/public/thermometer.png" alt={description} className='theImgInApp' />;
    };
    const getWeatherIcon3 : string = (description: string) => {
      description = description.toLowerCase();
      if (description.includes("clear")) return <img src="/public/newImg/sun.svg" alt={description} className='theMainImgInApp2' />;
      if (description.includes("cloud")) return <img src="/public/newImg/cloudy.svg" alt={description} className='theMainImgInApp2' />;
      if (description.includes("rain")) return <img src="/public/newImg/rain.svg" alt={description} className='theMainImgInApp2' />;
      if (description.includes("storm")) return <img src="/public/newImg/storm.svg" alt={description} className='theMainImgInApp2' />;
      if (description.includes("snow")) return <img src="/public/newImg/overcast-snow.svg" alt={description} className='theMainImgInApp2' />;
      if (description.includes("mist")) return <img src="/public/newImg/fog.svg" alt={description} className='theMainImgInApp2' />;
      if (description.includes("drizzle")) return <img src="/public/newImg/drizzle.svg" alt={description} className='theMainImgInApp2' />;
      if (description.includes("haze")) return <img src="/public/newImg/newImg2/v.svg" alt={description} className='theMainImgInApp2' />;
      return <img src="/public/thermometer.png" alt={description} className='theImgInApp' />;
    };

  return (
    <>
      <div className="firstCard">
        <div className="firstBoxOnFirstCard">
          <div className="degBox">
            <div className="timeInDegBox">
              <h3 className="EgyptText">
                <div>
                  
                {data? data.name : "Loading..."}
                <p className="timeStringInFirstCard">{timeString}</p>
                </div>
                <img src="/public/theLocationMainImg/location-dot-solid-full (1).svg" alt="" className="theMainLocation" />
              </h3>
              <div className="degInFirstDegBox">
                {/* <h1> */}
                {
                  data?
                  (getWeatherIcon2(data.weather[0].description))
                  :
                  ("loading...")
                }
                <h1 ref={numRef} className="degInFirstDegBox1 num">
                  0
                  {/* {data ? `${data.main.temp.toFixed(1)}` : "Loading temperature..."} */}
                  </h1>
                <h1 className="degInFirstDegBox2">°C</h1>
                {/* </h1> */}
              </div>
              <p className="disTextInMainBox">
                {data? `The weather in ${data.name} is ${data.weather[0].description}. 
                    The temperature is ${data.main.temp}°C but it feels like ${data.main.feels_like}°C. 
                    Humidity is around ${data.main.humidity}%, 
                    and the wind speed is ${data.wind.speed} m/s.`
                  : "Loading weather details..."}
              </p>
            </div>
          </div>
          <div className="degBox2">
              {Array.isArray(fore) && fore.length > 0 ? (

                fore.map((item, index) => (
                  <div key={index} className="weatherToday" data-aos="fade-up">

              <p className="firstTextInWeatherToday">
                <b style={{color:"#E3F2FD"}}>{new Date(item.dt_txt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</b>
              </p>
              <hr style={{color:"white",width:"70%",margin:"auto"}} className="theHrInFirstTextInWeatherToday"/>
              <p className="secTextInWeatherToday" style={{color:"#ffffffff"}}>
                {getWeatherIcon3(item.weather[0].description)} {item.main.temp.toFixed(1)}°C
              </p>
              <small className="therTextInWeatherToday" style={{color:"#E3F2FD"}}>{item.weather[0].description}</small>
            </div>
          ))) : (
            <p>loading...</p>
          )}
          </div>
        </div>

        <div className="secBoxInFirstCard">
          <div className="positionBox">

          
          <div className="TextInSecBoxInFirstCard">
            <h3>Overview</h3>
          </div>
          <hr style={{color:"white",width:"70%",margin:"auto"}} className="theHrInHumCard"/>
          <div className="threeDiv">
            <div className="oneDivInThreeDiv divInThreeDiv" data-aos="fade-up">
              <p style={{color:"#E3F2FD",textAlign:"center",width:"100%"}}>Humidity</p>
              <div className="humidityIconBox">
                <img className="humidityIcon" src="/public/newImg/newImg2/humidity.svg" alt="" />
              </div>
              <p  style={{textAlign:"center",color:"#E3F2FD",width:"100%"}} className="theTherTextInOverView">{data ? data.main.humidity : "Loading..."}%</p>
            </div>
            <div className="twoDivInThreeDiv divInThreeDiv" data-aos="fade-up">
              <p style={{color:"#E3F2FD",textAlign:"center",width:"100%"}}>Wind Speed</p>
              <div className="humidityIconBox">
                <img className="humidityIcon" src="/public/newImg/newImg2/wind.svg" alt="" />
              </div>
              <p  style={{textAlign:"center",color:"#E3F2FD",width:"100%"}} className="theTherTextInOverView">{data ? (data.wind.speed * 3.6).toFixed(1) : "Loading..."}km/h</p>
            </div>
            <div className="threeDivInThreeDiv divInThreeDiv" data-aos="fade-up">
              <p style={{color:"#E3F2FD",textAlign:"center",width:"100%"}}>Visibility</p>
              <div className="humidityIconBox">
                <img className="humidityIcon" src="/public/newImg/newImg2/v.svg" alt="" />
              </div>
              <p  style={{textAlign:"center",color:"#E3F2FD",width:"100%"}} className="theTherTextInOverView">{data ? (data.visibility / 1000) : "Loading..."}km</p>
            </div>
          </div>
          </div>
        </div>
        <div className="light-spot"></div>
      </div>
    </>
  );
}
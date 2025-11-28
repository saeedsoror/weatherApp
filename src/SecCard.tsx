import { useEffect, useState, type JSX } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
interface props{
    iconsWeather: (desc: string) => JSX.Element;
}
export default function SecCard({iconsWeather} : props){
    interface CuntTime {
  name: string;
  country: string;
  temp: number;
  main: string;
  icon: string;
  description: string;
}

    const [dataa,setData] = useState<CuntTime[]>([]);
    useEffect(() => {
        const getF = async () => {
            const cities = ["Paris", "Dubai", "New York", "Berlin"];
            const promises = cities.map(async (city) => {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ee9ff75b71b9000191b31045e429e4f2&units=metric`);
                const data = await res.json();
                return {temp :data.main.temp,
                     main : data.weather[0].main,
                     icon:  data.weather[0].icon,
                    name :  data.name,
                      country :  data.sys.country,
                       description :  data.weather[0].description} as CuntTime;
            });
            const results = await Promise.all(promises);
            setData(results);
        };
        getF();
    }, []);
    
    useEffect(()=>{
      AOS.init({duration : 800})
    } , [])
    

const newData = [...dataa];
return(
    <>
        <div className="secCard">
            {newData.filter((ele,ind)=>{return newData.indexOf(ele) === ind}).map(ele =>(
                <div className="locationWeatherBox" data-aos="slide-left">
                    <div className="firstDivInSecCard">
                        <p className="theWeatherInSecBox">{ele.name}</p>
                        <h4 className="theWeatherInSecBox">{ele.country}</h4>
                        <p className="theWeatherInSecBox">{ele.description}</p>
                    </div>
                    <div className="secDivInSecCard">
                            {iconsWeather && iconsWeather(ele.description)}
                    </div>
                </div>)
            )}
        </div>
    </>
)}
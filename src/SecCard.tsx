import { useEffect, useState, type JSX } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
interface props{
    iconsWeather: (desc: string) => JSX.Element;
}
export default function SecCard({iconsWeather} : props){
    interface CuntTime{
        name: string;
        weather:{main:string,description: string,icon:string};
        timezone: number;
        dt: number;
        main:{ temp : number , feels_like: string , humidity : number};
        sys:{country:string}
    }
    const [dataa,setData] = useState<CuntTime | []>([]);
    useEffect(() => {
        const getF = async () => {
            const cities = ["Paris", "Dubai", "New York", "Berlin"];
            const promises = cities.map(async (city) => {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ee9ff75b71b9000191b31045e429e4f2&units=metric`);
                const data = await res.json();
                return [data.main.temp, data.weather[0].main, data.weather[0].icon, data.name, data.sys.country,data.weather[0].description];
            });
            const results = await Promise.all(promises);
            setData(results);
        };
        getF();
    }, [dataa]);
    
    useEffect(()=>{
      AOS.init({duration : 800})
    })
    

const newData = [...dataa];
const uniqArr = [...new Set(newData)];
// console.log(uniqArr);
// console.log(newData);
return(
    <>
        <div className="secCard">
            {newData.filter((ele,ind)=>{return newData.indexOf(ele) === ind}).map(ele =>(
                <div className="locationWeatherBox" data-aos="slide-left">
                    <div className="firstDivInSecCard">
                        <p className="theWeatherInSecBox">{ele[4]}</p>
                        <h4 className="theWeatherInSecBox">{ele[3]}</h4>
                        <p className="theWeatherInSecBox">{ele[1]}</p>
                    </div>
                    <div className="secDivInSecCard">
                            {iconsWeather && iconsWeather(ele[5])}
                    </div>
                </div>)
            )}
        </div>
    </>
)}
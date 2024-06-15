import './root.css';
import d10 from '../img/01d.png'
import d20 from '../img/02d.png'
import d30 from '../img/03d.png'
import d40 from '../img/04d.png'
import d90 from '../img/09d.png'
import d11 from '../img/11d.png'
import d31 from '../img/13d.png'
import d05 from '../img/50d.png'
import bgn from '../img/bgn.jpeg'
import bgd from '../img/bgd.jpeg'
import getData from '../jsFiles/lat';
import getLocation from '../jsFiles/getlocation';
import {useRef, useState } from 'react';
import Next from './next';
export default function Root(){
        const inputref=useRef();
        const currDate=new Date();
        const[input,setInput]=useState('')
        const[arr,setArr]=useState([])
        const[temp,setTemp]=useState(0);
        const[hour,setHours]=useState(currDate.getHours());
        const[promise,setPromise]=useState(false);
        var result;
    
        setTimeout(()=>{
            setHours(currDate.getHours());
    
        },60000)
        
        const fetchData=async()=>{
            try{
            await getLocation().then((data)=>{
                setData(
                    {currData:data.currData,forecastData:data.foreCastDates,icon:data.currData.icon.replace('n','d')}
                );
                
                if(result===false){
                setPromise(false)
                }
                else{
                    setArr(data.name);
                setTemp((data.currData.temp-273.15).toFixed(2));
                setPromise(true)
        }
    
            })
          
            }
            catch(promise){
                console.log('Error: ',promise)
            }
           
        }
     
        const [Data, setData] = useState(fetchData);
    async function handleSubmit(e){
        try {
    
            e.preventDefault();
    setInput(inputref.current.value);
    inputref.current.blur();
    
    await getData(inputref.current.value).then((data)=>{
       
        setData((c)=>{
            return{currData:data.currData,forecastData:data.foreCastDates,icon:data.currData.icon}
        });
        setPromise(true)
         if(data===false){
        setPromise(false)
        }
        else{
            setArr(data.name);
        setTemp((data.currData.temp-273.15).toFixed(2));
        inputref.current.value='';
        
        }
        
    }).catch((err)=>{
        console.log('Error: ',err)
    })
            
        } catch (error) {
            console.log('Error: ',error)
        }
    }
   


return(
    <>
    {promise ? <div id="background" style={{backgroundImage:Data.icon[2]==='n' ?`url(${bgn})`:`url(${bgd})`}}>
            <form onSubmit={handleSubmit}>
            <input type="text" ref={inputref} id="input" placeholder='Enter The City ...' onClick={(evt)=>{evt.target.select()}} on/></form>
            <div id="internal">
            {promise ?<div id="container">
                    <section>
                    <img src={Data.icon=="01d"?d10:Data.icon=="02d"?d20:Data.icon=="03d"?d30:Data.icon=="04d"?d40:Data.icon=="09d"?d90:Data.icon=="11d"?d11:Data.icon=="13d"?d31:d05}  alt="Not Loaded" />
              <h2 id='condition'>Weather:{Data.currData.Weather}</h2>
                    </section>
                    <div id="internalCont">
                    <h2>Today</h2>
                     <h3 className='title'><b>{arr[0]}</b></h3>
                     <p><b>{arr[arr.length-4]}</b></p>
                     <p><b>{arr[arr.length-3]}</b></p>
                     <p><b>{arr[arr.length-1]}</b></p>
                     <h3 className='title' style={{fontSize:'50px'}}>{temp}°C</h3>
                    </div>
                </div>: <p>Loading...</p> }
            </div>
{promise &&<div id='individual'>
  
    <Next result={Data.forecastData[0]}/>
    <Next result={Data.forecastData[1]}/>
    <Next result={Data.forecastData[2]}/>
    <Next result={Data.forecastData[3]}/>
  
</div>}
        </div>:<div className="loader"></div>}</>
        )
}
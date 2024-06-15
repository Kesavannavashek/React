import axios from 'axios'

let coOrd={
    name:'',
    currData:'',
    foreCastDates:''
}

function getDayOfWeek(dateString) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    const dayName = daysOfWeek[dayIndex];
    return dayName;
}
async function getfulldata(lat,lon,name){
    let arr;
    const currDate=new Date()
    const todayDate= currDate.getDate();
    
  

    await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fa0ddf42b54a1163ac6bb4d4bf6aa1f1`).then((data)=>{

        {coOrd.currData={temp:data.data.main.temp,humid:data.data.main.humidity,Weather:data.data.weather[0].main,icon:data.data.weather[0].icon},coOrd.name=name}
    }).catch((err)=>{
return err
    })
    await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=fa0ddf42b54a1163ac6bb4d4bf6aa1f1`).then((data)=>{
        arr=(data.data.list)
        
        let newArr=arr.filter((item)=>{
           return (item.dt_txt.split(' ')[1])==='06:00:00' 
        })
        newArr.forEach((item)=>{
            let date=item.dt_txt.split(' ')[0];
            item.day=getDayOfWeek(date)
            })
        arr=newArr.map((item)=>(
        {day:item.day,temp:item.main.temp,date:item.dt_txt.split(' ')[0].split('-'),pop:item.pop,cloud:item.clouds.all,icon:item.weather[0].icon}
        ))
       
        if(parseInt(arr[0].date[2])!==todayDate){
            {coOrd.foreCastDates=arr}
        }
        else{
            newArr=arr.filter((item)=>{
                return parseInt(item.date[2])!==todayDate
            })
            {coOrd.foreCastDates=newArr}
        }
        
        
       
    }).catch((err)=>{
return err
    })
     return coOrd;
}

export default getfulldata;
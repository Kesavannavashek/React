import axios from 'axios'
import getfulldata from './getData';
let coOrd={
    lat:'',
    lon:'',
    name:'',
    currData:'',
    foreCastDates:''
}

async function getData(name){
    let error;
    await axios.get(`https://us1.locationiq.com/v1/search?key=pk.6df0b5456c55c2a98f14b95170130c43&q=${name}&format=json&`).then((data)=>{
        coOrd.lat=data.data[0].lat,coOrd.lon=data.data[0].lon,coOrd.name=data.data[0].display_name.split(',');
        error=false
    }).catch((err)=>{
        if(err){
            error=true;
        }  
    })
    var result= await getfulldata(coOrd.lat,coOrd.lon,coOrd.name);
        return result;
}

export default getData;





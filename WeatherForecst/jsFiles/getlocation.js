import getfulldata from "./getData";
import axios from 'axios'
let coOrd = {
  lat: '',
  lon: '',
  name: '',
  currData: '',
  foreCastDates: ''
};

async function getLocation() {
  try {
    if (navigator.geolocation) {

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      coOrd.lat = position.coords.latitude;
      coOrd.lon = position.coords.longitude;
      await axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.6df0b5456c55c2a98f14b95170130c43&lat=${coOrd.lat}&lon=${coOrd.lon}&format=json&`).then((data)=>{
        coOrd.name=data.data.display_name.split(',');
      })

      const result = await getfulldata(coOrd.lat, coOrd.lon,coOrd.name);
      return result;
    } else {
      console.log("Geolocation is not supported by this browser.");
      return null;
    }
  } catch (error) {
    console.error("Error getting location or data:", error.message);
    return null;
  }
}

export default getLocation;

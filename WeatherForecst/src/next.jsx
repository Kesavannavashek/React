import './root.css'
import d10 from '../img/01d.png'
import d20 from '../img/02d.png'
import d30 from '../img/03d.png'
import d40 from '../img/04d.png'
import d90 from '../img/09d.png'
import d11 from '../img/11d.png'
import d31 from '../img/13d.png'
import d05 from '../img/50d.png'
export default function Next({result}){
  let day=result.day;
  let icon=result.icon.replace('n','d');
  let temp=(result.temp-273.15).toFixed(2);
    return(
        <div className='next'>
          <h3 className='nxttit'>{day}</h3>
          <img id='nextimg' src={icon=="01d"?d10:icon=="02d"?d20:icon=="03d"?d30:icon=="04d"?d40:icon=="09d"?d90:icon=="11d"?d11:icon=="13d"?d31:d05} alt="Not Loaded" />
          <p><b>{temp}°C</b></p>
        </div>
    )
}
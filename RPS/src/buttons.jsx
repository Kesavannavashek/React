import './button.css'
import Button from '@mui/material/Button';
export default function Buttons({choice}){
const handleClick = (e) => {
    choice(e.target.name);
}
      return(
       <div className='group'>
<Button className='Button' onClick={handleClick} name="rock"><img name="rock" src=".\img\rock.png" alt="" /></Button>
<Button className='Button' onClick={handleClick} name="paper"><img name="paper" src=".\img\paper.png" alt="" /></Button>
<Button className='Button' onClick={handleClick} name="scissor"><img className='last' name="scissor"  src=".\img\sci.png" alt="" /></Button>
</div>
    )
}
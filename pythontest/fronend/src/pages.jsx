import './app.css'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react'
export default function Pages(){


    const[no,Setno]=useState(0)

    const handleinc=()=>{
        if(no!==-5)
        Setno(c=>c-1)
        else
        alert('max reached')
    }
    const handledec=()=>{
        if(no!==0)
        Setno(c=>c+1)
        else
        alert('max reached')
    }
  
    return(
        <div className="container">
            <p>{no}</p>
            <form action="">
                <input type="text" placeholder='enter the city name' />
            </form>
            <div className="biddiv">
                <div className="dec"><button onClick={handledec} >
  <NavigateNextIcon/>
</button></div><div className='smalldiv'>
                <div className={no==0?'cont0':no==-1?'l1':no==-2?'l2':no==-3?'l3':no==-4?'l4':'l5'}><h1>DIV 0</h1></div>
                <div className={no==0?'r1':no==-1?'cont0':no==-2?'l1':no==-3?'l2':no==-4?'l3':'l4'}><h1>DIV 1</h1></div>
                <div className={no==0?'r2':no==-1?'r1':no==-2?'cont0':no==-3?'l1':no==-4?'l2':'l3'}><h1>DIV 2</h1></div>
                <div className={no==0?'r3':no==-1?'r2':no==-2?'r1':no==-3?'cont0':no==-4?'l1':'l2'}><h1>DIV 3</h1></div>
                <div className={no==0?'r4':no==-1?'r3':no==-2?'r2':no==-3?'r1':no==-4?'cont0':'l1'}><h1>DIV 4</h1></div>
                <div className={no==0?'r5':no==-1?'r4':no==-2?'r3':no==-3?'r2':no==-4?'r1':'cont0'}><h1>DIV 5</h1></div>
                </div>
                <div className='inc'><button onClick={handleinc} >
  <NavigateNextIcon />
</button></div>
            </div>
        </div>
    )
}
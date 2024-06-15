import { useState } from "react"
import Buttons from "./buttons"
import './index.css'
export default function Gameboard(){
const[choice,setChoice]=useState({playerChoice:'',ComputerChoice:'' })
const[winner,setWinner]=useState({player:false,computer:false,tied:false})
const[score,setScore]=useState({playerScore:0,ComputerScore:0})

const handlechoice=(name)=>{
    const computerChoice= ['rock', 'paper', 'scissor'][Math.floor(Math.random() * 3)];
 setChoice({playerChoice:name,ComputerChoice:computerChoice})
 if (
    (name === 'rock' && computerChoice === 'scissor') ||
    (name === 'paper' && computerChoice === 'rock') ||
    (name === 'scissor' && computerChoice === 'paper')
  ) {
    setWinner({ player: true, computer: false });
    setScore((prev) => ({ ...prev, playerScore: prev.playerScore + 1 }));
  } else if (
    (computerChoice === 'rock' && name === 'scissor') ||
    (computerChoice === 'paper' && name === 'rock') ||
    (computerChoice === 'scissor' && name === 'paper')
  ) {
    setWinner({ player: false, computer: true });
    setScore((prev) => ({ ...prev, ComputerScore: prev.ComputerScore + 1 }));
  } 
  else {
    setWinner({ player: false, computer: false ,tied:true});
  }
}

    return(
        <div style={{textAlign:'center'}}>
            <h1>Welcome To Rock Paper Scissor Game</h1>

<hr />

            <h2 style={{backgroundColor:winner.player?'green': winner.computer ?'red':winner.tied?'blue':null,width:'70%'}}>{winner.player?'You Win': winner.computer ? 'Computer Wins' : winner.tied?'Tied':null}</h2>


            <h3 style={{display:'inline'}}>Your Choice : {choice.playerChoice}</h3>
            
            {winner.player?<span>✔️</span>: <span>✖️</span>}
            
            <br/><br/><br/>

            <h3 style={{display:'inline'}}>Computer Choice : {choice.ComputerChoice}</h3>
            
            {winner.computer?<span>✔️</span>: <span>✖️</span>}

            <h3>Your Score : {score.playerScore}</h3>

            <h3>Computer Score : {score.ComputerScore}</h3>

            <Buttons choice={handlechoice}/>
        </div>
    )
        
    
}
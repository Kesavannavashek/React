import Root from "./root"
import checkInternet from "../jsFiles/checkInernet"
function App() {
  const isOnine=checkInternet();
 return (<>
  { isOnine ? <Root/>: <div style={{display:'flex',flexDirection:'column',justifyItems:'center',alignItems:'center',textAlign:'center'}}><h1>Connect The Internet</h1>
  <img style={{border:'none'}} src="./img/notConnected.jpeg" alt="Connect the internet" /></div> }
 </>)
}

export default App

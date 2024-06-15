import React, { useRef, useState } from "react";
import List from "./list";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo ,noEdit} from "./redux";

function App() {
const input=useRef('') 
  const dispatch = useDispatch();
  const edit = useSelector((state) => 
{
  console.log(state.edit);
  return state.edit});

  if(edit.isEdit===true){
    input.current.value=edit.msg;
    input.current.focus();
  }
 

const submitEdit=()=>{
  dispatch(editTodo(edit.id,input.current.value));
  input.current.focus();
  input.current.value=''
  dispatch(noEdit())
}

  

  const handleAdd = () => {
    dispatch(addTodo(input.current.value));
    input.current.value=''
    input.current.focus();
  };

  return (
    <>
      <input ref={input} type="text" />
      {!edit.isEdit ?<button  style={{margin:'20px'}}  onClick={handleAdd}>ClickToAdd</button>:<button  style={{margin:'20px'}}  onClick={submitEdit}>ClickToUpdate</button>}
      
    <div style={{display:'flex',alignItems:'center'}}>  
    <List />
    </div>
      
    </>
  );
}

export default App;

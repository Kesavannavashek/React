import { useEffect, useState } from 'react'
import './App.css'
import List from './list'
import Newtodoform from './newTodoForm'
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { v4 as uuidv4 } from 'uuid'; 
import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';

const getTodos=()=>{
  const data = JSON.parse(localStorage.getItem("todos"));
  if (!data){
    
    return [];
  } 
  return data;
};
function Listitems() {

  const[todos,settodos]=useState(getTodos)

      useEffect(()=>{
      localStorage.setItem("todos", JSON.stringify(todos));
      if(todos.length === 0)
      setopen(false)
    },[todos])

    
   

  const[open,setopen]=useState(false)
  const[edit,setEdit]=useState({editext:null,isEditext:false,id:null})


 

  const toggle=(id)=>{
   settodos(prevtodo=>(
    prevtodo.map(todo=>{
      if(todo.id===id)
       return{...todo,completed:!todo.completed}
       else
       return todo
})
   ))
  
}

const finalEdit = (text, id) => {
    settodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, msg: text } : todo
      )
    );
    setEdit({editext:null,isEditext:false,id:null})
}

const addtodo=(text)=>{
    settodos(prevtodo=>{
       return [...prevtodo,{msg:text,id:uuidv4(),completed:false}]
    })
}

const toggleopen=()=>{
    setopen(!open);
}


  const handleDelete=(id)=>{
settodos(prevtodo=>{
  return prevtodo.filter(todo=>{
   return todo.id!==id; 
})

  })}
  

const handleedit=(id)=>{
    setopen(true)
todos.map(todo=>{
if(todo.id===id){
setEdit(pre=>{
    return{...pre,editext:todo.msg,isEditext:true,id:todo.id}
})
}
})
}
 return (
  <Box sx={{backgroundColor:'#333',borderRadius:'25px',width:'500px',padding:'10px 15px 10px 15px'}}>
    <div>
    <div>
        <h1 style={{fontFamily:'sans-serif',textAlign:'center',margin:'15px',color:'white'}}>Todos</h1>
        <hr />
      {todos.map(todo=>(
  <List key={todo.id} todo={todo} toggle={()=>toggle(todo.id)} tododelete={handleDelete} todoedit={handleedit}/>
       ))
      }
    
    </div>
    {open ? null:<Zoom  in={!open}
          timeout={ { enter: 500 }}><div style={{textAlign:'center'}}>
    <IconButton sx={{color:'white',width:'150px',height:'50px',borderRadius:'20px',margin:'15px',fontFamily:'cursive'}} onClick={toggleopen}>
    <AddIcon sx={{color:'white',width:'30px',height:'30px'}}/>
    AddTodo</IconButton></div></Zoom>}
    {open &&<Zoom  in={open}
           timeout={{ enter: 500 }}>
   <div> <Newtodoform addtodo={addtodo} editodo={edit} handleEdit={finalEdit}/></div>
  </Zoom> }</div></Box>
  )
}


export default Listitems

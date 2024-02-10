import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function List({todo,tododelete,toggle,todoedit}){
const todosdelete=()=>{
        tododelete(todo.id)
}
const handleEdit=()=>{
todoedit(todo.id);
}

    
    return(<div sx={{color:'white',}}>
        
        <div style={{cursor:'pointer',display:'inline-flex',justifyContent:'space-around'}} onClick={toggle}> 
        <Checkbox sx={{color:'white',mr:'20px'}} checked={todo.completed}/>
       <p style={{fontFamily:'cursive',textDecoration:todo.completed?'line-through':'none',width:'300px',wordBreak:'break-all',fontSize:'25px',margin:'15px 0',color:'white',textTransform:'capitalize'}}>{todo.msg}</p>
       <IconButton aria-label="delete" sx={{color:'white',marginLeft:'30px'}} onClick={todosdelete}>
       <DeleteIcon />
     </IconButton></div>
     <div style={{display:'inline-flex',marginLeft:'25px'}}>
     <IconButton onClick={handleEdit}>
       <EditOutlinedIcon sx={{color:'white'}}/>
     </IconButton></div>
     </div>
    )}
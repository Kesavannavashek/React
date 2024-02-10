import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useState , useEffect, useRef} from 'react';
import Alert from '@mui/material/Alert';

export default function Newtodoform({addtodo,editodo,handleEdit}){
const[text,setText]=useState('')
const[isempty,setisempty]=useState();
const inputref=useRef(null)

useEffect(() => {
    if (editodo.isEditext) {
      setText(editodo.editext);
    }
     inputref.current.focus();
      
  }, [editodo]);
const handleSubmit=e=>{
    e.preventDefault();
    if(text===''){
        setisempty(true)
        inputref.current.focus();
   }
    else{
        if(editodo.isEditext){
            handleEdit(text,editodo.id)
                }
                else{addtodo(text);}
       
        setText('');
        setisempty(false)
    }
}


const updateInput=(evt)=>{
setText(evt.target.value)
}

    return(
        <form  onSubmit={handleSubmit}>
            
              <FormControl sx={{ m: 1, width: '25ch',color:'white'}} variant="standard" >
          <InputLabel ref={inputref} sx={{color:'white'}} htmlFor="newtodo">{editodo.isEditext?'Edit todo':isempty ? 'enter any todo' : 'Enter New Todo'}</InputLabel>
          <Input 
          sx={{color:'white',width:'490px',margin:'auto',fontFamily:'cursive',fontSize:'20px'}} 
        autoFocus
          focused
          id='newtodo'
          name='todo'
          value={text}
          onChange={updateInput}
            endAdornment={
              <InputAdornment   position="end">
                <IconButton sx={{color:'white',width:'35px',height:'35px'}} onClick={handleSubmit}>
               <AddIcon style={{width:'30px',height:'30px'}}/>
                </IconButton>
              </InputAdornment>
            }
          />
          {isempty ?<div style={{width:'490px',margin:'20px 0'}}> <Alert style={{width:'135px',margin:'0 auto'}} variant="filled" severity="error"> 
  Enter Any Todo
</Alert></div>: null}
        </FormControl>
        </form>
    )
}
import {useSelector,useDispatch } from "react-redux";
import { removeTodo,edit } from "./redux";
function List(){

    const dispatch = useDispatch();
    const list = useSelector((state) => {
        console.log(state)
        return state.todo;
    });
  
    console.log(list);

    const handleEdit = (id,msg) => {
         dispatch(edit(id,msg))
};

      const handleRemove = (id) => {
        dispatch(removeTodo(id));
      };


    return(
        <div>
{list.length!==0 ?
    list.map(item=>{
        return <div style={{margin:'20px'}}>
        <p style={{display:'inline'}}>{item.msg}</p>
        <button style={{marginLeft:'20px',padding:'0 10px',height:'20px'}} onClick={()=>handleEdit(item.id,item.msg)}>ClickToEdit</button>
      <button style={{marginLeft:'20px',padding:'0 10px',height:'20px'}} onClick={()=>handleRemove(item.id)}>ClickToRemove</button> 
        </div>
    }) : <h2>NoTODO</h2>
}
        </div>
    )
}

export default List;
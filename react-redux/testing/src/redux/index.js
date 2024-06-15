import {createStore} from 'redux'
import { combineReducers } from 'redux'
const ADD_TODO='ADD_TODO'
const REMOVE_TODO='REMOVE_TODO'
const EDIT_TODO='EDIT_TODO'
const EDIT='EDIT'
const NO_EDIT='NO_EDIT'

export const edit=(id,msg)=>{
    return{
        type :EDIT,
        id,
        msg
    }
}
export const noEdit=()=>{
    return{
        type :NO_EDIT
    }
}

export const addTodo=(value)=>{
    return{
        type:ADD_TODO,
        value
    }
}
export const removeTodo=(id)=>{
    return{
        type:REMOVE_TODO,
        id
    }
}
export const editTodo=(id,msg)=>{
    return{
        type:EDIT_TODO,
        isEdit:true,
        id,
        msg
    }
}

const initialState=[]

const editHandler=(state={isEdit:false,msg:'',id:0},action)=>
{
    switch(action.type){
        case EDIT:
            console.log(action);
            return {...state,isEdit:true,msg:action.msg,id:action.id}
        case NO_EDIT:
            return{isEdit:false,msg:'',id:0}
        default:
             return state;
    }
    

}

const todoReducer=(state=initialState,action)=>{
switch(action.type)
{
    case ADD_TODO:
        console.log('Addtodo');
        return[...state,{
            id:state.length+1,
            msg:action.value,
             completed:false}]
       
      

    case REMOVE_TODO:
        console.log('RemoveData');
        console.log(action.id);
        return state.filter(item=>{
            return item.id!==action.id
        });
        
    

    case EDIT_TODO:
        
        return state.map(item=>{
            console.log('newItem',item);
            if(item.id===action.id)
            return {...item,msg:action.msg}
            else
            return item;
        })
       

        default:
            return state;
}
}

const reducer=combineReducers({
    todo:todoReducer,
    edit:editHandler
})

export const store=createStore(reducer)
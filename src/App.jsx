import { useState,useRef, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"));
    setTodos(todos);
    }
    inputRef.current.focus();
  
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }
  
  

  const handleAdd = ()=>{
      setTodos([...todos,{id : uuidv4(),todo,isCompletd : false}])
      
      setTodo("")
      inputRef.current.focus();
      saveToLS()
     
  } 

 

  const handleEdit = (e,id)=>{
      let t = todos.filter(i=>i.id === id)
      setTodo(t[0].todo)
      let newTodos = todos.filter(item=>{
        return item.id != id;
       });
       setTodos(newTodos);
       saveToLS()
       inputRef.current.focus();
      
  }
  const handleDelete = (e,id)=>{
    let newTodos = [...todos];
   let newUpdateTodo = newTodos.filter(item=>{
    return item.id != id;
   });
   setTodos(newUpdateTodo);
   saveToLS()
   inputRef.current.focus();
   
  }

  const toggleFinisshed = () => {
    setshowFinished(!showFinished);
    inputRef.current.focus();
  }
  


const handleCheckbox = (e) => {
  let id = e.target.name;
  let index = todos.findIndex(item=>{
    return item.id === id;
  });
  let newTodos = [...todos];
  newTodos[index].isCompletd = !newTodos[index].isCompletd;
  setTodos(newTodos);

  saveToLS();

}


  return (
    <>
      <div className="container">
        <nav className="navba text-center"><FaCheck />&nbsp;iTodo</nav>

        <div className="todos">
          {todos.length != 0 && <div className="mt-2 show " style={{display:"flex",gap:10} }><input className="check" type="checkbox" onChange={toggleFinisshed} checked={showFinished} /><p>Show Finished</p></div>  }
          {todos.length === 0 &&  <div className="mt-4 text-center">No Any Taks , please add </div> }
          {todos.map((ele)=>{


    return (showFinished || !ele.isCompletd) && <div key={ele.id} className="todo">
            <input onChange={handleCheckbox} className="check" type="checkbox" value={ele.isCompletd} name={ele.id} />
            <h3 style={ele.isCompletd?{textDecoration:"line-through"}:{}}  
            
            
            >{ele.todo}</h3>
            <button onClick={(e)=>{handleEdit(e,ele.id)}} className="btn btn-primary"><FaEdit /></button>
            <button  onClick={(e)=>{handleDelete(e,ele.id)}} className="btn btn-primary"><MdDeleteForever /></button>
          </div>

          })}
     
        </div>
        <br />
        <div className="addTodo ">
          <div className="addTodoIn">
            <input
              type="text"
              className="inp"
              value={todo}
              onChange={(e)=>setTodo(e.target.value)}
              name=""
              ref={inputRef} 
              id=""
              placeholder="Enter Task"
            />&nbsp;&nbsp;
            <button onClick={handleAdd} disabled={todo.length <=3}  className="btn btn-primary mb-1 addbtn">Add</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

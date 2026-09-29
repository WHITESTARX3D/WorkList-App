import { useState, useEffect } from 'react'
import './App.css'
import Task from "./task.jsx"
import { v4 as uuidv4 } from 'uuid';

function App() {
  
  const [todo, settodo] = useState("")
  const [tasks, settasks] = useState(JSON.parse(localStorage.getItem("tasks")) || [])
  const [fn, setfn] = useState(true)
  
  
  useEffect(()=>{
      localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])
  
  
  const change = (e) => {
      settodo(e.target.value)
  }
  
  const addtask = () => {
if (!(todo === "")) {
  settasks([...tasks, {id : uuidv4(), todo, isdone : false}])
    settodo("")
    
  }   
  }
  const edittask = (id) => {
      let et = tasks.find(i => i.id === id)
      settodo(et.todo)
      deletetask(id)
  }
  
  const deletetask = (id) => {
      settasks(tasks.filter(i => i.id !== id))
      
  }
  const check = (e) => {
    let val = e.target.name
    
    settasks(tasks.map(task =>
  task.id === val
    ? { ...task, isdone: !task.isdone }
    : task
))
  }
  
  const tf = () => {
      setfn(!fn)
      
  }
  
  
  return (
    <>
      <h1 className="bg-red-600 my-10 mx-auto w-65 p-5 text-center text-4xl text-white rounded-full">Add a To-do</h1>
      <div className="relative flex flex-row h-10 w-80 mx-auto justify-center">
      <input onChange={change} value={todo} className="w-55 h-10 border-3 border-red-600" type="text" placeholder="add new"/> <button onClick={addtask} className="bg-red-600 h-10 w-15">Add</button>
      </div>
        <div className="flex justify-between items-center h-10 mx-auto w-35">
           show finished
           <input type="checkbox" checked={fn} onChange={tf}/>
           </div>
         
      <div className="mx-auto w-90  flex flex-col items-center p-2 gap-4">
      {tasks.length === 0 && <p>no tasks left (⁠ ⁠╹⁠▽⁠╹⁠ ⁠)</p>}
      {tasks.map(i => {
          return (fn || !i.isdone) && (
     <div key={i.id} className="border-2 border-red h-20 w-80 flex justify-between items-center p-2 rounded-md">
     <input onChange={check} name={i.id} type="checkbox" checked={i.isdone} value={i.isdone}/>
            <p className={i.isdone?"line-through":""}>{i.todo}</p> 
      <div className="flex flex-col gap-3">
      <button onClick={()=>{edittask(i.id)}} className="bg-green-700 h-6 w-6 rounded-sm text-white font-[200]">↑</button>
      <button onClick={()=>{deletetask(i.id)}} className="bg-red-700 h-6 w-6 rounded-sm text-white font-[1000]">x</button>
      </div>
            
      </div>
      )
      })}

      
       </div>
    </>
  )
}

export default App

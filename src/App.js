import React, {useState, useRef, useEffect} from "react";
import './components/css/style.css'
import TodoList from "./components/TodoList";

const LOCAL_STORAGE_KEY = 'todoApp.todo'

function App() {

  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])  

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    e.preventDefault(); // prevent page refresh

    if (name === '') return
    console.log(name)
    setTodos(
      prevTodos => {
        return[...prevTodos, {id: Math.floor(Math.random() * Date.now()), name: name, complete:false}]
      }
    )
    todoNameRef.current.value = null
  }

  function handleClearTodo(e) {
    e.preventDefault(); // prevent page refresh
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  return (
    <div className="App">
      <h1>Task List</h1>
      <form className="task-form">
        <input className="input-box" ref={todoNameRef} type="text" placeholder="What do you have planned?" />
        <button onClick={handleAddTodo}>Add</button>
        <button onClick={handleClearTodo}>Clear</button>
      </form>
      
      <h2>Tasks: {todos.filter(todo => !todo.complete).length} left</h2>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      
      
   </div>
  );
}

export default App;

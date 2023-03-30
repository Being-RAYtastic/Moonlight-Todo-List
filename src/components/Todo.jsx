import React from 'react'

function Todo({ todo, toggleTodo }) {

  function handleTodoClick() {
    toggleTodo(todo.id)  
  }
  let completed_class = todo.complete ? 'completed' : ''
  
  return (
    <div className='task'>
      <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
      </label>
      <input className={`content ${completed_class}`}  type="text" value={todo.name} readOnly/>
    </div>
  )
}

export default Todo

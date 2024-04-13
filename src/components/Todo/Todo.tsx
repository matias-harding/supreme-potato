import NewTodo from './NewTodo/NewTodo'
import ListTodos from './ListTodos/ListTodos'
import './Todo.css'

const Todo = () => {

  return (
    
    <div className='container'>
      <h1>TODO List</h1>
      <div className="card">
        <NewTodo />
        <br />
        <ListTodos />
      </div>
    </div>
  )
}

export default Todo
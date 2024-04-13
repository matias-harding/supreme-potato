import  { useState, useEffect } from 'react'
import NewTodo from './NewTodo/NewTodo'
import ListTodos from './ListTodos/ListTodos'
import './Todo.css'

interface Todo {
  id: number;
  title: string;
  complete: boolean;
}


const Todo = () => {

  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = async () => {
    const response = await fetch('http://localhost:8000/api/todo/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const data = await response.json();
    console.log(data);
    setTodos(data);
  }
  
  useEffect(() => {
    getTodos();
  }, [])

  return (
    
    <div className='container'>
      <h1>TODO List</h1>
      <div className="card">
        <NewTodo getTodos={getTodos} />
        <br />
        <ListTodos todos={todos} getTodos={getTodos} />
      </div>
    </div>
  )
}

export default Todo
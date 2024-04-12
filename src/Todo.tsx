import { useState } from 'react'
import React from 'react'
import './Todo.css'

function Todo() {

  // get json list from api
  // useState with type object
  const [todos, setTodos] = useState<object[]>([]);

  const getTodos = async () => {
    const response = await fetch('http://localhost:8000/api/todos', {
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

  const onComplete = async (todoId: number) => {
    await fetch(`http://localhost:8000/api/update/${todoId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then(() => getTodos());

    // Handle any errors or re-fetch the todo list to sync with the backend
  };

  const onDelete = async (todoId: number) => {
    await fetch(`http://localhost:8000/api/delete/${todoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then((res: any) => {
      
      console.log(res);
      getTodos()
    });
  }


  // call api on mount
  React.useEffect(() => {
    getTodos();
  }, [])

  return (
    
    <div className='container'>
      <h1>TODO List</h1>
      <div className="card">

        <table style={{width: '60%'}} className="table-fixed mx-auto">
          <tbody>
          
          {(todos.length > 0) ? todos.map((todo: any) => (
              <tr key={todo.id} className='hover:bg-gray-100'>
                <td className='w-5/12 text-left pl-2'><b>{todo.title}</b></td>
                <td className='w-3/12 text-right'>
                  <span className={`rounded-full ${todo.complete ? 'bg-green-200' : 'bg-gray-200'} uppercase px-2 py-1 text-xs font-bold mr-3` }>
                        {todo.complete ? 'Completed' : 'Not Completed'}</span></td>
                <td className='w-2/12 text-right'>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                          onClick={() => onComplete(todo.id)}> Update</button></td>
                <td className='w-2/12 text-right'>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => onDelete(todo.id)}> Delete</button></td>
              </tr>
            ))
          : <tr><td colSpan={4} className='text-center'>Sin pendientes por revisar!</td></tr>
          }

          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Todo
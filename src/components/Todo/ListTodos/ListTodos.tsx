import { useEffect } from "react";

interface Todo {
  id: number;
  title: string;
  complete: boolean;
}

/**
 * Renders a list of todos with options to update and delete each todo.
 *
 * @param {Object} props - Object containing todos array and getTodos function.
 * @return {JSX.Element} The JSX element representing the list of todos.
 */
const ListTodos = (props: { todos: Todo[], getTodos: () => void }) => {

  const onComplete = async (todoId: number) => {
    await fetch(`http://localhost:8000/api/update/${todoId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then(() => props.getTodos());
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
    .then(() => {
      props.getTodos()
    });
  }

  useEffect(() => {
    props.getTodos();
  }, [])

  return (
    <div className='flex flex-row justify-center'>
      <table style={{width: '60%'}} className="table-fixed mx-auto">
        <tbody>
        {(props.todos.length > 0) ? props.todos.map((todo: Todo) => (
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
  )
}

export default ListTodos
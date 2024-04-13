import { useState } from "react";

const NewTodo = (props: { getTodos: () => void }) => {

  const [newTodo, setNewTodo] = useState("");

  const addTodo = async () => {
    
    const response = await fetch('http://localhost:8000/api/todo/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ title: newTodo }),
    });
    const data = await response.json();
    console.log(data);
    setNewTodo("");
    props.getTodos();
  }

  return (
    <div className="flex justify-center">
      <input className="w-1/3 border border-gray-300 rounded py-2 px-4" 
        placeholder="Ingresa tu tarea" onChange={(e) => setNewTodo(e.target.value)} value={newTodo} type="text" />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
        onClick={addTodo}>Add Todo</button>
    </div>
  )
}

export default NewTodo
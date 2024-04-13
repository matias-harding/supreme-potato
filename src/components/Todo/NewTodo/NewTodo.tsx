import { useState } from "react";

const NewTodo = () => {

  const [todo, setTodo] = useState("");

  return (
    <div className="flex justify-center">
      <input className="w-1/3 border border-gray-300 rounded py-2 px-4" onChange={(e) => setTodo(e.target.value)} value={todo} placeholder="Ingresa tu tarea" type="text" />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded">Add Todo</button>
    </div>
  )
}

export default NewTodo
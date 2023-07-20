'use client'
import axios from "axios"
import {useEffect, useState} from "react";

export default function Home() {
  const [todos , setTodos] = useState([])
  const [title , setTitle]  = useState('')
  const [description , setDescription] =useState('')
  useEffect(() => {
      const init = async() => {
          const rawTodos = await axios.get("http://localhost:8080/api/v1/todos")
          setTodos(rawTodos.data.data)
          console.log(rawTodos.data.data)
      }
      init()
  }, [])
  const handleAddition = async() => {
      const newTitPrompt = prompt("Enter the updated Title ")
      const newDesPrompt = prompt("Enter the updated Description")
        const obj = {
            title : newTitPrompt,
            description : newDesPrompt
        }
        setTodos(prev => {
            return [...prev , obj]
        })
      const success = await axios.post("http://localhost:8080/api/v1/todos/" , obj)
  }
  const handleUpdate = async(id) => {
      const titPrompt = prompt("Enter the updated Title ")
      const desPrompt = prompt("Enter the updated Description")
      const updatedData = { title: titPrompt, description: desPrompt };
      setTodos((prev) => {
          return prev.map((todo) => {
              if(todo._id === id){
                  Object.assign(todo, updatedData)
              }
              return todo
          })
      })
      await axios.patch(`http://localhost:8080/api/v1/todos/${id}` , updatedData)
  }

  const handleDelete  = async(id) => {
      console.log(id)
      setTodos((prev) => {
          return prev.filter((todo) => todo._id !== id)
      })
      await axios.delete(`http://localhost:8080/api/v1/todos/${id}`)
  }

  return (
    <div>
        <div className={"flex justify-around p-4"}>
            <div className={"text-6xl w-6/12"}>
                Todos
            </div>
            <div className={"text-2xl border-4 p-2 rounded-xl bg-blue-600"}>
                <button onClick={handleAddition}>
                    New
                </button>
            </div>
        </div>

        <div className={"w-11/12"}>
            {
                todos &&
                    todos.map((todo) => {
                        return(
                            <div className={"flex justify-around "}>
                            <div className={"flex justify-around border-4 p-4 m-8 w-9/12 ml-16 bg-gray-500"} key={todo._id}>
                                <div>
                                    <div>
                                        {todo.title}
                                    </div>
                                    <div>
                                        {todo.description}
                                    </div>
                                </div>
                            </div>
                                <div >
                                    <div className={"flex justify-end p-2 "}>
                                        <div className={"p-3 w-3/4 border-4 mt-8 mr-2 bg-amber-300 text-black rounded-xl"}>
                                            <button onClick={() => {
                                                handleUpdate(todo._id)
                                            }}>Update</button>
                                        </div>
                                        <div className={"p-3 w-2/4 border-4 mt-8 bg-red-600 text-white rounded-xl"}>
                                            <button onClick={() => {
                                                handleDelete(todo._id)
                                            }}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
            }
        </div>
    </div>
  )
}

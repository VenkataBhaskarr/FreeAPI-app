import axios from "axios"
import {NextResponse} from "next/server";
export const GET = async(req,{params}) => {
   const {id} = params
   const rawTodo = await axios.get(`http://localhost:8080/api/v1/todos/${id}`)
   const todo = rawTodo.data.data
   return NextResponse.json(todo)
}

export const DELETE = async(req,{params}) => {
    const {id} = params
    await axios.delete(`http://localhost:8080/api/v1/todos/${id}`)
    return NextResponse.json("success fully deleted")
}

export const PATCH = async(req,{params}) => {
    const {id} = params
    const {title, description} = await req.json()
    const updatedData = { title: title, description: description };
    await axios.patch(`http://localhost:8080/api/v1/todos/${id}` , updatedData)
    return NextResponse.json("successfully updated")
}
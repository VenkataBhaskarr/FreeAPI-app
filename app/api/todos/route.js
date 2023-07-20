// get all todos
// get todos by id
// delete todos by id
// patch todos by id
// post todos
// patch todos status by id
import {NextResponse} from "next/server";
import axios from "axios"
export const GET = async(req,res) => {
    const rawTodos = await axios.get("http://localhost:8080/api/v1/todos")
    const todos = rawTodos.data.data
    return NextResponse.json(todos)
}
export const POST = async(req,res) => {
    const {title ,description} = await req.json()
    const success = await axios.post("http://localhost:8080/api/v1/todos/" , {
        description : description,
        title : title,
    })
    console.log(success)
    return NextResponse.json("success")
}
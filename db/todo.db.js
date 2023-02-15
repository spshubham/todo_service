const Todo = require("../models/todo.model");
const Response = require("../utils/response");


/**
 * 
 * @param {*} body 
 * @param {*} user_id 
 * @returns Todo added message
 */
exports.todoAdd = async(body, user_id) =>{
    try {
        body.user_id=user_id;
        let todo = new Todo(body);
        const res = await todo.save(body)
        return res;
    } catch (error) {
        if(error.code == 11000)
            throw Response.UserAlreayExist;
        else throw Response.UnexpectedError;
    }
}

/**
 * 
 * @param {*} body 
 * @param {*} user_id 
 * @param {*} url_id 
 * @returns update the Todo
 */
exports.updateTodo = async(body, user_id, todo_id) =>{
    try {
        let query={
            todo_name: body.todo_name,
            todo_lists: body.todo_lists,
            is_completed: body.is_completed
        }  
        Object.keys(query).forEach((key)=>typeof query[key] === "undefined" && delete query[key])
         
        let res = await Todo.findOneAndUpdate({_id:todo_id,user_id:user_id},query)
        return res;
    } catch (error) {
        if(error.code == 11000)
            throw Response.UserAlreayExist;
        else throw Response.UnexpectedError;
    }
}

/**
 * 
 * @param {*} user_id 
 * @returns  list of Todos
 */
exports.listTodo = async(limit, offset,todo_id) =>{
    try {
        let query ={
            _id: todo_id
        }
        Object.keys(query).forEach((key)=>typeof query[key] === "undefined" && delete query[key])

        let res = await Todo.find(query).limit(limit).skip(offset)
        return res
    } catch (error) {
        if(error.code == 11000)
            throw Response.UserAlreayExist;
        else throw Response.UnexpectedError;
    }
}


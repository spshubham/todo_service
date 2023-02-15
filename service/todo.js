"use strict";
var Response = require("../utils/response");
const validate = require("../utils/validation")

const TodoDb = require("../db/todo.db");
const jwt = require('jsonwebtoken');
const conf = require("../conf/conf")


/**
 * 
 * @param {*} body 
 * @param {*} user_id 
 * @returns add the todo in db
 */
exports.todoAdd = async function (body, user_id) {
  try {
    if (user_id && !validate.isValidMongooseObjectId(user_id))
      return Response.InvalidUserId
      
    if (body) {
      if (!body.todo_name || !body.todo_lists || body.todo_lists.length==0) {
        throw Response.InvalidReqBody;
      }
    }
    const todo = await TodoDb.todoAdd(body, user_id);
    return todo
  } catch (error) {

    if (error.code) throw error
    else throw Response.UnexpectedError;
  }
};


/**
 * 
 * @param {*} body 
 * @param {*} user_id 
 * @param {*} url_id 
 * @returns update the given todo
 */
exports.updateTodo = async function (body, user_id, todo_id) {
  try {
    if (user_id && !validate.isValidMongooseObjectId(user_id))
    return Response.InvalidUserId
    if (todo_id && !validate.isValidMongooseObjectId(todo_id))
    return Response.InvalidTodo_id
    if(!body || (body.todo_lists && body.todo_lists.length == 0) || 
    (body.todo_name && typeof body.todo_name != "string"))
    {
      return Response.InvalidReqBody
    }
    
    const todo = await TodoDb.updateTodo(body, user_id, todo_id);
    if (todo)
      return Response.TodoUpdated;
    else return Response.RecordNotFound
  } catch (error) {

    if (error.code) throw error
    else throw Response.UnexpectedError;
  }
};


/**
 * 
 * @param {*} user_id 
 * @returns list the todo
 */
exports.listTodo = async function (user_id,limit, offset, todo_id) {
  try {
    if (user_id && !validate.isValidMongooseObjectId(user_id))
      return Response.InvalidUserId
    if (todo_id && !validate.isValidMongooseObjectId(todo_id))
      return Response.InvalidTodo_id  
    const list = await TodoDb.listTodo(limit, offset,todo_id);
    if (list)
      return list;
    else return Response.RecordNotFound

  } catch (error) {

    if (error.code) throw error
    else throw Response.UnexpectedError;
  }
};

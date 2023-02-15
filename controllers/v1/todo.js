"use strict";

var utils = require("../../utils/writer.js");
var Todo = require("../../service/todo");
const Resp = require("../../utils/response")
module.exports.todoAdd = function todoAdd (req, res, next, body) {
  Todo.todoAdd(body,req.user.user_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateTodo = function updateTodo (req, res, next, body) {
  if((req.user.role == "Admin")||(req.query["user_id"] && req.user.role == "Admin") || (req.user.user_id && req.user.role == "User"))
  {
    let user_id =  req.query["user_id"] || req.user.user_id
    Todo.updateTodo(body,user_id,req.query["todo_id"])
  .then(function (response) {
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
  }
  else
    utils.writeJson(res,Resp.InvalidAccess)
};

module.exports.listTodo = function listTodo (req, res, next, body) {
  if((req.user.role == "Admin")||(req.query["user_id"] && req.user.role == "Admin") || (req.user.user_id && req.user.role == "User"))
  {
    let user_id =  req.query["user_id"] || req.user.user_id
    Todo.listTodo(user_id,req.query["limit"],req.query["offset"],req.query["todo_id"])
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
  }
  else
    utils.writeJson(res,Resp.InvalidAccess)
};


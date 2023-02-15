"use strict";
var Response = require("../utils/response");
const validate = require("../utils/validation")

const PostDb = require("../db/post.db");
const jwt = require('jsonwebtoken');
const conf = require("../conf/conf")


/**
 * 
 * @param {*} body 
 * @param {*} user_id 
 * @returns add the post in db
 */
exports.postAdd = async function (body, user_id) {
  try {
    
    const todo = await PostDb.postAdd(body, user_id);
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
 * @param {*} limit 
 * @param {*} offset 
 * @returns list post
 */
exports.listPost = async function (user_id, limit,offset,post_id) {
    try {
      if (user_id && !validate.isValidMongooseObjectId(user_id))
      return Response.InvalidUserId
      if (post_id && !validate.isValidMongooseObjectId(post_id))
      return Response.InvalidPostId
      const todo = await PostDb.listPost(user_id,limit,offset,post_id);
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
 * @param {*} post_id 
 * @returns post comments
 */
  exports.postComments = async function (body, user_id,post_id) {
    try {
      if (user_id && !validate.isValidMongooseObjectId(user_id))
        return Response.InvalidUserId
        if (post_id && !validate.isValidMongooseObjectId(post_id))
        return Response.InvalidPostId  
      const todo = await PostDb.postComments(body, user_id, post_id);
      return todo
    } catch (error) {
  
      if (error.code) throw error
      else throw Response.UnexpectedError;
    }
  };
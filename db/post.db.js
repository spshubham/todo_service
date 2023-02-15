const Post = require("../models/post.model");
const Response = require("../utils/response");
const bcrypt = require("bcrypt")
const ObjectId = require("mongoose").Types.ObjectId

/**
 * 
 * @param {*} body 
 * @param {*} user_id 
 * @returns Add post
 */
exports.postAdd = async(body, user_id) =>{
    try {
        body.user_id=user_id;
        let post = new Post(body);
        const res = await post.save(body)
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
 * @param {*} limit 
 * @param {*} offset 
 * @returns list post
 */
exports.listPost = async(user_id,limit, offset,post_id) =>{
    try {
        let query ={
            _id: post_id
        }
        Object.keys(query).forEach((key)=>typeof query[key] === "undefined" && delete query[key])

        let res = await Post.find(query).limit(limit).skip(offset)
        return res
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
 * @param {*} post_id 
 * @returns post comments
 */
exports.postComments = async(body, user_id, post_id) =>{
    try {
        let query={
            comments: body.comments
        }  
        Object.keys(query).forEach((key)=>typeof query[key] === "undefined" && delete query[key])
         
        let res = await Post.findOneAndUpdate({_id:post_id,user_id:user_id},query)
        if(res)
            return res;
        else    
            return Response.RecordNotFound    
    } catch (error) {
        if(error.code == 11000)
            throw Response.UserAlreayExist;
        else throw Response.UnexpectedError;
    }
}

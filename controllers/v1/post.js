var utils = require("../../utils/writer.js");
var Post = require("../../service/post");
const Resp = require("../../utils/response")

module.exports.postAdd = function postAdd (req, res, next, body) {
  if((req.query["user_id"] && req.user.role == "Admin") || (req.user.user_id && req.user.role == "User"))
  {
    let user_id =  req.query["user_id"] || req.user.user_id
    Post.postAdd(body,user_id)
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


module.exports.listPost = function listPost (req, res, next, body) {
  if((req.user.role == "Admin")||(req.query["user_id"] && req.user.role == "Admin") || (req.user.user_id && req.user.role == "User"))
  {
    let user_id =  req.query["user_id"] || req.user.user_id
    Post.listPost(user_id,req.query["limit"],req.query["offset"],req.query["post_id"])
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

module.exports.postComments = function postComments (req, res, next, body) {
  if((req.user.role == "Admin")||(req.query["user_id"] && req.user.role == "Admin") || (req.user.user_id && req.user.role == "User"))
  {
    let user_id =  req.query["user_id"] || req.user.user_id
    Post.postComments(body,user_id,req.query["post_id"])
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

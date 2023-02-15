var express = require("express");
var router = express.Router();
const userController = require("../../controllers/v1/user");
const urlController = require("../../controllers/v1/todo")
const todoController = require("../../controllers/v1/todo")
const postController = require("../../controllers/v1/post")
const auth = require("../../middleware/auth");

/* User API routes */
router.post("/user/signup", function(req, res, next){
  userController.signUp(req, res, next, req.body);
});
router.get("/user/login", function(req, res, next){
  userController.getDetails(req, res, next, req.query["email"], req.query["password"]);
});


/*Todo API routes */
router.post("/todo/add", auth, (req, res,next) => {
  todoController.todoAdd(req, res, next,req.body)
});


router.put("/todo/update", auth, (req, res,next) => {
  todoController.updateTodo(req, res, next,req.body)
});

router.get("/todo/list", auth, (req, res,next) => {
  todoController.listTodo(req, res, next)
});


/* POST API routes */
router.post("/post/add", auth, (req, res,next) => {
  postController.postAdd(req, res, next,req.body)
});

router.get("/post/list", auth, (req, res,next) => {
  postController.listPost(req, res, next)
});

router.post("/post/comments", auth, (req, res,next) => {
  postController.postComments(req, res, next,req.body)
});

module.exports = router;

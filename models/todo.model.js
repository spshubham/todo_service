var mongoose = require("mongoose");
var todo = mongoose.Schema({
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  todo_name: {
   type: String,
    required: true
  },
  todo_lists: {
    type: [String]
  },
  is_completed: {
    type: Boolean,
     required: true,
     default: false
   },
 

}, { timestamps: true });

module.exports = mongoose.model("Todo", todo);
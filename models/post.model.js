var mongoose = require("mongoose");
var post = mongoose.Schema({
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  post_name: {
   type: String,
    required: true
  },
  post: {
    type: String,
     required: true
   },
  comments: {
    type: String,
     required: false
   }
 

}, { timestamps: true });

module.exports = mongoose.model("Post", post);
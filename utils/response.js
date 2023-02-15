let response = require("./writer").respondWithCode;


exports.UnexpectedError = response(500, {
    message: "Internal server error"
});
exports.UserAlreayExist = response(400, {
    message: "User already exist"
});

exports.InvalidEmail = response(400, {
    message: "Invalid Email id"
});
exports.InvalidUserName = response(400, {
    message: "Invalid name"
});
exports.InvalidRole = response(400, {
  message: "Invalid Role"
});
exports.InvalidCity = response(400, {
  message: "Invalid city"
});
exports.InvalidAge = response(400, {
  message: "Invalid age"
});
exports.InvalidAccess = response(403, {
  message: "Invalid access"
});
exports.InvalidUserAndMail = response(400, {
    message: "Incorrect Email id or Password"
});

exports.InvalidPassword = response(400, {
    message : "Password should be string and lenght should be greater than 7"
});

exports.InvalidReqBody = response(400, {
    message : "Invalid Request body"
});




exports.TodoUpdated = response(200, {
    message: "Successfully updated"
  });

exports.RecordNotFound = response(404, {
    message: "Record Not Found"
  });  

  exports.URLDeleted = response(200, {
    message: "Successfully Deleted"
  });
  

  exports.InvalidUserId = response(400, {
    message: "Invalid User Id"
  });

  exports.InvalidTodo_id = response(400, {
    message: "Invalid Todo Id"
  });

  exports.InvalidPostId = response(400, {
    message: "Invalid Post Id"
  });
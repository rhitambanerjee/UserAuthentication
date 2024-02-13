const mongoose = require("mongoose");


//creating a schema for the users token
const UserTokenSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 86400, //30 days
  },
});

const UserToken = mongoose.model("UserToken", UserTokenSchema);

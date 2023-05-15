import mongosse from "mongoose";

const userSchema = new mongosse.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  favouriteList: { type: Array, required: false },
});                

const User = mongosse.models.User || mongosse.model("User", userSchema);

export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _Id: { type: String, required: true,  },
  Name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  cartItems:{ type: Object, default: {}},
  address: { type: Object, default: {}}
}, {minimize: false});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
export { User };
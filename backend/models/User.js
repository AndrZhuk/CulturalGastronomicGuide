import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthYear: { type: Number, required: true },
  gender: { type: String, required: true },
  savedEstablishments: [{ type: String }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;


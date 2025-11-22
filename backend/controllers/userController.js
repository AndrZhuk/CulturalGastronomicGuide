import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, birthYear, gender } = req.body;

    // We can search by 'id' string field or '_id'. Original code used findById which uses _id, 
    // but passed 'id' from params. 
    // If 'id' in params is the string 'id' field, we should use findOneAndUpdate({id: id}...)
    // If it's the mongo _id, findByIdAndUpdate is correct.
    // The frontend sends user.id (which might be the string field).
    // Let's try to support both or assume the string id field is what's used in URLs.
    
    const user = await User.findOneAndUpdate(
      { $or: [{ _id: id }, { id: id }] }, // Try to match either
      { $set: { name, birthYear, gender } },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User updated successfully.", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const saveEstablishment = async (req, res) => {
  try {
    const { email } = req.params;
    const { establishmentId } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.savedEstablishments.includes(establishmentId)) {
      user.savedEstablishments.push(establishmentId);
      await user.save();
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ message: "Establishment saved.", user: userResponse });
  } catch (error) {
    console.error("Error saving establishment:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const removeEstablishment = async (req, res) => {
  try {
    const { email } = req.params;
    const { establishmentId } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.savedEstablishments = user.savedEstablishments.filter(
      (id) => id !== establishmentId
    );
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ message: "Establishment removed.", user: userResponse });
  } catch (error) {
    console.error("Error removing establishment:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


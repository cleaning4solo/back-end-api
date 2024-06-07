const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');
const { generateToken } = require('../middleware/authenticateToken');

async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find({});
    res.status(200).send({ message: 'User berhasil ditemukan', data: users });
  } catch (error) {
    res.status(500).send({ message: 'Gagal mendapatkan user', error: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User tidak ditemukan' });
    }
    res.send({ message: 'User berhasil ditemukan', data: user });
  } catch (error) {
    res.status(500).send({ message: 'Gagal mendapatkan user', error: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send({ message: 'User tidak ditemukan' });
    }
    res.send({ message: 'User berhasil diperbarui', data: user });
  } catch (error) {
    res.status(400).send({ message: 'Gagal memperbarui user', error: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User tidak ditemukan' });
    }
    res.status(204).send({ message: 'User berhasil dihapus' });
  } catch (error) {
    res.status(500).send({ message: 'Gagal menghapus user', error: error.message });
  }
}

async function signup(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const newUser = new UserModel({ ...req.body, password: hashedPassword });
    await newUser.save();
    const token = generateToken(newUser._id);
    res.status(201).send({ message: 'Pendaftaran berhasil', data: newUser, token });
  } catch (error) {
    res.status(400).send({ message: 'Gagal mendaftar', error: error.message });
  }
}

async function login(req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: 'Email tidak terdaftar' });
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Password salah' });
    }
    const token = generateToken(user._id);
    res.send({ message: 'Login berhasil', data: user, token });
  } catch (error) {
    res.status(500).send({ message: 'Gagal login', error: error.message });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  signup,
  login,
};

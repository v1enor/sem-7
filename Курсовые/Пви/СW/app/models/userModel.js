const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

require('dotenv').config(); 

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);


const userSchema = new mongoose.Schema({
 
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  companies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  }],
  status: {
    type: String,
    default: 'active'  
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  admin: {
    type: Boolean,
    default: false
  }
});

// Прежде чем сохранить пользователя, хешируем пароль
userSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  }

  next();
});



const User = mongoose.model('User', userSchema);

module.exports = User;

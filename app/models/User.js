import mongoose from 'mongoose';
const { Schema } = mongoose;

import uniqueValidator from 'mongoose-unique-validator';
import bcryptjs from 'bcryptjs';
const { hashSync,compareSync } = bcryptjs;
import jwt from 'jsonwebtoken';
import config from './../../config/env/index.js';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required!'],
      trim: true,
      validate: {
        validator(email) {
          const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
          return emailRegex.test(email);
        },
        message: '{VALUE} is not a valid email!',
      },
    },
    name: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      trim: true,
      minlength: [6, 'Password need to be longer!'],
      validate: {
        validator(password) {
          return password.length >= 6 && password.match(/\d+/g);
        },
      },
    },
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});
UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
      this.password = this._hashPassword(this.password);
      return next();
    }
    return next();
  });
UserSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      username: this.username,
    };
  },
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id,
      },
      config.JWT_SECRET,
    );
  },
  toAuthJSON() {
    return {
      token: this.createToken(),
    };
  },
};

let User;

try {
  User = mongoose.model('User');
} catch (e) {
  User = mongoose.model('User', UserSchema);
}

export default User;

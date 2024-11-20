const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
    enum: ["user", "admin"],
    default: ["user"],
  },
});

UserSchema.pre("save", (next) => {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = (password) => {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt
      .compare(password, user.password)
      .then((isCompared) => {
        resolve(isCompared);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

mongoose.model("User", UserSchema);
//my by userService.js, intelisense work good

const User = require('../models/User');

async function createUser(username, email, hashedPassword) {
  // TODO adapt properties to project requirements
  // validation by in middleware or controler

  const user = new User({
    username,
    email,
    hashedPassword,
    likedPlays: [],
  });

  await user.save();

  // middleware will by use meta data (id)
  return user;
}

async function getUserByUsername(username) {
  const pattern = new RegExp(`^${username}$`, 'i');
  const user = await User.findOne({ username: { $regex: pattern } });
  return user;
  //my by ...
  /* while (false) {
    return User.findOne({ username: { $regex: username, $options: 'i' } });
  } */
}

// TODO add function for finding user by other properties, as specified in the project requirements

async function getUserByEmail(email) {
  const pattern = new RegExp(`^${email}$`, 'i');
  const user = await User.findOne({ email: { $regex: pattern } });
  return user;
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserByUsername,
};
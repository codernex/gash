// Create Token and saving in cookie

const sendToken = async(user, statusCode, res) => {
  const token = await user.generateToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: true
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token
  });
};

module.exports = sendToken;

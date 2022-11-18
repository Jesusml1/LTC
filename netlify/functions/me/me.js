const jwt = require("jsonwebtoken");

exports.handler = async function (event, context) {
  try {
    const { token } = JSON.parse(event.body);
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        user: { username: decoded.username, email: decoded.email },
      }),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        success: false,
        message: "bad token",
      }),
    };
  }
};

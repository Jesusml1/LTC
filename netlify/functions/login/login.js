require('module-alias/register');
const supabase = require("@db/supabase");
const userLoginSchema = require("@schemas/userLoginSchema");
const bcrypt = require("bcryptjs");

exports.handler = async function (event, context) {
  try {
    const user = JSON.parse(event.body);
    const validatedUser = await userLoginSchema.validate(user);
    if (validatedUser) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("email", validatedUser.email);
      const result = data[0];
      const passwordValid = bcrypt.compareSync(
        validatedUser.password,
        result.password
      );
      if (!passwordValid) {
        return {
          statusCode: 401,
          body: JSON.stringify({
            success: false,
            message: "Something wrong with email/password",
          }),
        };
      }
      if (data.length > 0) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            success: true,
            message: "User authenticated",
          }),
        };
      }
    }
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        success: false,
        message: "User don't exist in our database",
      }),
    };
  }
};

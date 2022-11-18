const supabase = require("../../../db/supabase");
const userRegisterSchema = require("../../../schemas/userRegisterSchema");
const bcrypt = require("bcryptjs");

exports.handler = async function (event, context) {
  try {
    const newUser = JSON.parse(event.body);
    const validatedUser = await userRegisterSchema.validate(newUser);
    if (validatedUser) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(validatedUser.password, salt);
      const user = { ...validatedUser, password: hash };
      const { data, error } = await supabase.from("users").insert([user]);

      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify(error),
        };
      }
      return {
        statusCode: 201,
        body: JSON.stringify({
          success: true,
          message: "User created successfuly",
        }),
      };
    } else {
      throw "User could not be registered";
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.errors),
    };
  }
};

const yup = require("yup");

const userRegisterSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  phone_number: yup.string(),
});

module.exports = userRegisterSchema;

const yup = require("yup");

const userLoginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

module.exports = userLoginSchema;

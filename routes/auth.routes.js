const { signup, signin } = require("../controllers/auth.controller");

module.exports = function (app) {
  app.post("/ecomm/api/v1/auth/signup", signup);

  app.post("/ecomm/api/v1/auth/signin", signin);
};

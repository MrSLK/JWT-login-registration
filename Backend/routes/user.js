const controller = require("../controllers/user");
const auth = require("../middleware");

module.exports = function(app) {

  app.post("/user/register", auth.auth.checkDuplicateEmail, controller.registration);
  app.post("/user/login", auth.auth.validateUsers, controller.login);
  app.get("/user/get-all", auth.auth.verifyToken, auth.auth.validateUsers, controller.getAll);
  app.post("/user/update-profile", auth.auth.verifyToken, auth.auth.validateUsers, controller.updateProfile);
  };
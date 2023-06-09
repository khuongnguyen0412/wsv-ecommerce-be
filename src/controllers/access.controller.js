const { CREATED, SuccessResponse } = require("../core/success.reponse");
const AccessService = require("../services/access.service");
const KeyTokenService = require("../services/keyToken.service");

class AccessController {
  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessService.login(req.body),
    }).send(res);
  };

  signup = async (req, res, next) => {
    new CREATED({
      message: "Registered OK!",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };

  logout = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout success",
      metadata: await AccessService.logout(req.keyStore),
    }).send(res);
  };

  handlerRefreshToken = async (req, res, next) => {
    // new SuccessResponse({
    //   message: "Get token success",
    //   metadata: await AccessService.handlerRefershToken(req.body.refreshToken),
    // }).send(res);

    new SuccessResponse({
      message: "Get token success",
      metadata: await AccessService.handlerRefershTokenV2({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res);
  };
}

module.exports = new AccessController();

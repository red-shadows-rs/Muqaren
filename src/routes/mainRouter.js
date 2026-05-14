const { Router } = require("express");
const mainRouter = Router();

const { mainPage } = require("../controllers/mainController");

mainRouter.get("/", mainPage);

module.exports = mainRouter;

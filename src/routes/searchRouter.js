const { Router } = require("express");
const searchRouter = Router();

const { searchPage } = require("../controllers/searchController");

searchRouter.get("/", searchPage);

module.exports = searchRouter;

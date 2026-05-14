const mainPage = (req, res) => {
  res.render("mainPage", {
    title: "مقارن | الرئيسية",
    status: 200,
  });
};

module.exports = {
  mainPage,
};

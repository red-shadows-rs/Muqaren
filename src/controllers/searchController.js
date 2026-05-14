const { bookingSearch } = require("../services/bookingService");

const searchPage = async (req, res) => {
  const { destination, checkIn, checkOut, rooms, adults, children } = req.query;

  try {
    const bookingData = await bookingSearch(
      destination,
      checkIn,
      checkOut,
      rooms,
      adults,
      children
    );

    const searchData = {
      destination,
      checkIn,
      checkOut,
      rooms,
      adults,
      children,
    };

    if (!bookingData || !bookingData.success) {
      return res.status(500).render("errorPage", {
        title: "مقارن | خطأ 500",
        status: 500,
        message: "خطأ داخلي في الخادم",
      });
    }

    res.render("searchPage", {
      title: `مقارن | البحث`,
      status: 200,
      message: "نتائج البحث",
      bookingData: bookingData.data,
      searchData: searchData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("errorPage", {
      title: "مقارن | خطأ 500",
      status: 500,
      message: "حدث خطأ داخلي في الخادم",
    });
  }
};

module.exports = {
  searchPage,
};

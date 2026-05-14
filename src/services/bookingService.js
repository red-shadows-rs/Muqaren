const axios = require("axios");
const cheerio = require("cheerio");

const bookingSearch = async (
  destination,
  checkIn,
  checkOut,
  rooms,
  adults,
  children
) => {
  if (!destination || !checkIn || !checkOut || !rooms || !adults || !children) {
    return {
      success: false,
      status: 400,
      message: "Missing required parameters",
    };
  }

  try {
    const response = await axios.get(
      `https://www.booking.com/searchresults.html?ss=${destination}&lang=ar&selected_currency=AED&checkin=${checkIn}&checkout=${checkOut}&no_rooms=${rooms}&group_adults=${adults}&group_children=${children}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
          "Accept-Language": "ar,en-US;q=0.9,en;q=0.8",
        },
      }
    );
    const $ = cheerio.load(response.data);
    const results = [];

    $('div[data-testid="property-card"]').each((index, element) => {
      const title = $(element).find('div[data-testid="title"]').text().trim();

      let imageUrl = $(element).find("img").attr("src");
      if (!imageUrl || imageUrl.includes("placeholder")) {
        imageUrl =
          $(element).find("img").attr("data-src") ||
          $(element).find("img").attr("data-lazy-src");
      }
      let price = $(element)
        .find('span[data-testid="price-and-discounted-price"]')
        .text()
        .trim();

      if (!price) {
        price =
          $(element)
            .find('[data-testid="price-and-discounted-price"] span')
            .first()
            .text()
            .trim() ||
          $(element).find(".b87c397a13.f2f358d1de.ab607752a2").text().trim() ||
          $(element).find(".prco-valign-middle-helper").text().trim() ||
          $(element).find(".bui-price-display__value").text().trim();
      }
      if (price) {
        price = price.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
      }
      let taxes = $(element)
        .find('[data-testid="taxes-and-charges"]')
        .text()
        .trim();

      if (!taxes) {
        taxes =
          $(element)
            .find('.fff1944c52.fb14de7f14:contains("ضرائب")')
            .text()
            .trim() ||
          $(element)
            .find('.fff1944c52.fb14de7f14:contains("AED")')
            .last()
            .text()
            .trim() ||
          $(element).find(".prc-includes").text().trim() ||
          $(element).find(".sr-card__price-includes").text().trim();
      }

      if (taxes) {
        taxes = taxes.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
      }

      let link = $(element).find('a[data-testid="title-link"]').attr("href");
      if (!link) {
        link = $(element).find("a").first().attr("href");
      }

      let description = "";
      const roomDescription = $(element)
        .find(".dc7b6a60a4 h4.fff1944c52")
        .text()
        .trim();
      const bedInfo = $(element)
        .find(".dc7b6a60a4 .d1e8dce286 .fff1944c52")
        .text()
        .trim();

      const location = $(element).find('[data-testid="address"]').text().trim();
      const distance = $(element)
        .find('[data-testid="distance"]')
        .text()
        .trim();

      if (roomDescription) {
        description = roomDescription;
        if (bedInfo) {
          description += ` • ${bedInfo}`;
        }
        if (location) {
          description += ` • ${location}`;
        }
        if (distance) {
          description += ` • ${distance}`;
        }
      } else {
        const fallbackDescription = $(element)
          .find(".fff1944c52")
          .last()
          .text()
          .trim();
        if (fallbackDescription) {
          description = fallbackDescription;
          if (location) {
            description += ` • ${location}`;
          }
          if (distance) {
            description += ` • ${distance}`;
          }
        }
      }

      if (description) {
        description = description
          .replace(/&nbsp;/g, " ")
          .replace(/\u00A0/g, " ")
          .replace(/\s+/g, " ")
          .replace(/\s*•\s*/g, " • ")
          .trim();
      }
      if (title) {
        let cleanPrice = price;
        let cleanTaxes = taxes;

        if (cleanPrice) {
          cleanPrice = cleanPrice
            .replace(/&nbsp;/g, " ")
            .replace(/\u00A0/g, " ")
            .replace(/\s+/g, " ")
            .trim();
        }

        if (cleanTaxes) {
          cleanTaxes = cleanTaxes
            .replace(/&nbsp;/g, " ")
            .replace(/\u00A0/g, " ")
            .replace(/\s+/g, " ")
            .trim();
        }

        results.push({
          title,
          imageUrl: imageUrl || null,
          price: cleanPrice || "غير متاح",
          tax: cleanTaxes || "0",
          link: link || null,
          description: description || "لا يوجد وصف متاح",
        });
      }
    });

    return {
      success: true,
      status: 200,
      message: "Booking data fetched successfully",
      data: results,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      status: 500,
      message: "Internal server error",
    };
  }
};

module.exports = {
  bookingSearch,
};

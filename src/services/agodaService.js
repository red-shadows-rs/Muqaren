const playwright = require("playwright");

const agodaSearch = async (
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

  let browser;
  try {
    browser = await playwright.chromium.launch({
      headless: false,
    });

    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    });
    const page = await context.newPage();

    await page.goto("https://www.agoda.com/ar-ae/?cid=1844104");
    await page.waitForTimeout(1000);

    await page.click('[data-selenium="currency-container-selected-currency"]');
    await page.waitForTimeout(500);
    await page.click(
      '[data-selenium="currency-popup-menu-item"][data-value="AED"]'
    );
    await page.waitForTimeout(300);

    await page.fill("input[id='textInput']", destination);
    await page.waitForTimeout(500);
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(300);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1000);

    try {
      await page.waitForSelector(".Popup__container", { timeout: 2000 });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(500);
    } catch (error) {}

    await page.click("body");
    await page.waitForTimeout(500);

    await page.click("#check-in-box");
    await page.waitForTimeout(500);
    try {
      await page.waitForSelector(
        '.DatePicker, [data-selenium="calendar"], .calendar',
        { timeout: 2000 }
      );
    } catch (error) {
      await page.click("#check-in-box");
      await page.waitForTimeout(500);
    }
    let checkInFound = false;
    let attempts = 0;
    const maxAttempts = 8;

    while (!checkInFound && attempts < maxAttempts) {
      attempts++;
      try {
        await page.waitForSelector(`span[data-selenium-date="${checkIn}"]`, {
          timeout: 1000,
        });
        checkInFound = true;
      } catch (error) {
        let nextClicked = false;
        const nextButtonSelectors = [
          '[data-selenium="calendar-next-month-button"]',
          'button[aria-label="Next Month"]',
          ".calendar button:last-child",
          '[data-selenium="calendar-next-button"]',
          ".DatePicker-NavButton--next",
        ];

        for (const selector of nextButtonSelectors) {
          try {
            await page.waitForSelector(selector, { timeout: 500 });
            await page.click(selector);
            await page.waitForTimeout(500);
            nextClicked = true;
            break;
          } catch (selectorError) {
            continue;
          }
        }
        if (!nextClicked) {
          await page.click("#check-in-box");
          await page.waitForTimeout(500);
        }
      }
    }
    if (checkInFound) {
      await page.click(`span[data-selenium-date="${checkIn}"]`);
      await page.waitForTimeout(500);

      let checkOutFound = false;
      let checkOutAttempts = 0;

      while (!checkOutFound && checkOutAttempts < maxAttempts) {
        checkOutAttempts++;
        try {
          await page.waitForSelector(`span[data-selenium-date="${checkOut}"]`, {
            timeout: 1000,
          });
          checkOutFound = true;
        } catch (error) {
          let nextClicked = false;
          const nextButtonSelectors = [
            '[data-selenium="calendar-next-month-button"]',
            'button[aria-label="Next Month"]',
            ".calendar button:last-child",
            '[data-selenium="calendar-next-button"]',
            ".DatePicker-NavButton--next",
          ];

          for (const selector of nextButtonSelectors) {
            try {
              await page.waitForSelector(selector, { timeout: 500 });
              await page.click(selector);
              await page.waitForTimeout(500);
              nextClicked = true;
              break;
            } catch (selectorError) {
              continue;
            }
          }
          if (!nextClicked) {
            await page.click("#check-out-box");
            await page.waitForTimeout(500);
          }
        }
      }
      if (checkOutFound) {
        await page.click(`span[data-selenium-date="${checkOut}"]`);
        await page.waitForTimeout(500);
      }
    }
    await page.click("#occupancy-box");
    await page.waitForTimeout(500);

    try {
      await page.waitForSelector('[data-selenium="occupancy-selector-panel"]', {
        timeout: 2000,
      });
    } catch (error) {
      await page.click("#occupancy-box");
      await page.waitForTimeout(500);
    }
    const currentRooms = 1;
    if (rooms && rooms !== currentRooms) {
      await page.waitForSelector('[data-selenium="occupancyRooms"]', {
        timeout: 1000,
      });

      if (rooms > currentRooms) {
        for (let i = currentRooms; i < rooms; i++) {
          await page.click(
            '[data-selenium="occupancyRooms"] [data-selenium="plus"]'
          );
          await page.waitForTimeout(300);
        }
      } else {
        for (let i = currentRooms; i > rooms; i--) {
          await page.click(
            '[data-selenium="occupancyRooms"] [data-selenium="minus"]'
          );
          await page.waitForTimeout(300);
        }
      }
    }
    const currentAdults = 2;
    if (adults && adults !== currentAdults) {
      try {
        await page.waitForSelector('[data-selenium="occupancyAdults"]', {
          timeout: 500,
        });
      } catch (error) {
        await page.click("#occupancy-box");
        await page.waitForTimeout(500);
        await page.waitForSelector('[data-selenium="occupancyAdults"]', {
          timeout: 1000,
        });
      }

      if (adults > currentAdults) {
        for (let i = currentAdults; i < adults; i++) {
          await page.click(
            '[data-selenium="occupancyAdults"] [data-selenium="plus"]'
          );
          await page.waitForTimeout(300);
        }
      } else {
        for (let i = currentAdults; i > adults; i--) {
          await page.click(
            '[data-selenium="occupancyAdults"] [data-selenium="minus"]'
          );
          await page.waitForTimeout(300);
        }
      }
    }
    const currentChildren = 0;
    if (children && children !== currentChildren) {
      try {
        await page.waitForSelector('[data-selenium="occupancyChildren"]', {
          timeout: 500,
        });
      } catch (error) {
        await page.click("#occupancy-box");
        await page.waitForTimeout(500);
        await page.waitForSelector('[data-selenium="occupancyChildren"]', {
          timeout: 1000,
        });
      }

      if (children > currentChildren) {
        for (let i = currentChildren; i < children; i++) {
          await page.click(
            '[data-selenium="occupancyChildren"] [data-selenium="plus"]'
          );
          await page.waitForTimeout(300);
        }
      } else {
        for (let i = currentChildren; i > children; i--) {
          await page.click(
            '[data-selenium="occupancyChildren"] [data-selenium="minus"]'
          );
          await page.waitForTimeout(300);
        }
      }
    }

    await page.click('[data-selenium="searchButton"]');
    await page.waitForTimeout(5000);

    return {
      success: true,
      status: 200,
      message: "Agoda Search completed successfully",
      browser: browser,
      page: page,
    };
  } catch (error) {
    if (browser) {
      await browser.close();
    }

    return {
      success: false,
      status: 500,
      message: "Internal server error",
    };
  }
};

const agodaResults = async (browser, page) => {
  try {

    await page.keyboard.press("Escape");
    await page.waitForTimeout(1000000000000000000000000000);

    await page.waitForSelector(
      '.hotel-list-container li[data-selenium="hotel-item"]',
      {
        timeout: 10000,
      }
    );

    const agodaResults = await page.evaluate(() => {
      const hotelItems = document.querySelectorAll(
        '.hotel-list-container li[data-selenium="hotel-item"]'
      );
      const results = [];

      hotelItems.forEach((item, index) => {
        if (index < 10) {
          const nameElement = item.querySelector(
            '[data-selenium="hotel-name"]'
          );
          const title = nameElement ? nameElement.textContent.trim() : "N/A";

          const linkElement = item.querySelector("a.PropertyCard__Link");
          const link = linkElement
            ? "https://www.agoda.com" + linkElement.getAttribute("href")
            : "N/A";
          const imageElement = item.querySelector(
            '[data-element-name="ssrweb-mainphoto"] img'
          );
          let image = "N/A";
          if (imageElement) {
            const imageSrc = imageElement.getAttribute("src");
            image =
              imageSrc && imageSrc.startsWith("//")
                ? `https:${imageSrc}`
                : imageSrc;
          }
          const priceContainer = item.querySelector(
            '[data-element-name="final-price"]'
          );
          let price = "N/A";

          if (priceContainer) {
            const currencyElement = priceContainer.querySelector(
              '[data-selenium="hotel-currency"]'
            );
            const priceElement = priceContainer.querySelector(
              '[data-selenium="display-price"]'
            );

            if (currencyElement && priceElement) {
              price = `${currencyElement.textContent.trim()} ${priceElement.textContent.trim()}`;
            }
          }

          // الطريقة البديلة إذا لم تنجح الطريقة الأولى
          if (price === "N/A") {
            const priceAside = item.querySelector(
              '.PropertyCard__Prices [data-element-name="final-price"]'
            );
            if (priceAside) {
              const currencyElement = priceAside.querySelector(
                '[data-selenium="hotel-currency"]'
              );
              const priceElement = priceAside.querySelector(
                '[data-selenium="display-price"]'
              );

              if (currencyElement && priceElement) {
                price = `${currencyElement.textContent.trim()} ${priceElement.textContent.trim()}`;
              }
            }
          }

          results.push({
            title: title,
            link: link,
            image: image,
            price: price,
          });
        }
      });

      return results;
    });

    await browser.close();

    return {
      success: true,
      status: 200,
      message: "Agoda Results fetched successfully",
      data: agodaResults,
    };
  } catch (error) {
    await browser.close();

    return {
      success: false,
      status: 500,
      message: "Error retrieving hotel data",
      error: error.message,
    };
  }
};

(async () => {
  const searchResult = await agodaSearch(
    "Golden Ibis Memphis",
    "2025-07-01",
    "2025-08-05",
    2,
    2,
    1
  );

  if (searchResult.success && searchResult.browser) {
    const results = await agodaResults(searchResult.browser, searchResult.page);
    console.log("Results:", results);
  }
})();

module.exports = {
  agodaSearch,
  agodaResults,
};

let globalSelectedCheckIn = null,
  globalSelectedCheckOut = null;
let roomsCount = 1,
  adultsCount = 2,
  childrenCount = 0;
let currentDate = new Date(),
  isSelectingCheckOut = false;

const monthNames = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

document.addEventListener("DOMContentLoaded", () => {
  initScrollEffects();
  initSearchBox();
  initCalendar();
});

function initScrollEffects() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.onclick = (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth" });
    };
  });

  let lastScroll = 0;
  window.onscroll = () => {
    const current = window.pageYOffset;
    const header = document.querySelector("header");
    if (header) {
      header.style.transform =
        current > lastScroll && current > 200
          ? "translateY(-100%)"
          : "translateY(0)";
      header.style.transition = "transform 0.3s ease";
    }
    lastScroll = current <= 0 ? 0 : current;
  };
}

function initSearchBox() {
  const roomsInput = document.getElementById("rooms");
  const roomsDropdown = document.getElementById("rooms-dropdown");

  const updateCounts = () => {
    ["rooms", "adults", "children"].forEach((id) => {
      const el = document.getElementById(`${id}-count`);
      if (el) el.textContent = eval(`${id}Count`);
    });

    if (roomsInput) {
      roomsInput.value = `${roomsCount} غرفة، ${adultsCount} بالغين${
        childrenCount > 0 ? `، ${childrenCount} أطفال` : ""
      }`;
    }
  };

  roomsInput?.addEventListener("click", (e) => {
    e.stopPropagation();
    roomsDropdown?.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!roomsDropdown?.contains(e.target) && e.target !== roomsInput) {
      roomsDropdown?.classList.remove("active");
    }
  });

  const counters = [
    {
      id: "room",
      count: () => roomsCount,
      set: (v) => (roomsCount = v),
      min: 1,
      max: 5,
    },
    {
      id: "adults",
      count: () => adultsCount,
      set: (v) => (adultsCount = v),
      min: 1,
      max: 10,
    },
    {
      id: "children",
      count: () => childrenCount,
      set: (v) => (childrenCount = v),
      min: 0,
      max: 6,
    },
  ];

  counters.forEach(({ id, count, set, min, max }) => {
    document.getElementById(`${id}-minus`)?.addEventListener("click", () => {
      if (count() > min) {
        set(count() - 1);
        updateCounts();
      }
    });
    document.getElementById(`${id}-plus`)?.addEventListener("click", () => {
      if (count() < max) {
        set(count() + 1);
        updateCounts();
      }
    });
  });

  updateCounts();

  document.getElementById("search-form")?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!globalSelectedCheckIn || !globalSelectedCheckOut) {
      alert("يرجى اختيار تواريخ تسجيل الدخول والخروج");
      return;
    }

    const destination = document.getElementById("destination")?.value.trim();
    if (!destination) {
      alert("يرجى إدخال الوجهة");
      return;
    }

    const params = new URLSearchParams({
      destination,
      checkIn: formatDateForAPI(globalSelectedCheckIn),
      checkOut: formatDateForAPI(globalSelectedCheckOut),
      rooms: roomsCount,
      adults: adultsCount,
      children: childrenCount,
    });

    window.location.href = `/search?${params.toString()}`;
  });
}

function initCalendar() {
  const elements = {
    trigger: document.getElementById("calendar-trigger"),
    calendar: document.getElementById("custom-calendar"),
    checkIn: document.getElementById("check-in-display"),
    checkOut: document.getElementById("check-out-display"),
    month: document.getElementById("month-selector"),
    year: document.getElementById("year-selector"),
    days: document.getElementById("calendar-days"),
    prev: document.getElementById("prev-month"),
    next: document.getElementById("next-month"),
  };

  if (!elements.trigger || !elements.calendar) return;

  highlightCurrentWeekday();
  initializeYearSelector();
  elements.month && (elements.month.value = currentDate.getMonth());

  elements.trigger.onclick = (e) => {
    e.stopPropagation();
    elements.trigger.classList.toggle("active");
    elements.calendar.classList.toggle("active");
    if (elements.calendar.classList.contains("active")) renderCalendar();
  };

  document.onclick = (e) => {
    if (
      !elements.calendar.contains(e.target) &&
      !elements.trigger.contains(e.target)
    ) {
      elements.calendar.classList.remove("active");
      elements.trigger.classList.remove("active");
    }
  };

  elements.month &&
    (elements.month.onchange = (e) => {
      currentDate.setMonth(parseInt(e.target.value));
      renderCalendar();
    });

  elements.year &&
    (elements.year.onchange = (e) => {
      currentDate.setFullYear(parseInt(e.target.value));
      renderCalendar();
    });

  elements.prev &&
    (elements.prev.onclick = () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      updateSelectors();
      renderCalendar();
    });

  elements.next &&
    (elements.next.onclick = () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      updateSelectors();
      renderCalendar();
    });

  function initializeYearSelector() {
    const currentYear = new Date().getFullYear();
    if (elements.year) {
      elements.year.innerHTML = "";
      for (let year = currentYear; year <= currentYear + 5; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        if (year === currentYear) option.selected = true;
        elements.year.appendChild(option);
      }
    }
  }

  function updateSelectors() {
    if (elements.month) elements.month.value = currentDate.getMonth();
    if (elements.year) elements.year.value = currentDate.getFullYear();
  }

  function renderCalendar() {
    if (!elements.days) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDay = firstDay.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    elements.days.innerHTML = "";

    for (let i = 0; i < startingDay; i++) {
      const day = createElement(
        "div",
        "calendar-day other-month",
        new Date(year, month, -startingDay + i + 1).getDate()
      );
      elements.days.appendChild(day);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEl = createElement("div", "calendar-day", day);
      const dateObj = new Date(year, month, day);

      if (dateObj.getTime() === today.getTime()) dayEl.classList.add("today");
      if (
        globalSelectedCheckIn &&
        dateObj.getTime() === globalSelectedCheckIn.getTime()
      )
        dayEl.classList.add("start-date");
      if (
        globalSelectedCheckOut &&
        dateObj.getTime() === globalSelectedCheckOut.getTime()
      )
        dayEl.classList.add("end-date");
      if (
        globalSelectedCheckIn &&
        globalSelectedCheckOut &&
        dateObj > globalSelectedCheckIn &&
        dateObj < globalSelectedCheckOut
      ) {
        dayEl.classList.add("in-range");
      }

      if (dateObj < today) {
        dayEl.classList.add("disabled");
      } else {
        dayEl.onclick = () => selectDate(dateObj);
      }

      elements.days.appendChild(dayEl);
    }

    const totalCells = elements.days.children.length;
    for (let i = 1; i <= 42 - totalCells; i++) {
      const day = createElement("div", "calendar-day other-month", i);
      elements.days.appendChild(day);
    }
  }

  function selectDate(date) {
    if (!isSelectingCheckOut && !globalSelectedCheckIn) {
      globalSelectedCheckIn = new Date(date);
      isSelectingCheckOut = true;
    } else if (isSelectingCheckOut) {
      if (date <= globalSelectedCheckIn) {
        globalSelectedCheckIn = new Date(date);
        globalSelectedCheckOut = null;
        isSelectingCheckOut = true;
      } else {
        globalSelectedCheckOut = new Date(date);
        isSelectingCheckOut = false;
      }
    } else {
      globalSelectedCheckIn = new Date(date);
      globalSelectedCheckOut = null;
      isSelectingCheckOut = true;
    }
    updateDateDisplay();
    renderCalendar();
  }

  function updateDateDisplay() {
    if (elements.checkIn) {
      elements.checkIn.textContent = globalSelectedCheckIn
        ? formatDate(globalSelectedCheckIn)
        : "تسجيل الدخول";
    }
    if (elements.checkOut) {
      elements.checkOut.textContent = globalSelectedCheckOut
        ? formatDate(globalSelectedCheckOut)
        : "تسجيل الخروج";
    }
  }

  renderCalendar();
}

function highlightCurrentWeekday() {
  const weekdays = document.querySelectorAll(".calendar-weekdays .weekday");
  const currentDay = new Date().getDay();
  weekdays.forEach((weekday, index) => {
    weekday.classList.toggle("current-day", index === currentDay);
  });
}

function createElement(tag, className, textContent) {
  const el = document.createElement(tag);
  el.className = className;
  el.textContent = textContent;
  return el;
}

function formatDate(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function formatDateForAPI(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

$(document).ready(function () {

  $(".accordion-toggle").click(function () {
    const content = $(this).next(".accordion-content");
    $(".accordion-content").not(content).slideUp();
    content.slideToggle();
  });

  initSlideshow(".jquery-slideshow");

  fetchWeather();

  const form = $("#mailing-list-form");
  const message = $("#form-message");

  if (form.length) {
    form.on("submit", function (e) {
      e.preventDefault();

      const name = form.find("input[name='name']").val().trim();
      const email = form.find("input[name='email']").val().trim();
      const phone = form.find("input[name='phone']").val().trim();
      const zip = form.find("input[name='zip']").val().trim();

      if (!name || !email) {
        message.text("Please fill out all required fields.").css("color", "red");
        return;
      }

      if (zip && !/^\d{5}$/.test(zip)) {
        message.text("Zip code must be 5 digits.").css("color", "red");
        return;
      }

      if (phone && !/^\d+$/.test(phone)) {
        message.text("Phone number must contain only digits.").css("color", "red");
        return;
      }

      message.text("Thank you for subscribing!").css("color", "green");
      form[0].reset();
    });
  }
});

function initSlideshow(containerSelector) {
  const container = $(containerSelector);
  const slides = container.find(".slide-gallery img");
  const dots = container.find(".dot");
  let currentIndex = 0;

  function showSlide(index) {
    slides.removeClass("active").css("z-index", "0");
    slides.eq(index).addClass("active").css("z-index", "1");
    dots.removeClass("active").eq(index).addClass("active");
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  container.find(".next").click(nextSlide);
  container.find(".prev").click(prevSlide);
  dots.click(function () {
    currentIndex = $(this).data("slide");
    showSlide(currentIndex);
  });

  showSlide(currentIndex);
  setInterval(nextSlide, 5000);
}

function fetchWeather() {
  const apiKey = "59dec80a1edf1f0afc1ac2ea95fd6f1f";
  const city = "Pittsburgh";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  $.get(url, function (data) {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const emoji = getWeatherIcon(data.weather[0].main);
    $("#weather").html(`${emoji} ${temp}°F, ${capitalize(desc)}`);
  }).fail(function () {
    $("#weather").html("Unable to load weather. Try again later.");
  });
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getWeatherIcon(main) {
  const icons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Smoke: "🌫️",
    Haze: "🌫️",
    Fog: "🌫️"
  };
  return icons[main] || "🌡️";
}

$(".site-nav a").each(function () {
  const page = window.location.pathname.split("/").pop();
  if ($(this).attr("href") === page) {
    $(this).addClass("active");
  }
});


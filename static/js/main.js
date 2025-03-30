document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.accordion-toggle');
  
    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const isOpen = content.style.display === 'block';
  
        // Close all
        document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');
        
        // Toggle selected
        content.style.display = isOpen ? 'none' : 'block';
      });
    });
  });

  $(document).ready(function () {
    let currentIndex = 0;
    const slides = $(".slide-gallery img");
    const dots = $(".dot");
  
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
  
    $(".next").click(nextSlide);
    $(".prev").click(prevSlide);
    $(".dot").click(function () {
      currentIndex = $(this).data("slide");
      showSlide(currentIndex);
    });
  
    showSlide(currentIndex);
    setInterval(nextSlide, 5000);
  });
  
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
  
  // Call the weather function when DOM is ready
  $(document).ready(function () {
    fetchWeather();
  });
  
  
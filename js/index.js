$(document).ready(function () {

    // Navbar background change on scroll
  const navBar = document.querySelector("nav");

  window.addEventListener("scroll", function () {
    navBar.classList.toggle("change", this.scrollY > 0);
  });


  // Covid Api data
  $.getJSON("https://api.covid19india.org/data.json", function (data) {
    //Total Cases stored in variable
    let total_active = data.statewise[0].active;
    let total_confirmed = data.statewise[0].confirmed;
    let total_deaths = data.statewise[0].deaths;
    let total_recoverd = data.statewise[0].recovered;
    let time = data.statewise[0].lastupdatedtime;
    console.log(time);
    $("#active").append(total_active);
    $("#confirmed").append(total_confirmed);
    $("#deaths").append(total_deaths);
    $("#recovered").append(total_recoverd);
    $("#time").append(time);

    //Daily Update
    let daily =
      data.cases_time_series[data.cases_time_series.length - 1].dailyconfirmed;
    let daily_recovered =
      data.cases_time_series[data.cases_time_series.length - 1].dailyrecovered;
    let daily_deaths =
      data.cases_time_series[data.cases_time_series.length - 1].dailydeceased;
    console.log(daily);
    $("#dailyconfirmed").append(daily);
    $("#dailyrecovered").append(daily_recovered);
    $("#dailydeceased").append(daily_deaths);
  });

  // Tooltip activate
  $('[data-toggle="tooltip"]').tooltip();

  //Counter Animation
  let nCount = function (selector) {
    $(selector).each(function () {
      $(this).animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 4000,
          easing: "swing",
          step: function (value) {
            $(this).text(Math.ceil(value));
          },
        }
      );
    });
  };
  let a = 0;
  $(window).scroll(function () {
    let oTop = $(".numbers").offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() >= oTop) {
      a++;
      nCount(".ract h1");
    }
  });

  // On scroll Animation
  var slideUp = {
    distance: "150%",
    origin: "top",
    opacity: 0.6,
    delay: 375,
    duration: 600,
    reset: true,
  };
  var slideleft = {
    distance: "350%",
    origin: "left",
    opacity: 0.6,
    delay: 105,
    duration: 300,
    reset: true,
  };
  var symptomsleft = {
    easing: 'ease-in-out' ,
    opacity: null,
    delay: 305,
    duration: 500,
    reset: true,
  };
  var list_gourpleft = {
    distance: "350%",
    origin: "left",
    opacity: 0.6,
    delay: 305,
    duration: 700,
    reset: true,
  };

  ScrollReveal().reveal(".nav-item", slideUp);
  ScrollReveal().reveal(".int", slideUp);
  ScrollReveal().reveal(".ract", slideleft);
  ScrollReveal().reveal(".faq-group", list_gourpleft);
  ScrollReveal().reveal(".faq-content", list_gourpleft);
  ScrollReveal().reveal(".symptoms-content", symptomsleft);
  ScrollReveal().reveal(".symptoms-tab", symptomsleft);
});
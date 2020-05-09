//range slider functionality

var slider = document.getElementById("myRange");
var output = document.getElementById("currentPrice");
output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
};

//jquery loads buttons

$(document).ready(function () {
  LoadDataAsync();

  function LoadDataAsync() {
    $.ajax({
      type: "GET",
      url: "data.json",
      data: "application/json",
      dataType: "json",
      error: function (xhr) {
        console.log("Lathos");
      },
      success: function (response) {
        ParseData(response);
      },
    });
  }

  function ParseData(response) {
    console.log("etreksa re paidi mou");

    for (var i in response) {
      //get rooms

      var rooms = response[i].roomtypes;

      for (var j in rooms) {
        var roomname = rooms[j].name;
        var target = document.getElementById("rooms");
        var domatia = document.createElement("option");
        domatia.innerText = roomname;
        if (roomname === "Family Rooms") {
          console.log("ontws");
          domatia.setAttribute("selected", "selected");
        }
        target.appendChild(domatia);
      }

      //get cities

      var entries = response[i].entries;
      var cities = [];

      for (var k in entries) {
        cities.push(entries[k].city);
      }

      var uniqueCities = [...new Set(cities)];
    }

    //autocomplete functionality

    const searchInput = document.querySelector(".search-input");
    const suggestionsPanel = document.querySelector(".suggestions");

    searchInput.addEventListener("keyup", function () {
      const input = searchInput.value;
      suggestionsPanel.innerHTML = "";
      suggestionsPanel.style.display = "none";
      const suggestions = uniqueCities.filter(function (city) {
        return city.toLowerCase().startsWith(input.toLowerCase());
      });
      suggestions.forEach(function (suggested) {
        const div = document.createElement("div");
        div.innerHTML = suggested;
        suggestionsPanel.style.display = "flex";
        suggestionsPanel.appendChild(div);
      });
      if (input === "") {
        suggestionsPanel.innerHTML = "";
        suggestionsPanel.style.display = "none";
      }
    });

    $(suggestionsPanel).click(function (event) {
      var text = $(event.target).text();
      searchInput.value = text;
    });

    //making icons clickable

    const icon1 = document.querySelector("#icon1");
    const checkInInput = document.querySelector("#check-in-input");

    $(icon1).click(function () {
      $(checkInInput).click();
      console.log("hi");
    });

    //adding hotels
    var loadBtn = document.getElementById("load");
    loadBtn.addEventListener("click", LoadHotels());

    function LoadHotels() {
      for (var i in response) {
        var entries = response[i].entries;
        for (var j in response[i].entries) {
          var jsonHotelName = entries[j].hotelName;
          var jsonStars = entries[j].rating;
          var jsonCity = entries[j].city;
          var jsonThumbnail = entries[j].thumbnail;
          var jsonGuestRating = entries[j].guestrating;
          var jsonPrice = entries[j].price;
          var jsonMapUrl = entries[j].mapurl;
          var jsonRating = entries[j].ratings.no;
          var jsonRatingText = entries[j].ratings.text;

          var hotelContainer = document.getElementById("hotels");

          var hotelItem = document.createElement("div");
          hotelItem.setAttribute("class", "hotel-item");

          var hotelImage = document.createElement("img");
          hotelImage.setAttribute("class", "hotel-image");
          hotelImage.setAttribute("src", jsonThumbnail);
          hotelImage.setAttribute("alt", "hotel");

          var hotelDescription = document.createElement("div");
          hotelDescription.setAttribute("class", "hotel-description-container");

          var hotelTitle = document.createElement("div");
          hotelTitle.innerHTML = jsonHotelName;
          hotelTitle.setAttribute("class", "hotel-title");

          var hotelStars = document.createElement("div");
          hotelStars.innerHTML = jsonStars + " Star Hotel";
          hotelTitle.setAttribute("class", "hotel-stars");

          var guestRatingContainer = document.createElement("div");
          hotelTitle.setAttribute("class", "guest-rating-container");

          var guestRating = document.createElement("div");
          guestRating.setAttribute(
            "class",
            "guest-rating smooth-left smooth-right"
          );
          guestRating.innerHTML = jsonRating;

          var ratingText = document.createElement("div");
          ratingText.setAttribute("class", "rating-text");
          ratingText.innerHTML = jsonRatingText;

          var hotelRating = document.createElement("div");
          hotelRating.setAttribute("class", "hotel-rating");
          hotelRating.innerHTML = jsonGuestRating;

          var bar = document.createElement("div");
          bar.setAttribute("class", "vertical-bar-big");

          var priceSectionContainer = document.createElement("div");
          priceSectionContainer.setAttribute(
            "class",
            "price-section-container"
          );

          var priceContainer = document.createElement("div");
          priceContainer.setAttribute("class", "price-container");

          var priceText = document.createElement("div");
          priceText.setAttribute("class", "price-text");
          priceText.innerHTML = "Price";

          var price = document.createElement("div");
          price.setAttribute("class", "price");
          price.innerHTML = "$" + jsonPrice;

          var priceBtnContainer = document.createElement("div");
          priceBtnContainer.setAttribute("class", "price-btn-container");

          var priceBtn = document.createElement("div");
          priceBtn.setAttribute("class", "price-btn smooth-left");
          priceBtn.innerHTML = "View Deal";

          var arrowRight = document.createElement("span");
          arrowRight.setAttribute(
            "class",
            "material-icons sidearrow-icons smooth-right green-side-arrow"
          );
          arrowRight.innerHTML = "keyboard_arrow_right";

          guestRatingContainer.appendChild(guestRating);
          guestRatingContainer.appendChild(ratingText);

          hotelDescription.appendChild(hotelTitle);
          hotelDescription.appendChild(hotelStars);
          hotelDescription.appendChild(guestRatingContainer);
          hotelDescription.appendChild(hotelRating);

          priceContainer.appendChild(priceText);
          priceContainer.appendChild(price);

          priceBtnContainer.appendChild(priceBtn);
          priceBtnContainer.appendChild(arrowRight);

          priceSectionContainer.appendChild(priceContainer);
          priceSectionContainer.appendChild(priceBtnContainer);

          hotelItem.appendChild(hotelImage);
          hotelItem.appendChild(hotelDescription);
          hotelItem.appendChild(bar);
          hotelItem.appendChild(priceSectionContainer);

          hotelContainer.appendChild(hotelItem);
        }
      }
    }
  }
});



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
    
    for (var i in response) {
      //get rooms

      var rooms = response[i].roomtypes;

      for (var j in rooms) {
        var roomname = rooms[j].name;
        var target = document.getElementById("rooms");
        var domatia = document.createElement("option");
        domatia.innerText = roomname;
        if (roomname === "Family Rooms") {
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
      RemoveSuggestions();
    });

    $("#search-btn").click(function () {
      ClearHotels();
      LoadHotels();
    });

    function LoadHotels() {
      var maxPrice = 0;
      var priceCounter = 0;

      for (var i in response) {
        var entries = response[i].entries;

        for (var j in response[i].entries) {
          var jsonCity = entries[j].city;
          var jsonPrice = entries[j].price;

          if (searchInput.value === jsonCity) {
            AppendHotel();
            GetMax();
            AppendMax();
          }

          function AppendHotel() {
            var jsonHotelName = entries[j].hotelName;
            var jsonStars = entries[j].rating;
            var jsonThumbnail = entries[j].thumbnail;
            var jsonGuestRating = entries[j].guestrating;
            var jsonMapUrl = entries[j].mapurl;
            var jsonRating = entries[j].ratings.no;
            var jsonRatingText = entries[j].ratings.text;

            priceCounter++;
            var priceId = "price" + priceCounter;

            var hotelContainer = document.getElementById("hotels");

            var hotelItem = document.createElement("div");
            hotelItem.setAttribute("class", "hotel-item");

            var hotelImage = document.createElement("img");
            hotelImage.setAttribute("class", "hotel-image");
            hotelImage.setAttribute("src", jsonThumbnail);
            hotelImage.setAttribute("alt", "hotel");

            var hotelDescription = document.createElement("div");
            hotelDescription.setAttribute(
              "class",
              "hotel-description-container"
            );

            var hotelTitle = document.createElement("div");
            hotelTitle.innerHTML = jsonHotelName;
            hotelTitle.setAttribute("class", "hotel-title");

            var hotelStars = document.createElement("div");
            hotelStars.innerHTML = jsonStars + " Star Hotel";
            hotelStars.setAttribute("class", "hotel-stars");

            var guestRatingContainer = document.createElement("div");
            guestRatingContainer.setAttribute(
              "class",
              "guest-rating-container"
            );

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
            priceText.innerHTML = "Price";
            priceText.setAttribute("class", "price-text");

            var price = document.createElement("div");
            price.innerHTML = "$" + jsonPrice;
            price.setAttribute("class", "price");
            price.setAttribute("id", priceId);

            var priceBtnContainer = document.createElement("div");
            priceBtnContainer.setAttribute("class", "price-btn-container");

            var priceBtn = document.createElement("div");
            priceBtn.innerHTML = "View Deal";
            priceBtn.setAttribute("class", "price-btn smooth-left");

            var arrowRight = document.createElement("span");
            arrowRight.innerHTML = "keyboard_arrow_right";
            arrowRight.setAttribute(
              "class",
              "material-icons sidearrow-icons smooth-right green-side-arrow"
            );

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

          function GetMax() {
            if (jsonPrice > maxPrice) {
              maxPrice = jsonPrice;
            }
          }

          function AppendMax() {
            console.log("geia");
            var sliderItem = document.getElementById("myRange");
            sliderItem.setAttribute("max", maxPrice);
          }
        }
      }
    }

    function RefreshHotels() {
      var maxPrice = 0;
      var priceCounter = 0;

      for (var i in response) {
        var entries = response[i].entries;

        for (var j in response[i].entries) {
          var jsonCity = entries[j].city;
          var jsonPrice = entries[j].price;

          if (searchInput.value === jsonCity) {
            AppendHotel();
          }

          function AppendHotel() {
            var jsonHotelName = entries[j].hotelName;
            var jsonStars = entries[j].rating;
            var jsonThumbnail = entries[j].thumbnail;
            var jsonGuestRating = entries[j].guestrating;
            var jsonMapUrl = entries[j].mapurl;
            var jsonRating = entries[j].ratings.no;
            var jsonRatingText = entries[j].ratings.text;

            priceCounter++;
            var priceId = "price" + priceCounter;

            var hotelContainer = document.getElementById("hotels");

            var hotelItem = document.createElement("div");
            hotelItem.setAttribute("class", "hotel-item");

            var hotelImage = document.createElement("img");
            hotelImage.setAttribute("class", "hotel-image");
            hotelImage.setAttribute("src", jsonThumbnail);
            hotelImage.setAttribute("alt", "hotel");

            var hotelDescription = document.createElement("div");
            hotelDescription.setAttribute(
              "class",
              "hotel-description-container"
            );

            var hotelTitle = document.createElement("div");
            hotelTitle.innerHTML = jsonHotelName;
            hotelTitle.setAttribute("class", "hotel-title");

            var hotelStars = document.createElement("div");
            hotelStars.innerHTML = jsonStars + " Star Hotel";
            hotelStars.setAttribute("class", "hotel-stars");

            var guestRatingContainer = document.createElement("div");
            guestRatingContainer.setAttribute(
              "class",
              "guest-rating-container"
            );

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
            priceText.innerHTML = "Price";
            priceText.setAttribute("class", "price-text");

            var price = document.createElement("div");
            price.innerHTML = "$" + jsonPrice;
            price.setAttribute("class", "price");
            price.setAttribute("id", priceId);

            var priceBtnContainer = document.createElement("div");
            priceBtnContainer.setAttribute("class", "price-btn-container");

            var priceBtn = document.createElement("div");
            priceBtn.innerHTML = "View Deal";
            priceBtn.setAttribute("class", "price-btn smooth-left");

            var arrowRight = document.createElement("span");
            arrowRight.innerHTML = "keyboard_arrow_right";
            arrowRight.setAttribute(
              "class",
              "material-icons sidearrow-icons smooth-right green-side-arrow"
            );

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

    function ClearHotels() {
      var hotelContainer = document.getElementById("hotels");
      while (hotelContainer.hasChildNodes()) {
        hotelContainer.removeChild(hotelContainer.firstChild);
      }
    }

    function RemoveSuggestions() {
      while (suggestionsPanel.hasChildNodes()) {
        suggestionsPanel.removeChild(suggestionsPanel.firstChild);
        suggestionsPanel.innerHTML = "";
        suggestionsPanel.style.display = "none";
      }
    }

    //range slider functionality

var slider = document.getElementById("myRange");
var output = document.getElementById("currentPrice");

slider.oninput = function () {
  output.innerHTML = this.value;
  ClearHotels();
  RefreshHotels();
  RemoveHotels(this.value);
};

function RemoveHotels(currentSliderValue) {
  var firstPrice = document.getElementById("price1");

  if (firstPrice !== null) {
    var firstPriceNumberWithDollar = firstPrice.innerHTML;
    var firstPriceNumber = firstPriceNumberWithDollar.substring(1);

    if (Number(firstPriceNumber) > currentSliderValue) {
      firstPrice.parentNode.parentNode.parentNode.remove();
    }
  }

  var secondPrice = document.getElementById("price2");

  if (secondPrice !== null) {
    var secondPriceNumberWithDollar = secondPrice.innerHTML;
    var secondPriceNumber = secondPriceNumberWithDollar.substring(1);

    if (Number(secondPriceNumber) > currentSliderValue) {
      secondPrice.parentNode.parentNode.parentNode.remove();
    }
  }
}
  }
});

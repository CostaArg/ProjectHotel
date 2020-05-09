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

    $(suggestionsPanel).click(function(event) {
      var text = $(event.target).text();
      searchInput.value = text;
  });

  //making icons clickable

  const icon1 = document.querySelector("#icon1");
  const checkInInput = document.querySelector("#check-in-input");

  $(icon1).click(function() {
    $(checkInInput).click();
    console.log("hi");
});

  }
});

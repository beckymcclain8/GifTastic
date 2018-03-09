$(document).ready(function () {
  var topics = [
    "Friends",
    "Seinfeld",
    "Sesame Street",
    "Reading Rainbow",
    "CSI",
    "Survivor"
  ];
  //for loop to create buttons based on the strings in the array
var s = " ";
  function renderButtons() {
    $("#buttons").empty();
    for (i = 0; i < topics.length; i++) {
      var tv = $("<button>");
      tv.addClass("tv");
      tv.attr("data-name", topics[i]);
      tv.text(topics[i]);
      $("#buttons").append(tv);
    }

  //When the user clicks a button, it sends an AJAX request to the GIPHY API.
  $("button").on("click", function () {
    var show = $(this).attr("data-name");
    var queryURL =
      "https:api.giphy.com/v1/gifs/search?api_key=H7VadhDh2o2nP6aHy83tuseFHFjLSd4C&q=" +
      show +
      "&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var tvImage = $("<img>");
        var still = results[i].images.original_still.url;
        var animate = results[i].images.original.url
        tvImage.attr("src", still);
        tvImage.attr("data-still", still);
        tvImage.attr("data-animate", animate);
        tvImage.attr("data-state", "still");
        tvImage.addClass("gif");
        gifDiv.append(p);
        gifDiv.prepend(tvImage);
        $("#gifs").prepend(gifDiv);
        console.log(results);
      };
    });
  });

  $(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "moving");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#submit").on("click", function (event) {
    event.preventDefault();
    var newTvButton = $("#userInput").val().trim();
    topics.push(newTvButton);
    renderButtons();
  })
}
renderButtons();
});






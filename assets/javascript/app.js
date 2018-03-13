$(document).ready(function() {
  //array of tv shows
  var topics = [
    "Friends",
    "Seinfeld",
    "Sesame Street",
    "Reading Rainbow",
    "CSI",
    "Survivor"
  ];

  //for loop to create buttons based on the strings in the array
  function renderButtons() {
    $("#buttons").empty();
    for (i = 0; i < topics.length; i++) {
      var tv = $("<button>");
      tv.addClass("tv");
      tv.attr("data-name", topics[i]);
      tv.text(topics[i]);
      $("#buttons").append(tv);
    }
  }
  //When the user clicks a button, it sends an AJAX request to the GIPHY API.
  $(document).on("click", ".tv", function() {
    var show = $(this).attr("data-name");
    var queryURL =
      "https:api.giphy.com/v1/gifs/search?api_key=H7VadhDh2o2nP6aHy83tuseFHFjLSd4C&q=" +
      show +
      "&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#gifs").empty();
      var results = response.data;
      //for loop that creates the divs that holds the gifs and ratings based on the AJAX response
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        p.addClass("p");
        var tvImage = $("<img>");
        var still = results[i].images.original_still.url;
        var animate = results[i].images.original.url;
        //adding attibutes to the gifs so I can animate them or make them still by clicking them
        tvImage.attr("src", still);
        tvImage.attr("data-still", still);
        tvImage.attr("data-animate", animate);
        tvImage.attr("data-state", "still");
        tvImage.addClass("gif");
        //setting it up so that the rating is under the gif
        gifDiv.append(p);
        gifDiv.prepend(tvImage);
        $("#gifs").prepend(gifDiv);
        console.log(results);
      }
    });
  });
  //event listener that changes the gif from from still to animated based on it's current data state
  $(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "moving");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  //A  button to submit new tv shows... and create a new button at the top of the page.
  $("#submit").on("click", function(event) {
    event.preventDefault();
    var newTvButton = $("#userInput")
      .val()
      .trim();
    topics.push(newTvButton);
    console.log("new button" + newTvButton);
    console.log(topics);
    renderButtons();
  });

  //calls the function to create the buttons at the top of the page.
  renderButtons();
});

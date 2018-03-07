$(document).ready(function() {
  var topics = [
    "Friends",
    "Seinfeld",
    "Sesame Street",
    "Reading Rainbow",
    "CSI",
    "Survivor"
  ];
  //for loop to create buttons based on the strings in the array
  for (i = 0; i < topics.length; i++) {
    var tv = $("<button>");
    tv.addClass("tv");
    tv.attr("data-name", topics[i]);
    tv.text(topics[i]);
    $("#buttons").append(tv);
  }

  $("button").on("click", function() {
    var show = $(this).attr("data-name");
    var queryURL =
      "https:api.giphy.com/v1/gifs/search?api_key=H7VadhDh2o2nP6aHy83tuseFHFjLSd4C&q=" +
      show;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var tvImage = $("<img>");
        tvImage.attr("src", results[i].images.fixed_height.url);
        gifDiv.append(p);
        gifDiv.append(tvImage);
        $("#gifs").prepend(gifDiv);
      }
    });
  });
});

$(document).ready(function() {
  var topics = [
    "Friends",
    "Seinfeld",
    "Sesame Street",
    "Reading Rainbow",
    "CSI",
    "Survivor"
  ];

  for (i = 0; i < topics.length; i++) {
    var tv = $("<button>");
    tv.addClass("tv");
    tv.attr("data-name", topics[i]);
    tv.text(topics[i]);
    $("#buttons").append(tv);
  }
});

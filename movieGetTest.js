$(document).ready(start);

function start() {
  var title = "The Test Movie with a long stupid title";
  var httpString = "https://api.themoviedb.org/3/search/movie?query=";
  httpString += title;
  httpString += "&language=en-US&api_key=6daa32042b6b68aa55beeeb9a9d599a7";

  $.getJSON(httpString, function(json){
    console.log(json);

    var dt = json["results"];

    $("#titlePanel").empty();
    $("#infoPanel").empty();
    document.getElementById("titlePanel").innerHTML = '<h3>Movie Info</h3><br>';

    for (var i = 0;i < dt.length; i++){
      var rec = dt[i];
      var poster_path = rec["poster_path"];
      var adult = rec["adult"];
      var overview = rec["overview"];
      var release_date = rec["release_date"];
      var genre_ids = rec["genre_ids"];
      var id = rec["id"];
      var original_title = rec["original_title"];
      var original_language = rec["original_language"];
      var title = rec["title"];
      var backdrop_path = rec["backdrop_path"];
      var popularity = rec["popularity"];
      var vote_count = rec["vote_count"];
      var video = rec["video"];
      var vote_average = rec["vote_average"];


      $("#infoPanel").append('poster path: ' + poster_path + '<br>' +
                             'adult: ' + adult + '<br>' +
                             'overview: ' + overview + '<br>' +
                             'release date: '+ release_date + '<br>' +
                             'genreId: ' + genre_ids + '<br>' +
                             'id: ' + id + '<br>' +
                             'orgTitle: ' + original_title + '<br>' +
                             'orgLang: ' + original_language + '<br>' +
                             'title: ' + title + '<br>' +
                             'backDropPath: ' + backdrop_path + '<br>' +
                             'popularity: ' + popularity + '<br>' +
                             'vote count: ' + vote_count + '<br>' +
                             'video: ' + video + '<br>' +
                             'vote average: ' + vote_average + '<br><br>');

    } // end for

  }); // end getJSON

} // end start

$(document).ready(start);

  function start() {

    console.log("Start");

    $.ajax({
      cache: false,
      method: "GET",
      dataType: "json",
      url: "getList.php",
      success: gotData
    });

    $("#addBtn1").on("click", searchMovie);

    aniStart(1000);

  } // end start



//==================================================================================================================================================================================================
// GET MOVIES
// Gets movie data from Server, returns json, writes to UI
//========================================================================================================================================
  function gotData(dt) {

    console.log("Got Data");
    var movieInfo = '';
    var posterSrc = '';

    $("#dbPanel").empty();

    for (i = 0; i < dt.length; i ++) {
       var line = dt[i];
       var overview = line["OVERVIEW"];
       var year = line["YEAR"];
       var title = line["TITLE"];
       var studio = line["STUDIO"];
       var price = line["PRICE"];
       var id = line["ID"];
       var poster = line["POSTER"];

       if (poster == "null"){
         posterSrc = "./img/noImg.jpg";
       } else {
         posterSrc = "https://image.tmdb.org/t/p/w185";
         posterSrc += poster;
       }

       var d = formDate(year);

       if(i % 2 == 0){

         movieInfo += '<div class="row" id="movieInfo">' +
                      '<div class="col-sm-2 col-md-2 col-lg-2" id="movieInfo">' +
                      '<img align="center" class="img-responsive img-rounded center-block" src="'+posterSrc+'" alt="poster"><br>' +
                      '<div class="form-group">' +
                      '<p align="center"><button type="button" class="btn btn-sm btn-primary" name="edit" onclick="editMovie('+id+')">Edit</button>&nbsp;<button type="button" class="btn btn-sm btn-primary" name="delete" onclick="removeMovie('+id+')">Delete</button></p>' +
                      // '<p align="center"><input type="button" class="btn btn-sm btn-primary" name="edit" value="Edit" onclick="editMovie('+id+')">&nbsp;' +
                      // '<input type="button" class="btn btn-sm btn-primary" value="Delete" onclick="removeMovie('+id+')"></p>' +
                      '</div></div>' +
                      '<div class="col-sm-4 col-md-4 col-lg-4" id="movieInfo">' +
                      '<p><h4>'+title+'</h4></p>' +
                      '<p class="meta" id="movieInfo">' +
                      '<span class="release_date" id="movieInfo">' +
                      '<strong>'+d+'</strong>' +
                      '</span></p>' +
                      '<p class="overview" id="movieInfo">'+overview+'</p>'+
                      '<p class="meta" id="movieInfo">' +
                      '<strong>'+studio+'</strong></p>' +
                      '<p class="meta" id="movieInfo">' +
                      '<strong>Budget: $'+price+'</strong><br>' +
                      '</p><br><br></div>';


       } else {

         movieInfo += '<div class="col-sm-2 col-md-2 col-lg-2" id="movieInfo">' +
                      '<img align="center" class="img-responsive img-rounded center-block" src="'+posterSrc+'" alt="poster"><br>' +
                      '<div class="form-group">' +
                      '<p align="center"><button type="button" class="btn btn-sm btn-primary" name="edit" onclick="editMovie('+id+')">Edit</button>&nbsp;<button type="button" class="btn btn-sm btn-primary" name="delete" onclick="removeMovie('+id+')">Delete</button></p>' +
                      // '<p align="center"><input type="button" class="btn btn-sm btn-primary" name="edit" value="Edit" onclick="editMovie('+id+')">&nbsp;' +
                      // '<input type="button" class="btn btn-sm btn-primary" value="Delete" onclick="removeMovie('+id+')"></p>' +
                      '</div></div>' +
                      '<div class="col-sm-4 col-md-4 col-lg-4" id="movieInfo">' +
                      '<p><h4>'+title+'</h4></p>' +
                      '<p class="meta" id="movieInfo">' +
                      '<strong>'+d+'</strong></p>' +
                      '<p class="overview" id="movieInfo">'+overview+'</p>'+
                      '<p class="meta" id="movieInfo">' +
                      '<strong>'+studio+'</strong></p>' +
                      '<p class="meta" id="movieInfo">' +
                      '<strong>Budget: $'+price+'</strong><br>' +
                      '</p><br><br></div></div>';

       }

    } // end for

    $("#dbPanel").append(movieInfo);
    $("#navBarBtm").empty();
    $("#navBarBtm").append('<nav class="navbar navbar-inverse navbar-bottom">' +
                          '<div class="container">' +
                          '<ul class="nav navbar-nav">' +
                          '<li class="active"><a href="http://www.mizesolutions.com" target="_blank">Created by Brian Mize</a></li>' +
                          '</ul>' +
                          '</div>' +
                          '</nav>');

  } // end gotData




//========================================================================================================================================
//  EDIT MOVIE
// Gets movie data from Server, returns json, writes to UI to allow edits
//========================================================================================================================================
  function editMovie(id) {

    console.log("editMovie");

    addHide(500);

    var arrdata = [id];

    $.ajax({
      method: "GET",
      dataType: "json",
      url: "getMovie.php",
      data: {'data' : arrdata},
      success: getEdit
    });

  } // end editMovie


  function getEdit(dt) {

    console.log("getEdit");

    $("#navBarBtm").empty();
    $("#navBarBtm").append('<nav class="navbar navbar-inverse navbar-fixed-bottom">' +
                          '<div class="container">' +
                          '<ul class="nav navbar-nav">' +
                          '<li class="active"><a href="http://www.mizesolutions.com" target="_blank">Created by Brian Mize</a></li>' +
                          '</ul>' +
                          '</div>' +
                          '</nav>');

    var psoterSrc = '';

    var line = dt[0];
    var poster = line["POSTER"];
    var overview = line["OVERVIEW"];
    var year = line["YEAR"];
    var title = line["TITLE"];
    var studio = line["STUDIO"];
    var price = line["PRICE"];
    var id = line["ID"];

    if (poster == "null"){
      posterSrc = "./img/noImg.jpg";
    } else {
      posterSrc = "https://image.tmdb.org/t/p/w185";
      posterSrc += poster;
    }

    $("#dbPanel").empty();
    $("#dbPanel").append('<div class="well"><h5>Make any changes you need to make. ' +
                         'Title can not be changed. If this is not the movie you wanted, ' +
                         'please select cancel, and then delete this title from the main page. You can then add the correct one.</h5></div>' +
                         '<div class="row" id="movieInfo">' +
                         '<form action="" name="editForm" id="editForm">' +
                         '<div class="col-sm-2 col-md-2 col-lg-2" id="movieInfo">' +
                         '<img align="center" class="img-responsive img-rounded center-block" src="'+posterSrc+'" alt="poster"><br>' +
                         '<div class="form-group">' +
                         '<p align="center"><button type="submit" class="btn btn-sm btn-primary" name="update" id="editMovieBtn1"><span class="glyphicon glyphicon-ok"></span> Update</button>&nbsp;<button type="submit" class="cancel btn btn-sm btn-success" formnovalidate name="cancel" id="editMovieBtn2" onclick="start()"><span class="glyphicon glyphicon-remove"></span> Cancel</button>' +
                        //  '<p><input type="submit" class="btn btn-sm btn-primary" name="update" value="Update"><input type="submit" class="cancel btn btn-sm btn-success" formnovalidate name="cancel" value="Cancel" onclick="start()"></p>' +
                         '</div><div id="updatePanel"></div></div>' +
                         '<div class="col-sm-8 col-md-8 col-lg-8" id="movieInfo">' +
                         '<label for="title">Title: &nbsp;</label>' +
                         '<input class="form-control" type="text" name="title" id="title" size="40" value="'+title+'" readonly><br>' +
                         '<label for="year">Year: &nbsp;</label>' +
                         '<input class="form-control" type="text" name="year" id="year" size="40" value="'+year+'"><br>' +
                         '<label for="overview">Overview: &nbsp;</label>' +
                         '<input class="form-control" type="textarea" name="overview" id="overview" value="'+overview+'"><br>' +
                         '<label for="studio">Studio: &nbsp;</label>' +
                         '<input class="form-control" type="text" name="studio" id="studio" size="40" value="'+studio+'"><br>' +
                         '<label for="price">Price: &nbsp;</label>' +
                         '<input class="form-control" type="number" name="price" id="price" size="40" value="'+price+'"><br><br>' +
                         '<input type="hidden" id="poster" name="poster" value="'+poster+'">' +
                         '<input type="hidden" id="mid" name="mid" value="'+id+'">' +
                         '</form>' +
                         '</div></div></div>' +
                         '<br>');

    $("#editForm").validate({
      // Specify validation rules
      rules: {
        year: {
          required: true,
          dateISO: true
        },
        overview: {
          required: true,
          minlength: 2
        },
        studio: {
          required: true,
          minlength: 2,
          maxlength: 100
        },
        price: {
          required: true,
          number: true,
          minlength: 1,
          maxlength: 20
        }
      },
      // Specify validation error messages
      messages: {
        year: " Date (yyyy-mm-dd)",
        overview: " Overview at least 2 characters",
        studio: " Studio at least 2 characters",
        price: " Price at least 0"
      },
      submitHandler: function(form) {
        updateDB();
      },
    });

  } // end getEdit


  function updateDB() {
    console.log("updateDB");

    var POSTER = document.getElementById("poster").value;
    var OVERVIEW = document.getElementById("overview").value;
    var YEAR = document.getElementById("year").value;
    var TITLE = document.getElementById("title").value;
    var STUDIO = document.getElementById("studio").value;
    var PRICE = document.getElementById("price").value;
    var ID = document.getElementById("mid").value;
    var arrdata = [POSTER, OVERVIEW, YEAR, TITLE, STUDIO, PRICE, ID];

    $("#editMovieBtn1").attr("disabled", true);
    $('#editMovieBtn1').addClass('disabled');
    $("#editMovieBtn2").attr("disabled", true);
    $('#editMovieBtn2').addClass('disabled');
    $("#updatePanel").append('<br><h4>Updating Movie...</h4>');

    console.log(arrdata);

    $.ajax({
      method: "POST",
      dataType: "json",
      url: "update.php",
      data: {'data' : arrdata},
      success: console.log("Updated"),
      complete: location.reload(true)
    });

  } // end updateDB




//===========================================================================================================================================
// DELETE MOVIE
// Gets movie data from Server, returns json, writes to UI allows removal of movie
//===========================================================================================================================================
  function removeMovie(id) {

    console.log("removeMovie");

    addHide(500);

    var arrdata = [id];

    $.ajax({
      method: "GET",
      dataType: "json",
      url: "getMovie.php",
      data: {'data' : arrdata},
      success: removeConfirm
    });

  } // end removeMovie

  function removeConfirm(dt) {

    console.log("removeConfirm");

    $("#navBarBtm").empty();
    $("#navBarBtm").append('<nav class="navbar navbar-inverse navbar-fixed-bottom">' +
                          '<div class="container">' +
                          '<ul class="nav navbar-nav">' +
                          '<li class="active"><a href="http://www.mizesolutions.com" target="_blank">Created by Brian Mize</a></li>' +
                          '</ul>' +
                          '</div>' +
                          '</nav>');

    var movieData = '';
    var posterSrc = '';

    var line = dt[0];
    var poster = line["POSTER"];
    var overview = line["OVERVIEW"];
    var year = line["YEAR"];
    var title = line["TITLE"];
    var studio = line["STUDIO"];
    var price = line["PRICE"];
    var id = line["ID"];

    var d = formDate(year);

    if (poster == "null"){
      posterSrc = "./img/noImg.jpg";
    } else {
      posterSrc = "https://image.tmdb.org/t/p/w185";
      posterSrc += poster;
    }

    $("#dbPanel").empty();

    movieData += '<div class="well"><h5>' +
                 'Clicking on the Delete button will permanently remove this title from the list. ' +
                 'If this is not what you wish to do, please click Cancel to return to the pain page.</h5></div>' +
                 '<div class="row" id="movieInfo">' +
                 '<div class="col-sm-2 col-md-2 col-lg-2" id="movieInfo">' +
                 '<img align="center" class="img-responsive img-rounded center-block" src="'+posterSrc+'" alt="Movie Poster"><br>' +
                 '<div class="form-group">' +
                 '<p align="center"><button type="button" class="btn btn-info btn-sm btn-danger" name="remove" id="delMovieBtn1" onclick="deleteMovie('+id+')"><span class="glyphicon glyphicon-trash"></span> Delete</button>&nbsp;<button type="button" class="btn btn-info btn-sm btn-success" id="delMovieBtn2" onclick="addReset()"><span class="glyphicon glyphicon-remove"></span> Cancel</button></p>' +
                 '</div><div id="deleteMoviePanel"></div></div>' +
                 '<div class="col-sm-4 col-md-4 col-lg-4" id="movieInfo">' +
                 '<p><h4>'+title+'</h4></p>' +
                 '<p class="meta" id="movieInfo">' +
                 '<span class="release_date" id="movieInfo">' +
                 '<strong>'+d+'</strong>' +
                 '</span></p>' +
                 '<p class="overview" id="movieInfo">'+overview+'</p>'+
                 '<p class="meta" id="movieInfo">' +
                 '<strong>'+studio+'</strong></p>' +
                 '<p class="meta" id="movieInfo">' +
                 '<strong>Budget: $'+price+'</strong>' +
                 '</p></div></div>';

    $("#dbPanel").append(movieData);

  } // end removeConfirm


  function deleteMovie(id) {

    console.log("deleteMovie");

    $("#delMovieBtn1").attr("disabled", true);
    $('#delMovieBtn1').addClass('disabled');
    $("#delMovieBtn2").attr("disabled", true);
    $('#delMovieBtn2').addClass('disabled');
    $("#deleteMoviePanel").append('<br><h4>Deleting Movie...</h4>');

    var arrdata = [id];

    $.ajax({
      method: "POST",
      dataType: "json",
      url: "delete.php",
      data: {'data' : arrdata},
      success: console.log("Removed"),
      complete: location.reload(true)
    });

  } // end remove



//========================================================================================================================================
// ADD MOVIE
// Allows user to search tmdb.org for a movie to add to this DB
//========================================================================================================================================
  function searchMovie() {

    addAnimateView(1, 1);

    $("#addFormLeft").empty();
    $("#addFormLeft").append('<h5>Please enter a few letters or a full title to search for and click Search.<br><br></h5>' +
                             '<div class="form-group">' +
                             '<form action="" name="searchForm" id="searchForm">' +
                             '<input class="form-control" type="text" name="title" id="title" placeholder="Title goes here..."/>' +
                             '<p><button type="submit" class="btn btn-info btn-sm btn-primary"><span class="glyphicon glyphicon-search"></span> Search</button></p>' +
                             '</form>' +
                             '<button type="button" class="btn btn-info btn-sm btn-success" onclick="addReset()"><span class="glyphicon glyphicon-remove"></span> Cancel</button></div>');

    $("#searchForm").validate({
      // Specify validation rules
      rules: {
        title: {
          required: false,
          minlength: 1,
          maxlength: 100
        }
      },
      // Specify validation error messages
      messages: {
        title: "  Title: 1 - 100 characters"
      },
      submitHandler: function(form) {
        searchResults();
      },
    });
  }

  function searchResults() {

    var title = document.getElementById("title").value;

    var httpString = "https://api.themoviedb.org/3/search/movie?query=";
    httpString += title;
    httpString += "&language=en-US&api_key=6daa32042b6b68aa55beeeb9a9d599a7";

    $.ajax({
      cache: false,
      method: "GET",
      dataType: "json",
      url: httpString,
      success: confirmSearch
    });
  }


  function confirmSearch(json){

    console.log("confirmSearch");

    $("#addFormRight").empty();
    var tmdb = json["results"];
    var dataResults = '<h5>Please select a title from the list below and click Add This. If your title is not on the list, refine your search and try again.<br></h5>' +
                      '<div class="form-group"><select class="form-control" name="selectForm" id="selectForm">' +
                      '<label for="blank"></label>';

    for (i = 0; i < tmdb.length; i++) {
      var rec = tmdb[i];
      var release_date = rec["release_date"];
      var title = rec["title"];
      var id = rec["id"];

      var d = formDate(release_date);

      dataResults += '<option value="';
      dataResults += id;
      dataResults += '">';
      dataResults += title;
      dataResults += ', ';
      dataResults += d;
      dataResults += '</option>';

    }
      dataResults += '</select>';

      if(!id == ''){
        dataResults += '<button type="button" class="btn btn-info btn-sm btn-primary" onclick="confirmSet()"><span class="glyphicon glyphicon-plus"></span> Add This</button>';
      }

      dataResults += '</div>';

      $("#addFormRight").append(dataResults);

  }

  function confirmSet() {

    var id = document.getElementById("selectForm").value;

    var httpString = "https://api.themoviedb.org/3/movie/";
    httpString += id;
    httpString += "?api_key=6daa32042b6b68aa55beeeb9a9d599a7&language=en-US";

    $.ajax({
      cache: false,
      method: "GET",
      dataType: "json",
      url: httpString,
      success: addMovie
    });
  }


  function addMovie(json) {

    console.log("addMoive");

    var studio = 'No Studio';
    var summary = '';

    var rec = json;
    var poster_path = rec["poster_path"];
    var release_date = rec["release_date"];
    var title = rec["title"];
    var prod = rec["production_companies"];
    var co = prod[0];
    if (!prod.length == 0) {
      studio = co["name"];
    }
    var budget = rec["budget"];
    var overview = rec["overview"];

    if (overview == null) {
      summary = 'No summary';
    } else {
      summary = overview.replace(/\"/g, '');
    }

    $("#addFormLeft").empty();
    $("#addFormLeft").append('<div class="form-group"><form action="" name="addForm" id="addForm">' +
                             '<label for="title">Title: &nbsp;</label>' +
                             '<input class="form-control" type="text" name="title" id="title" size="40" value="'+ title +'" readonly /><br>' +
                             '<label for="year">Year: &nbsp;</label>' +
                             '<input class="form-control" type="date" name="year" id="year" size="40" value="'+ release_date +'" readonly /><br>' +
                             '<label for="studio">Studio: &nbsp;</label>' +
                             '<input class="form-control" type="text" name="studio" id="studio" size="40" value="'+ studio +'" /><br>' +
                             '<label for="price">Price: &nbsp;</label>' +
                             '<input class="form-control" type="number" name="price" id="price" size="40" value="'+ budget +'" />'+
                             '<input type="hidden" id="poster_path" name="poster_path" value="'+ poster_path +'">' +
                             '<input type="hidden" id="overview" name="overview" value="'+ summary +'">' +
                             '<input type="hidden" id="year" name="year" value="'+ release_date +'">' +
                             '<br><p><button type="submit" class="btn btn-info btn-sm btn-primary" name="addMovie" id="addMovieBtn1"><span class="glyphicon glyphicon-ok"></span> Add</button></p>' +
                             '</form>' +
                             '<button type="button" class="btn btn-info btn-sm btn-success" id="addMovieBtn2" onclick="addReset()"><span class="glyphicon glyphicon-remove"></span> Cancel</button></div>' );



      // #title  #addForm
      $("#addForm").validate({
        // Specify validation rules
        rules: {
          studio: {
            required: true,
            minlength: 2,
            maxlength: 100
          },
          price: {
            required: true,
            number: true,
            minlength: 1,
            maxlength: 20
          }
        },
        // Specify validation error messages
        messages: {
          studio: " Studio: 2 - 100 characters",
          price: " Price at least 0"
        },
        submitHandler: function(form) {
          addUpdate();
        },
      });

  } // end addMovie


  function addUpdate(){

    console.log("addUpdate");

    var POSTER = document.getElementById("poster_path").value;
    var OVERVIEW = document.getElementById("overview").value;
    var YEAR = document.getElementById("year").value;
    var TITLE = document.getElementById("title").value;
    var STUDIO = document.getElementById("studio").value;
    var PRICE = document.getElementById("price").value;
    var arrdata = [POSTER, OVERVIEW, YEAR, TITLE, STUDIO, PRICE];

    $("#addingPanel").show();
    $("#addMovieBtn1").attr("disabled", true);
    $('#addMovieBtn1').addClass('disabled');
    $("#addMovieBtn2").attr("disabled", true);
    $('#addMovieBtn2').addClass('disabled');

    console.log(arrdata);

    $.ajax({
      method: "POST",
      dataType: "json",
      url: "add.php",
      data: {'data' : arrdata},
      success: console.log("Added"),
      complete: location.reload(true)
    });

  } // end addUpdate



//========================================================================================================================================
//  Helper Functions
//========================================================================================================================================
  function formDate(date){

    var mn = date.substring(5, 7);
    var dy = date.substring(8);
    var yr = date.substring(0, 4);

    return mn += "/" + dy + "/" + yr;

  } // end formDate

  function resetPage(){

    console.log("resetPage");

    location.reload(true);

  } // end reset

  function addReset(){

    console.log("addReset");
    addHide(1000);

    location.reload(true);

  } // end reset


  function aniStart(s) {

    console.log("aniApprAll");

    $("#addPanel1").hide();
    $("#panel1").hide();
    $("#addingPanel").hide();

    $("#panel0").fadeIn(s);
    $("#dbPanel").fadeIn(s);
    $("#navBarBtm").fadeIn(s);
    $("#panel1").fadeIn(s);

  } // end aniApprAll


  function addAnimateView(s1, s2) {

    console.log("addAnimateView");

    $("#addPanel1").slideDown(s2).fadeIn(s2);
    $("#addFormPanel").slideDown(s2).fadeIn(s2);
    $("#addFormLeft").slideDown(s2).fadeIn(s2);
    $("#addFormRight").slideDown(s2).fadeIn(s2);


  } // end addAnimateView


  function addHide(s) {

    console.log("addHide");

    $("#addPanel1").slideUp(s);
    $("#panel1").slideUp(s);
    $("#addFormPanel").slideUp(s);

  } // end addHide

$(document).ready(start);

  function start() {

    console.log("Start");

    $.ajax({
      cache: false,
      type: "GET",
      dataType: "json",
      url: "getList.php",
      success: gotData
    });

    $("#addBtnPanel").empty();
    document.getElementById("addBtnPanel").innerHTML ='<input type="button" id="addBtn" value="Add" >';

    $("#addBtn").on("click", addMovie);

    aniApprAll(500);

  } // end start

  function gotData(dt) {

    console.log("Got Data");
    var tableText = '';

    $("#dbTitle").empty();
    $("#dbTitle").append("Movie Database:");

    $("#dbPanel").empty();

    for (i = 0; i < dt.length; i ++) {
       line = dt[i];
       title = line["TITLE"];

      //  $("#dbPanel").append('<div class="row" id="movieInfo">');

       var httpString = "https://api.themoviedb.org/3/search/movie?query=";
       httpString += title;
       httpString += "&language=en-US&api_key=6daa32042b6b68aa55beeeb9a9d599a7";

       $.ajax({
         cache: false,
         type: "GET",
         dataType: "json",
         url: httpString,
         success: movieData
       });

      //  $("#dbPanel").append('</div>');

    } // end for

  } // end gotData

  function movieData(json) {

    console.log(json);

    var tmdb = json["results"];
    var rec = tmdb[0];
    var poster_path = rec["poster_path"];
    var src = "https://image.tmdb.org/t/p/w185";
    src += poster_path;
    var overview = rec["overview"];
    var release_date = rec["release_date"];
    var mtitle = rec["title"];

    var d = formDate(release_date);


    $("#dbPanel").append('<div class="row" id="movieInfo">');


    $("#dbPanel").append('<div class="col-sm-2 col-md-2 col-lg-2" id="movieInfo">' +
                         '<img id="movieInfo" src="'+src+'">' +
                         '</div>' +
                         '<div class="col-sm-4 col-md-4 col-lg-4" id="movieInfo">' +
                         '<p><h4>'+mtitle+'</h4></p>' +
                         '<p class="meta" id="movieInfo">' +
                         '<span class="release_date" id="movieInfo">' +
                         '<strong>'+d+'</strong>' +
                         '</span>' +
                         '<p class="overview" id="movieInfo">'+overview+'</p>'+
                         '</div>');


    $("#dbPanel").append('</div>');

  }

  function formDate(date){

    console.log("formDate: " + date);

    var mn = date.substring(5, 7);
    var dy = date.substring(8);
    var yr = date.substring(0, 4);

    return mn += "/" + dy + "/" + yr;

  } // end formDate


  function editMovie(id) {

    console.log("editMovie");

    addHide(500);

    var arrdata = [id];

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "editMovie.php",
      data: {'data' : arrdata},
      success: getEdit
    });

  } // end editMovie


  function getEdit(dt) {

    console.log("getEdit");

    var line1 = dt[0];
    var title = line1["TITLE"];
    var id = line1["ID"];

    $("#dbTitle").empty();
    $("#dbTitle").append("Edit Movie:");

    $("#dbPanel").empty();
    document.getElementById("dbPanel").innerHTML ='<form action="" name="editForm" id="editForm">' +
                                                    '<label for="etitle">Title: &nbsp;</label>' +
                                                    '<input type="text" name="etitle" id="etitle" size="40" value="' + title + '"><br>' +
                                                    '<input type="submit" name="update" value="Update">'+
                                                    '</form>'+
                                                    '<input type="button" value="Cancel" onclick="reset()">' +
                                                    '<input type="hidden" id="eid" name="eid" value="'+ id +'">';

    $("#editForm").validate({
      // Specify validation rules
      rules: {
        etitle: {
          required: true,
          minlength: 2,
          maxlength: 40
        }
      },
      // Specify validation error messages
      messages: {
        etitle: " Please enter a movie title at least 2 characters long",
      },
      submitHandler: function(form) {
        updateDB();
      },
    });

  } // end getEdit


  function updateDB() {
    console.log("updateDB");

    var TITLE = document.getElementById("etitle").value;
    var ID = document.getElementById("eid").value;
    var arrdata = [TITLE,ID];

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "update.php",
      data: {'data' : arrdata},
      success: location.reload()
    });

  } // end updateDB


  function removeMovie(id) {

    console.log("removeMovie");

    addHide(500);

    var arrdata = [id];

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "deleteConfirm.php",
      data: {'data' : arrdata},
      success: removeConfirm
    });

  } // end removeMovie


  function removeConfirm(dt) {

    console.log("removeConfirm");

    var tableText = '';

    var line1 = dt[0];
    var title = line1["TITLE"];
    var year = line1["YEAR"];
    var studio = line1["STUDIO"];
    var price = line1["PRICE"];
    var id = line1["ID"];

    var d = formDate(year);

    $("#dbTitle").empty();
    $("#dbTitle").append("Confirm Delete Movie:");

    $("#dbPanel").empty();   //document.getElementById("dbPanel").innerHTML

    tableText += '<table class="table-striped table-condensed">' +
                 '<tr><td align="right"><strong>Title: &nbsp;</strong></td><td>' + title + '</td></tr>'+
                 '<tr><td align="right"><strong>Release Date: &nbsp;</strong></td><td>' + d + '</td></tr>'+
                 '<tr><td align="right"><strong>Studio: &nbsp;</strong></td><td>'+ studio + '</td></tr>'+
                 '<tr><td align="right"><strong>Price: &nbsp;</strong></td><td>'+ price + '</td></tr>' +
                 '<tr><td><input type="button" value="Delete" onclick="remove('+ id +')"></td>'+
                 '<td><input type="button" value="Cancel" onclick="reset()"></td></tr></table>';

    $("#dbPanel").append(tableText);

  } // end removeConfirm


  function remove(id) {

    console.log("remove");

    var arrdata = [id];

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "delete.php",
      data: {'data' : arrdata},
      success: location.reload()
    });

  } // end remove


  function addMovie(){

    console.log("addMovie");

    addAnimateView(250, 500);

    $("#addPanel").empty();
    document.getElementById("addPanel").innerHTML = '<form action="" name="addForm" id="addForm">' +
                                                    '<label for="title">Title: &nbsp;</label>' +
                                                    '<input type="text" name="title" id="title" size="40" placeholder="Title goes here..."/><br>' +
                                                    '<input type="submit" name="add" value="Add"><br>' +
                                                    '</form>' +
                                                    '<input type="button" value="Cancel" onclick="reset()">';

    $("#addForm").validate({
      // Specify validation rules
      rules: {
        title: {
          required: true,
          minlength: 2,
          maxlength: 40
        }
      },
      // Specify validation error messages
      messages: {
        title: " Title: 2 - 40 characters long",
      },
      submitHandler: function(form) {
        addUpdate();
      },
    });

  } // end addMovie


  function addUpdate(){

    console.log("addUpdate");

    var TITLE = document.getElementById("title").value;

    var arrdata = [TITLE];

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "add.php",
      data: {'data' : arrdata},
      success: location.reload()
    });

  } // end addUpdate


  function reset(){

    console.log("reset");

    location.reload()

  } // end reset


  function hideAll(){

    console.log("hideAll");

    $("#panel0").hide();
    $("#dbTitle").hide();
    $("#dbPanel").hide();
    $("#panel1").hide();
    $("#addPanel").hide();
    $("#addBtnPanel").hide();

  } // end hideAll

  function aniApprAll(s) {

    console.log("aniApprAll");

    $("#panel0").slideDown(s);
    $("#dbTitle").fadeIn(s);
    $("#dbPanel").slideDown(s);
    $("#panel1").slideDown(s);
    $("#addBtnPanel").slideDown(s);

  } // end aniApprAll


  function addAnimateView(s1, s2) {

    console.log("addAnimateView");

    $("#panel0").slideUp(s1);
    $("#addBtnPanel").slideUp(s1);
    $("#addPanel").slideDown(s2).fadeIn(s2);

  } // end addAnimateView


  function addAnimateHide(s1, s2) {

    console.log("addAnimateHide");

    $("#panel0").slideDown(s2);
    $("#addBtnPanel").slideDown(s2);
    $("#addPanel").slideUp(s1).fadeOut(s1);
    $("#addPanel").empty();
    $("#dbPanel").empty();

    start();

  } // end addAnimateHide


  function addView(s) {

    console.log("addView");

    $("#panel1").slideDown(s);

  } // end addView


  function addHide(s) {

    console.log("addHide");

    $("#addPanel").slideUp(s);
    $("#panel1").slideUp(s);

  } // end addHide

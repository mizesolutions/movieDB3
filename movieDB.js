$(document).ready(start);

  function start() {

    //$.get ("getList.php", gotData, "json");

    $.ajax({
      cache: false,
      type: "GET",
      dataType: "json",
      url: "getList.php",
      success: gotData
    });

    $("#addBtnPanel").empty();
    $("#addBtnPanel").append('<tr><td><input type="button" value="Add" onclick="addMovie()"></td></tr>');

    aniApprAll(500);

  } // end start

  function gotData(dt) {

    $("#dbTitle").empty();
    $("#dbTitle").append("Movie Database:");

    $("#dbPanel").empty();
    $("#dbPanel").append('<tr>'+
                            '<td align="left"><strong><u>Title</u>&nbsp;&nbsp;</strong></th>'+
                            '<td align="left"><strong><u>Release Date</u>&nbsp;&nbsp;</strong></th>'+
                            '<td align="left"><strong><u>Studio</u>&nbsp;&nbsp;</strong></th>'+
                            '<td align="right"><strong><u>Price</u>&nbsp;&nbsp;</strong></th>'+
                            '</tr>');

    for (i = 0; i < dt.length; i ++) {
      line = dt[i];
      title = line["TITLE"];
      year = line["YEAR"];
      studio = line["STUDIO"];
      price = line["PRICE"];
      id = line["ID"];

      $("#dbPanel").append('<tr><td>' + title +
                          '</td><td>' + year +
                          '</td><td>' + studio +
                          '</td><td align="right">' + price +
                          '<td><input type="button" name="edit" value="Edit" onclick="editMovie('+ id +')"></td>'+
                          '<td><input type="button" value="Delete" onclick="removeMovie('+ id +')"></td></tr>');

    } // end for

  } // end gotData


  function editMovie(id) {

    addHide(500);

    var arrdata = [id];

    $.ajax({
      cache: false,
      type: "POST",
      dataType: "json",
      url: "editMovie.php",
      data: {'data' : arrdata},
      success: getEdit
    });

  } // end editMovie


  function getEdit(dt) {

    var line1 = dt[0];
    var title = line1["TITLE"];
    var year = line1["YEAR"];
    var studio = line1["STUDIO"];
    var price = line1["PRICE"];
    var id = line1["ID"];

    $("#dbTitle").empty();
    $("#dbTitle").append("Edit Movie:");

    $("#dbPanel").empty();
    $("#dbPanel").append('<tr><td align="right"><strong>Title: </strong></td><td><input type="text" id="title" maxlength="40" size="40" name="TITLE" value="' + title + '"></td></tr>'+
                           '<tr><td align="right"><strong>Release Date: </strong></td><td><input type="date" id="year" size="40" name="YEAR" value="' + year + '"></td></tr>'+
                           '<tr><td align="right"><strong>Studio: </strong></td><td><input type="text" id="studio" maxlength="40" size="40" name="STUDIO" value="'+ studio + '"></td></tr>'+
                           '<tr><td align="right"><strong>Price: </strong></td><td><input type="text" id="price" maxlength="20" size="40" name="PRICE" value="'+ price + '"></td></tr>' +
                           '<input type="hidden" id="id" name="ID" value="'+ id +'">'+
                           '<tr><td>&nbsp;</td></tr>'+
                           '<tr><td><input type="button" value="Update" onclick="updateDB()"></td>'+
                           '<td><input type="button" value="Cancel" onclick="start()"></td></tr>');

  } // end getEdit


  function updateDB() {

    var TITLE = document.getElementById("title").value;
    var YEAR = document.getElementById("year").value;
    var STUDIO = document.getElementById("studio").value;
    var PRICE = document.getElementById("price").value;
    var ID = document.getElementById("id").value;
    var arrdata = [TITLE, YEAR, STUDIO, PRICE, ID];

    $.ajax({
      cache: false,
      type: "POST",
      dataType: "json",
      url: "update.php",
      data: {'data' : arrdata},
      success: location.reload()
    });

  } // end updateDB

  function removeMovie(id) {

    addHide(500);

    var arrdata = [id];

    $.ajax({
      cache: false,
      type: "POST",
      dataType: "json",
      url: "deleteConfirm.php",
      data: {'data' : arrdata},
      success: removeConfirm
    });

  } // end removeMovie

  function removeConfirm(dt) {

    var line1 = dt[0];
    var title = line1["TITLE"];
    var year = line1["YEAR"];
    var studio = line1["STUDIO"];
    var price = line1["PRICE"];
    var id = line1["ID"];

    $("#dbTitle").empty();
    $("#dbTitle").append("Confirm Delete Movie:");

    $("#dbPanel").empty();
    $("#dbPanel").append('<tr><span><strong>&nbps;Confirm Delete Movie: </strong></span></tr>'+
                           '<tr><td>Title: </td><td>' + title + '</td></tr>'+
                           '<tr><td>Release Date: </td><td>' + year + '</td></tr>'+
                           '<tr><td>Studio: </td><td>'+ studio + '</td></tr>'+
                           '<tr><td>Price: </td><td>'+ price + '</td></tr>' +
                           '<input type="hidden" id="id" name="ID" value="'+ id +'">'+
                           '<tr><td>&nbsp;</td></tr>'+
                           '<tr><td><input type="button" value="Delete" onclick="remove('+ id +')"></td>'+
                           '<td><input type="button" value="Cancel" onclick="start()"></td></tr>');

  } // end removeConfirm

  function remove(id) {

    var arrdata = [id];

    $.ajax({
      cache: false,
      type: "POST",
      dataType: "json",
      url: "delete.php",
      data: {'data' : arrdata},
      success: location.reload()
    });

  } // end remove


  function addMovie(){

    addAnimateView(250, 500);

    $("#addPanel").empty();
    $("#addPanel").append('<tr><td align="right"><strong>Title: </strong></td><td><input type="text" id="title" maxlength="40" size="40" name="TITLE" placeholder="Roundhay Garden Scene" required></td></tr>'+
                           '<tr><td align="right"><strong>Release Date: </strong></td><td><input type="date" id="year"size="40"name="YEAR" placeholder="yyyy-mm-dd" required></td></tr>'+
                           '<tr><td align="right"><strong>Studio: </strong></td><td><input type="text" id="studio" maxlength="40" size="40" name="STUDIO" placeholder="Louis Le Prince Production" required></td></tr>'+
                           '<tr><td align="right"><strong>Price: </strong></td><td><input type="text" id="price" maxlength="20"size="40" name="PRICE" placeholder="100000.00" required></td></tr>' +
                           '<tr><td>&nbsp;</td></tr>'+
                           '<tr><td><input type="button" value="Update" onclick="addUpdate()"></td>'+
                           '<td><input type="button" value="Cancel" onclick="addAnimateHide(250, 500)"></td></tr>');

  } // end addMovie


  function addUpdate(){

    var TITLE = document.getElementById("title").value;
    var YEAR = document.getElementById("year").value;
    var STUDIO = document.getElementById("studio").value;
    var PRICE = document.getElementById("price").value;
    var arrdata = [TITLE, YEAR, STUDIO, PRICE];

    $.ajax({
      cache: false,
      type: "POST",
      dataType: "json",
      url: "add.php",
      data: {'data' : arrdata},
      success: location.reload()
    });

  } // end addUpdate


  function hideAll(){

    $("#panel0").hide();
    $("#dbTitle").hide();
    $("#dbPanel").hide();
    $("#panel1").hide();
    $("#addPanel").hide();
    $("#addBtnPanel").hide();

  } // end hideAll

  function aniApprAll(s) {

    $("#panel0").slideDown(s);
    $("#dbTitle").fadeIn(s);
    $("#dbPanel").slideDown(s);
    $("#panel1").slideDown(s);
    $("#addBtnPanel").slideDown(s);

  } // end aniApprAll


  function addAnimateView(s1, s2) {

    $("#panel0").slideUp(s1);
    $("#addBtnPanel").slideUp(s1);
    $("#addPanel").slideDown(s2).fadeIn(s2);

  } // end addAnimateView


  function addAnimateHide(s1, s2) {

    $("#panel0").slideDown(s2);
    $("#addBtnPanel").slideDown(s2);
    $("#addPanel").slideUp(s1).fadeOut(s1);

  } // end addAnimateHide


  function addView(s) {

    $("#panel1").slideDown(s);

  } // end addView


  function addHide(s) {

    $("#addPanel").slideUp(s);
    $("#panel1").slideUp(s);

  } // end addHide

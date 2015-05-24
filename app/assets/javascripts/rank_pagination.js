$(document).ready(function(){

  if ( $("#RankingTitle").length != 0 ){
    page = 1;
    pokemonMax = $("#pokemonMax").text();
    badgeMax = $("#badgeMax").text();
    pageMax = $("#goToLastPageRank").attr('value') == 0;
    navigationButtonsRankUpdate();

    ////////////////////////////Navigation buttons///////////////////////////////
    //Going on previous page
    $("#goToFirstPageRank").click(function(){
      if (page > 1){
        page = 1; getRankByPage(page-1);
        navigationButtonsRankUpdate();
      }
    });

    //Going on previous page
    $("#goToPrevPageRank").click(function(){
      if (page > 1){
        page--; getRankByPage(page-1);
        navigationButtonsRankUpdate();
      }
    });

    //Going on next page
    $("#goToNextPageRank").click(function(){
      if (page < pageMax){
        page++; getRankByPage(page-1);
        navigationButtonsRankUpdate();
      }
    });

    //Going on previous page
    $("#goToLastPageRank").click(function(){
      if (page < pageMax){
        page = pageMax; getRankByPage(page-1);
        navigationButtonsRankUpdate();
      }
    });
  }
});

//Going on page n°X
function goToPageRank(numPage){
  page = numPage; 
  getRankByPage(page-1);
  navigationButtonsRankUpdate();
};


//Disable/Enable navigation buttons + Create nav buttons depending on actual page number
function navigationButtonsRankUpdate(){
  if ( page == 1 ){
    $("#goToFirstPageRank").attr("disabled","disabled");
    $("#goToPrevPageRank").attr("disabled","disabled");
    $("#goToLastPageRank").removeAttr("disabled");
    $("#goToNextPageRank").removeAttr("disabled");
  } else if ( page == pageMax ){
    $("#goToFirstPageRank").removeAttr("disabled");
    $("#goToPrevPageRank").removeAttr("disabled");
    $("#goToLastPageRank").attr("disabled","disabled");
    $("#goToNextPageRank").attr("disabled","disabled");
  } else {
    $("#goToFirstPageRank").removeAttr("disabled");
    $("#goToPrevPageRank").removeAttr("disabled");
    $("#goToLastPageRank").removeAttr("disabled");
    $("#goToNextPageRank").removeAttr("disabled");
  }

  //Remove buttons
  $("#navButtonsRank").html("");

  //Add buttons
  for (var i = page-1; i > (page - 3) && i > 0; i--){
    $("#navButtonsRank").prepend("<li class='goToPage' onclick='goToPageRank("+i+")'><a>"+i+"</a></li>");
  }
  $("#navButtonsRank").append("<li class='goToPage activeNavButton'><a>"+ page +"</a></li>");
  for (var i = page+1; i < (page + 3) && i <= pageMax; i++){
    $("#navButtonsRank").append("<li class='goToPage' onclick='goToPageRank("+i+")'><a>"+i+"</a></li>");
  }

  $("#rankPageSelect").val(page);
}


//Get Pokemon, depending on page's number (by 12)
function getRankByPage(numberPage){
  $.ajax({
     url: "/ranks/getRankByPage/"+numberPage,
     type: 'GET',
     dataType: 'json',
     success: function (data) {
      //Get pkmnList <div>
      rankList = $("#rankList");

      //Removing actual shown Pokemon
      rankList.html("");

        for ( var i = 0; i < data["ranks"].length; i++){
          rankList.append("<tr><td>"+ data["ranks"][i]["position"] +"</td><td>" + data["ranks"][i]["login"] + "</td><td>" + data["ranks"][i]["pokemon_caught"] + " / " + pokemonMax + "</td><td>" + data["ranks"][i]["pokemon_viewed"] + " / " + pokemonMax + "</td><td>" + data["ranks"][i]["badges_count"] + " / " + badgeMax + "</td><td>" + data["ranks"][i]["total_points"] + "</td></tr>");
        }
     },
     error : function (){
      alert('An error occured during the operation. Please, try again later.');
     }
 });
}

$(document).ready(function(){
  if ( $("#MegabookedexTitle").length != 0 ){
    //Definition of page number
    page = 1;
    pageMax = 60;
    maxPokemon = parseInt($("#hid_maxPokemon").text());
      $("#hid_maxPokemon").remove();  
    navigationButtonsUpdate();
    updatePokemonProgressBarAndRankingData(
      $("#pkmnCaught").text(),
      $("#pkmnSeen").text()
    )

    //Definition of Mustache's template
    $.Mustache.load('./assets/templates.htm');

    ////////////////////////////Navigation buttons///////////////////////////////
    //Going on previous page
    $("#goToFirstPage").click(function(){
      if (page > 1){
        page = 1; getPokemonByPage(page);
        navigationButtonsUpdate();
      }
    });

    //Going on previous page
    $("#goToPrevPage").click(function(){
      if (page > 1){
        page--; getPokemonByPage(page);
        navigationButtonsUpdate();
      }
    });

    //Going on next page
    $("#goToNextPage").click(function(){
      if (page < pageMax){
        page++; getPokemonByPage(page);
        navigationButtonsUpdate();
      }
    });

    //Going on previous page
    $("#goToLastPage").click(function(){
      if (page < pageMax){
        page = pageMax; getPokemonByPage(page);
        navigationButtonsUpdate();
      }
    });
  }
});

//Going on page n°X
function goToPage(numPage){
  page = numPage; 
  getPokemonByPage(page);
  navigationButtonsUpdate();
};


//Disable/Enable navigation buttons + Create nav buttons depending on actual page number
function navigationButtonsUpdate(){
  if ( page == 1 ){
    $("#goToFirstPage").attr("disabled","disabled");
    $("#goToPrevPage").attr("disabled","disabled");
    $("#goToLastPage").removeAttr("disabled");
    $("#goToNextPage").removeAttr("disabled");
  } else if ( page == pageMax ){
    $("#goToFirstPage").removeAttr("disabled");
    $("#goToPrevPage").removeAttr("disabled");
    $("#goToLastPage").attr("disabled","disabled");
    $("#goToNextPage").attr("disabled","disabled");
  } else {
    $("#goToFirstPage").removeAttr("disabled");
    $("#goToPrevPage").removeAttr("disabled");
    $("#goToLastPage").removeAttr("disabled");
    $("#goToNextPage").removeAttr("disabled");
  }

  //Remove buttons
  $("#navButtons").html("");

  //Add buttons
  for (var i = page-1; i > (page - 3) && i > 0; i--){
    $("#navButtons").prepend("<li class='goToPage' onclick='goToPage("+i+")'><a>"+i+"</a></li>");
  }
  $("#navButtons").append("<li class='goToPage activeNavButton'><a>"+ page +"</a></li>");
  for (var i = page+1; i < (page + 3) && i <= pageMax; i++){
    $("#navButtons").append("<li class='goToPage' onclick='goToPage("+i+")'><a>"+i+"</a></li>");
  }
}


//Managing progression-bar and ranking's data
function updatePokemonProgressBarAndRankingData(countPkmnCaught, countPkmnSeen){
  
  //Update progress bar depending on caught/seen percentages
  prctCaught = ((countPkmnCaught * 100)/ maxPokemon);
  prctSeen = (((countPkmnSeen - countPkmnCaught) * 100) / maxPokemon)
  $("#pkmnProgressBarCaught").css("width", prctCaught+"%");
  $("#pkmnProgressBarSeen").css("width", prctSeen+"%");

  if ( prctCaught > 7 ){ $("#totalPrctCaught").show();} 
  else { $("#totalPrctCaught").hide();}
  if ( prctSeen > 7 ){ $("#totalPrctSeen").show();} 
  else { $("#totalPrctSeen").hide();}


  //Update ranking's data
  $("#pkmnCaught").text(countPkmnCaught)
  $("#pkmnSeen").text(countPkmnSeen)
  $("#trainerPoints").text(
    parseInt(countPkmnCaught) * parseInt(countPkmnSeen) * (parseInt($("#badgeObtained").text()) + 1))
} 


//Changing state of a Pokemon's hunt
function changeStateOfPokemon(numPkmn, state){
	$.ajax({
     url: "/pokemons/changeStateOfPokemon/"+numPkmn+"?state="+state,
     type: 'GET',
     dataType: 'json',
     success: function (data) {
     	changeColorStatePokemon(numPkmn, state);
      updatePokemonProgressBarAndRankingData(data.caught, data.view)
     },
     error : function (){
     	alert('An error occured during the operation. Please, try again later.');
     }
   });
}

//Changing color of Pokemon's buttons depending on his huntstate
function changeColorStatePokemon(numPkmn, state){
  pokemonRow = $("#pkmnRow"+numPkmn);
  pokemonBtnState = pokemonRow.find(".btnState");

  if ( state == "None"){
    pokemonBtnState.text("None ").append("<span class='caret'></span>");
    pokemonBtnState.removeClass("btn-info");
    pokemonBtnState.removeClass("btn-warning");
    pokemonBtnState.addClass("btn-danger");
    pokemonRow.find(".removeHuntButton").hide();
    pokemonRow.find(".addSeenHuntButton").show();
    pokemonRow.find(".addCaughtHuntButton").show();

  } else if ( state == "Seen" ) {
    pokemonBtnState.text("Seen ").append("<span class='caret'></span>");
    pokemonBtnState.removeClass("btn-danger");
    pokemonBtnState.removeClass("btn-info");
    pokemonBtnState.addClass("btn-warning");
    pokemonRow.find(".removeHuntButton").show();
    pokemonRow.find(".addSeenHuntButton").hide();
    pokemonRow.find(".addCaughtHuntButton").show();

  } else {
    pokemonBtnState.text("Caught ").append("<span class='caret'></span>");
    pokemonBtnState.removeClass("btn-danger");
    pokemonBtnState.removeClass("btn-warning");
    pokemonBtnState.addClass("btn-info");
    pokemonRow.find(".removeHuntButton").show();
    pokemonRow.find(".addSeenHuntButton").show();
    pokemonRow.find(".addCaughtHuntButton").hide();
  }
}


//Get Pokemon, depending on page's number (by 12)
function getPokemonByPage(numberPage){
  $.ajax({
     url: "/pokemons/getPokemonByPage/"+numberPage,
     type: 'GET',
     dataType: 'json',
     success: function (data) {
      //Get pkmnList <div>
      pkmnList = $("#pkmnList");

      //Removing actual shown Pokemon
      pkmnList.html("");

        for ( var i = 0; i < data["pokemons"].length; i++){
          data["pokemons"][i]["state"] = returnHuntstateofPokemon(
            data["pokemons"][i]["number"], data["pokemonTrainer"]
          );

          pkmnList.mustache('pokemonTemplate', data["pokemons"][i], { method: 'append' });
          changeColorStatePokemon(data["pokemons"][i]["number"], data["pokemons"][i]["state"]);
        }
     },
     error : function (){
      alert('An error occured during the operation. Please, try again later.');
     }
 });
}

//Return hunt's state of a Pokemon 
function returnHuntstateofPokemon(numPokemon, listePkmnTrainer){
  state = "None";
  PkmnList = jQuery.grep(listePkmnTrainer, function(n) {
    return ( n["number"] == numPokemon);
  });

  if ( PkmnList.length > 0 ){
    state = ( PkmnList[0]["caught"] == "1")? "Caught" : "Seen";
  } 
  return state;
}


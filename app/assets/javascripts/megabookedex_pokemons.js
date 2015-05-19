$(document).ready(function(){
	//Definition of page number
	var page = 1;
	var pageMax = 60;
  navigationButtonsUpdate();


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
});


//Going on page n°X
function goToPage(numPage){
  page = numPage; 
  getPokemonByPage(page);
  navigationButtonsUpdate();
};


function navigationButtonsUpdate(){
  //Disable/Enable navigation buttons (First/)
  if ( page == 1){
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
    $("#navButtons").prepend("<button class='goToPage' onclick='goToPage("+i+")'>"+i+"</button>");
  }
  $("#navButtons").append("<button class='goToPage activeNavButton'>"+ page +"</button>");
  for (var i = page+1; i < (page + 3) && i <= pageMax; i++){
    $("#navButtons").append("<button class='goToPage' onclick='goToPage("+i+")'>"+i+"</button>");
  }
}


//Get Pokemon, depending on page's number (by 10)
function getPokemonByPage(numberPage){
	$.ajax({
       url: "/pokemons/getPokemonByPage/"+numberPage,
       type: 'GET',
       dataType: 'json',
       success: function (data) {
       		var plop = "";
       		for ( var i = 0; i < data["pokemons"].length; i++){
       			plop += data["pokemons"][i].name;
       		}
       		$("#resultsPKMN").text(plop);

       		plop = "";
       		for ( var i = 0; i < data["pokemonTrainer"].length; i++){
       			plop += data["pokemonTrainer"][i].name + data["pokemonTrainer"][i].state;
       		}
       		$("#resultsPKMNTrainer").text(plop);

       	/*
       	 //Managing display of row's buttons and informations
       	 badgeRow = $("#badgeRow"+idBadge);
		 badgeRow.find(".badgeObtainedColumn").text("No");
		 badgeRow.find(".removeBadgeButton").hide();
		 badgeRow.find(".addBadgeButton").show();

		 //Managing progression-bar 
		 updateBadgeProgressBar(data["total"], data["trainerNbr"]);
        */
       },
       error : function (){
       	alert('An error occured during the operation. Please, try again later.');
       }
   });
}


//Changing state of a Pokemon's hunt
function changeStateOfPokemon(numPkmn, state){
	$.ajax({
       url: "/pokemons/changeStateOfPokemon/"+numPkmn+"?state="+state,
       type: 'GET',
       dataType: 'json',
       success: function (data) {

        pokemonRow = $("#pkmnRow"+numPkmn);
        pokemonBtnState = pokemonRow.find(".btnState");

       	if ( state == "None"){
       		//Cacher/Disabled boutons "Remove", afficher boutons "Viewed/Caught"
       		//Faire modifications nécessaires pour faire passer le design à "None"
          pokemonBtnState.text("None ").append("<span class='caret'></span>");
          pokemonBtnState.removeClass("btn-info");
          pokemonBtnState.removeClass("btn-warning");
          pokemonBtnState.addClass("btn-danger");
          pokemonRow.find(".removeHuntButton").hide();
          pokemonRow.find(".addViewedHuntButton").show();
          pokemonRow.find(".addCaughtHuntButton").show();

       	} else if ( state == "Viewed" ) {
        	//Cacher/Disabled boutons "Viewed", afficher boutons "Remove/Caught"
        	//Faire modifications nécessaires pour faire passer le design à "Viewed"
          pokemonBtnState.text("Viewed ").append("<span class='caret'></span>");
          pokemonBtnState.removeClass("btn-danger");
          pokemonBtnState.removeClass("btn-info");
          pokemonBtnState.addClass("btn-warning");
          pokemonRow.find(".removeHuntButton").show();
          pokemonRow.find(".addViewedHuntButton").hide();
          pokemonRow.find(".addCaughtHuntButton").show();

        } else {
        	//Cacher/Disabled boutons "Caught", afficher boutons "Remove/Viewed"
        	//Faire modifications nécessaires pour faire passer le design à "Caught"
          pokemonBtnState.text("Caught ").append("<span class='caret'></span>");
          pokemonBtnState.removeClass("btn-danger");
          pokemonBtnState.removeClass("btn-warning");
          pokemonBtnState.addClass("btn-info");
          pokemonRow.find(".removeHuntButton").show();
          pokemonRow.find(".addViewedHuntButton").show();
          pokemonRow.find(".addCaughtHuntButton").hide();
        }

       },
       error : function (){
       	alert('An error occured during the operation. Please, try again later.');
       }
   });
}
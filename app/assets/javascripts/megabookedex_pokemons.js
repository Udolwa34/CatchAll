$(document).ready(function(){
	//Definition of page number
	var page = 1;
	var pageMax = 40;

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

  //Going on page n°X
  $(".goToPage").click(function(){
    numOfPage = $(this).text();
    page = numOfPage; getPokemonByPage(page);
    navigationButtonsUpdate();
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


  function navigationButtonsUpdate(){
    if ( page == 1){
      $("#goToFirstPage").hide();
      $("#goToPrevPage").hide();
      $("#goToLastPage").show();
      $("#goToNextPage").show();
    } else if ( page == pageMax ){
      $("#goToFirstPage").show();
      $("#goToPrevPage").show();
      $("#goToLastPage").hide();
      $("#goToNextPage").hide();
    } else {
      $("#goToFirstPage").show();
      $("#goToPrevPage").show();
      $("#goToLastPage").show();
      $("#goToNextPage").show();
    }

    

    
  }
});


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

       	if ( state == "None"){
       		//Cacher/Disabled boutons "Remove", afficher boutons "Viewed/Caught"
       		//Faire modifications nécessaires pour faire passer le design à "None"
       	} else if ( state == "Viewed" ) {
        	//Cacher/Disabled boutons "Viewed", afficher boutons "Remove/Caught"
        	//Faire modifications nécessaires pour faire passer le design à "Viewed"
        } else {
        	//Cacher/Disabled boutons "Caught", afficher boutons "Remove/Viewed"
        	//Faire modifications nécessaires pour faire passer le design à "Caught"
        }

       },
       error : function (){
       	alert('An error occured during the operation. Please, try again later.');
       }
   });
}
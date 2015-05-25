$(document).ready(function(){
	
	numeroPokemon = 0;

    //Function that handle autocompletion
	$(function () {
	    $('#search').autocomplete({
	        source: function (request, response) {
	           searchName = $("#search").val().substr(0,1).toUpperCase() + $("#search").val().substr(1).toLowerCase();
	           $.ajax({
	               url: "/api/search?search=" + searchName + "",
	               type: 'GET',
	               dataType: 'json',
	               data: request,
	               success: function (data) {
	                   response($.map(data, function (value, key) { 
	                        return {
	                            label: value.name + " - #" + value.id,
	                        };
	                   }));
	               }
	           });
	        },
	        minLength: 3,
	        autoFocus: false,
	        select: function(event, ui) {
		        numPokemon = ui.item.label.split(" - #")[1];
        		searchPkmn(numPokemon);
		    }
	    });
	});

	//Function which launches search
	$("#search").keyup(function (event){

        var key = event.keyCode || event.which;

        if (key === 13) {
          	
        	if ($("#search").val().length > 7 && $("#search").val().split(" - #").length == 2){

        		numPokemon = $("#search").val().split(" - #")[1];
        		searchPkmn(numPokemon);

        	}
        }

	});


	//Next & Prev buttons
	$("#nextButton").click(function(){
		searchPkmn(numeroPokemon + 1);
	});
	$("#prevButton").click(function(){
		searchPkmn(numeroPokemon - 1);
	});

});

//Function that handle search of the Pokemon's informations on Pokeapi
//Parameter : numPokemon => national_id of the Pokemon
function searchPkmn(numPokemon){
	//Hides buttons "Next" and "Prev"
	$("#prevButton").attr("disabled", false);
	$("#nextButton").attr("disabled", false);
	$("#seenButton").attr("disabled", true);
	$("#caughtButton").attr("disabled", true);

	$.ajax({
       url: "http://pokeapi.co/api/v1/pokemon/"+numPokemon+"",
       type: 'GET',
	   error: function() {
	      	$("#pokemonImage").attr("src", "/assets/pokemon/0.png");
	   		$("#pokemonName h1").text("No result");
	   		$("#tdName").text("-");
	   		$("#tdId").text("-");
	   		$("#tdHeight").text("-");
	   		$("#tdWeight").text("-");
	   		$("#tdAttackDefense").text("-");
	   		$("#tdType1").text("-");
	   		$("#tdType2").text("-");
	   		$("#tdSpecies").text("-");
	   		$("#tdEvolution").text("-");

	   		$("#search").val("");

			alert('An error occured during the operation. Please, try again later.');
	   },
	   
	   success: function(data) {
	   		numeroPokemon = parseInt(numPokemon);
	   		$("#pokemonImage").attr("src", "/assets/pokemon/"+data.national_id+".png");
	   		$("#pokemonName h1").text(data.name);
	   		$("#tdName").text(data.name);
	   		$("#tdId").text(data.national_id);
	   		$("#tdHeight").text(data.height/10 + "m");
	   		$("#tdWeight").text(data.weight/10 + "kg");
	   		$("#tdAttackDefense").text(data.attack + " / " + data.defense);
	   		$("#tdType1").text(data.types[0].name);
	   		data.types.length > 1 ? $("#tdType2").text(data.types[1].name) : $("#tdType2").text("None");
	   		var str = "";
	   		for (var i = 0; i < data.egg_groups.length; i++) {
	   			str += data.egg_groups[i].name;
	   			if(i != data.egg_groups.length - 1 && data.egg_groups.length > 1 ) str += ", ";
	   		};
	   		$("#tdSpecies").text(str != "" ? str : "None");
	   		for (var i = 0; i < data.evolutions.length; i++) {
	   			if(i == 0) $("#tdEvolution").text("");
	   			$("#tdEvolution").append("<a onclick='searchPkmn(" + data.evolutions[i].resource_uri.split("/")[4] + ")'>" + data.evolutions[i].to + " (" + data.evolutions[i].level + ")</a>");
	   			if(i != data.evolutions.length - 1 && data.evolutions.length > 1)  $("#tdEvolution").append(", ");;
	   		};
	   		if(data.evolutions.length == 0) $("#tdEvolution").text("None");

	   		//Shows, or not, buttons "Next" and "Prev".
	   		if (numPokemon == 1){
				$("#prevButton").attr("disabled", true);
				$("#nextButton").attr("disabled", false);	
			} else if ( numPokemon == $("#pokemonMax").text() ){
				$("#prevButton").attr("disabled", false);
				$("#nextButton").attr("disabled", true);
			}
			$("#search").val(data.name + " - #" + data.national_id);

			//Enable, or not, Caught/Seen indications
			$.ajax({
		       url: "/searchHuntstatePokemon/"+numPokemon+"",
		       type: 'GET',
			   success: function(dataHunt){
			   	$("#seenButton").attr("disabled", !dataHunt.seen);
			   	$("#caughtButton").attr("disabled", !dataHunt.caught);
			   }
			});
		},
		   
	});
}


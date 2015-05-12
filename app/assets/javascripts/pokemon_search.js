$(document).ready(function(){
	numeroPokemon = 0;
    //Function that handle autocompletion
	$(function () {
	    $('#search').autocomplete({
	        source: function (request, response) {
	           $.ajax({
	               url: "/api/search?search="+$("#search").val()+"",
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
		        numPokemon = $("#search").val().split(" - #")[1];
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

	$("#result").text("Wait please...");
	$.ajax({
	       url: "http://pokeapi.co/api/v1/pokemon/"+numPokemon+"",
	       type: 'GET',
		   error: function() {
		      alert('An error occured during the operation. Please, try again later.');
		   },
		   
		   success: function(data) {
		   		numeroPokemon = parseInt(numPokemon);

		   		$("#result").text(data.name + "--" + data.national_id + "--"+ data.types[0].name+"-- + a lot of more informations !");

		   		//Shows, or not, buttons "Next" and "Prev".
		   		if ( numPokemon == 1){
					$("#prevButton").attr("disabled", true);
					$("#nextButton").attr("disabled", false);	
				} else if ( numPokemon == $("#pokemonMax").text() ){
					$("#prevButton").attr("disabled", false);
					$("#nextButton").attr("disabled", true);
				}
		   },
		   
	});
}


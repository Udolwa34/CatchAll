$(document).ready(function(){

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
	        autoFocus: true
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

});


//Function that handle search of the Pokemon's informations on Pokeapi
//Parameter : numPokemon => national_id of the Pokemon
function searchPkmn(numPokemon){
	$("#result").text("Wait please...");
	$.ajax({
	       url: "http://pokeapi.co/api/v1/pokemon/"+numPokemon+"",
	       type: 'GET',
		   error: function() {
		      alert('An error occured during the operation. Please, try again later.');
		   },
		   
		   success: function(data) {

		   		$("#result").text(data.name + "--" + data.national_id + "--"+ data.types[0].name+"-- + a lot of more informations !");

		   },
		   
	});
}


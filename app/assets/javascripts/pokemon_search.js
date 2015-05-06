$(document).ready(function(){

	//Function that handle autocompletion
	$("#search").keyup(function(){
		if ( $("#search").val().length > 2 ){
			$.ajax({
		       url: "/api/search?search="+$("#search").val()+"",
		       type: 'GET',
			   error: function() {
			      alert('An error occured during the operation. Please, try again later.');
			   },
			   
			   success: function(data) {
			   		$("#propositions li").remove();
			   		if (data != "[]"){
			   			pkmn = jQuery.parseJSON(data);
			   			for ( i = 0; i < pkmn.length; i++){
			   				$("#propositions").append(
			   					"<li><div class='findPkmn' onClick='searchPkmn("+pkmn[i].id+");'>"+pkmn[i].name+"</div></li>");
			   			}
						//$("#result").html(text(jQuery.parseJSON(data));
			   		} else {
			   			$("#propositions").append("<li>No result for this search</li>"); 
			   		}
			   	  

			   },
			   
		    });
		} else {
			$("#propositions li").remove();
			//$("#result").text("");
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


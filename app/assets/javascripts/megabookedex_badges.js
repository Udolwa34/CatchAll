//Removing a badge from a trainer's collection
function removeBadgeById(idBadge){
	$.ajax({
       url: "/badges/removeFromTrainer/"+idBadge,
       type: 'GET',
       dataType: 'json',
       success: function (data) {
       	 //Managing display of row's buttons and informations
       	 badgeRow = $("#badgeRow"+idBadge);
		 badgeRow.find(".badgeObtainedColumn").text("No");
		 badgeRow.find(".removeBadgeButton").hide();
		 badgeRow.find(".addBadgeButton").show();

		 //Managing progression-bar 
		 updateBadgeProgressBar(data["total"], data["trainerNbr"]);
        
       },
       error : function (){
       	alert('An error occured during the operation. Please, try again later.');
       }
   });
}

//Adding a badge to a trainer's collection
function addBadgeById(idBadge){
	$.ajax({
       url: "/badges/addToTrainer/"+idBadge,
       type: 'GET',
       dataType: 'json',
       success: function (data) {
       	 //Managing display of row's buttons and informations
       	 badgeRow = $("#badgeRow"+idBadge);
		 badgeRow.find(".badgeObtainedColumn").text("Yes");
		 badgeRow.find(".addBadgeButton").hide();
		 badgeRow.find(".removeBadgeButton").show();

		 //Managing progression-bar 
		 updateBadgeProgressBar(data["total"], data["trainerNbr"]);
        
       },
       error : function (){
       	alert('An error occured during the operation. Please, try again later.');
       }
   });
}


//Managing progression-bar 
function updateBadgeProgressBar(badgesTotal, trainerBadgesCount){
	$("#badgeObtained").text(trainerBadgesCount);
	$("#trainerPoints").text(parseInt($("#pkmnCaught").text()) * parseInt($("#pkmnSeen").text()) * (trainerBadgesCount + 1));
	 prctCompletion = ((trainerBadgesCount * 100)/ badgesTotal);
	 $("#badgeProgressBar").attr("aria-valuenow", prctCompletion);
	 $("#badgeProgressBar").css("width", prctCompletion+"%");

	 $("#totalPrctCompletion").text(prctCompletion+"% Complete");
	 $("#totalBadges").text(trainerBadgesCount+"/"+badgesTotal);
	 if ( prctCompletion > 7 ){
	 	$("#totalBadges").show();
	 } else {
	 	$("#totalBadges").hide();
	 }
} 
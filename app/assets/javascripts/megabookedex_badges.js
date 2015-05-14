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



//Managing progression-bar 
function updateBadgeProgressBar(badgesTotal, trainerBadgesCount){
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
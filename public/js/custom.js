//placeholder
$(document).ready(function() {
	$('input, textarea').placeholder();
});
//Homepage Carousel
$(document).ready(function(){
	$('#realto-carousel').carousel({
		interval: 5000
	});
});

$.ajax({
        	url :"",
            method :"GET",
            data : ""
        }).done(function(result) {
					console.log(result.result);
				}).fail({ });

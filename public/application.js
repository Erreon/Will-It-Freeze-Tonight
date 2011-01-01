$(function() {
	$( "#place" ).autocomplete({
		source: function( request, response ) {
			$.ajax({
				url: "http://ws.geonames.org/searchJSON",
				dataType: "jsonp",
				data: {
					country: "US",
					featureClass: "P",
					style: "full",
					maxRows: 12,
					name_startsWith: request.term
				},
				success: function( data ) {
					response( $.map( data.geonames, function( item ) {
						return {
							label: item.name + (item.adminName1 ? ", " + item.adminName1 : ""),
							value: item.name
						}
					}));
				}
			});
		},
		minLength: 2,
		select: function( event, ui ) {
			$("input#place").val(ui.item.label);
			return false;
			alert(dump(ui.item));
		},
		open: function() {
			$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
		},
		close: function() {
			$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
		}
	});
});

function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

if (Modernizr.geolocation) {
 

	$(document).ready(function(){
      $("#locationButton").html("<button id=\"findLocation\">Use your location</button>");
	  $("#findLocation").click(init_geolocation);
	});

	function init_geolocation(){
		navigator.geolocation.getCurrentPosition(handle_geolocation_query);
	}

	function handle_geolocation_query(position){
		$.ajax({
		  url: "http://ws.geonames.org/findNearbyPostalCodesJSON",
		  dataType: "json",
		  data: {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		},
		success: function( data ) {
			$("input#place").val(data.postalCodes[0].placeName + ', ' + data.postalCodes[0].adminName1 + ', ' + data.postalCodes[0].postalCode );
		}	
		});
	}
}
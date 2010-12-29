<script>
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
							// " + item.countryName,
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
</script>
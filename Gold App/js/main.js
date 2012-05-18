// write your javascript in here

var form = function(data){
		// uses form data here;
		consol.log(data);
};

$(document).ready(function(){

	var abifrom = $("#addbookinfoform"),
		berrorslink = $('#berrorslink')
	;
	
	rbform.valdate({
		invalidHander: function(form, validator){
			rberrorslink.click();
			var html = '' ;
			for(var key in validator.submitted){
				var label = $('label[for="'+ key +'"]');
				var legend = label.closet('fieldset').find('.ui-controlgroup-label');
					var fieldName = legend.length ? legend.text() : label.text();
					html += '<li>'+ fieldName +'</li>';
			};
			$("#bookerrors ul").html(html);
		},	
		submitHandler: function(){
			var data = rbform.serializeArray();
			Form(data);
		}
	});
}):

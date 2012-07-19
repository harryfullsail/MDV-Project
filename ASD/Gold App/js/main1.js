var parseAddbookInfoForm = function(data){
	//uses form here;
	console.log(data);

};

$(document).ready(function(){

	var abiform = $('#addbookinfoform'),
		berrorslink	= $('#berrorslink')
	;
		
	abiform.validate({
		invalidHandler: function(form, validator){
			berrorslink.click();
			var html ='';
			for(var key in validator.sumitted){
				var label =$('label[for^="'+ key +'"]').not('[generated]');
				var legend = label.closest('fieldset').find('.ui-fieldcontion-label');
				var fieldName = legend.length ? legend.text() : label.text();
				html += 'li' + fieldName +'/li';
			};
			$("#bookerrors ul").html(html);
		},
		submitHandler: function(){
			var data = abiform.serializeArray();
			parseAddbookInfoForm(data);
		}
	});

});
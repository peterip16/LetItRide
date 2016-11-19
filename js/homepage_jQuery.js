var text = $('#name');
var tabs = $('.tabs');
var body = $('body');
var homePage = $('#homePage');
var profile = $('#profilePage');

var username = $('input[name = "usr"]');
var password = $('input[name = "pwd"]');
var password2 = $('input[name = "pwd2"]');
var email = $('input[name = "email"]');
var phone = $('input[name = "phone"]');

var button = $('#sumbitButton');

password2.keyup( function(){
	if( !$(this).val() ){
		$(this).css("background", "pink");
	}else if ( $(this).val() != password.val()) {
		$(this).css("background", "pink");
		password.css("background", "pink");
	}else{
		$(this).css("background", "white");
		password.css("background", "white");
	}
});


password.keyup( function(){
	if( !$(this).val() ){
		$(this).css("background", "pink");
		// button.prop( "disabled", true );
	}else if ( $(this).val() != password2.val()) {
		$(this).css("background", "pink");
		password2.css("background", "pink");
		// button.prop( "disabled", true );
	}else{
		$(this).css("background", "white");
		password2.css("background", "white");
		// button.prop( "disabled", false );
	}

});

phone.keyup(function(){
	if( !$(this).val() ){
		$(this).css("background", "pink");
	}else{
		$(this).css("background", "white");
	}

});

username.keyup( function(){
	if( !$(this).val() ){
		$(this).css("background", "pink");
	}else{
		$(this).css("background", "white");
	}

});

email.keyup(function(){
	var email = /^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
	var value = $(this).val();
	if( !value ){
		$(this).css("background", "pink");
	}else if(!email.test(value)){
		$(this).css("background", "pink");
	}else{
		$(this).css("background", "white");
	}
});


$(document).ready(function() {
		// Animate loader off screen
		// alert("test");
		$('.se-pre-con').fadeOut(4000);
		// $(".se-pre-con").hide();
		// alert("hello");
		$.getJSON('php/getData.php', function(data){
			// $.each(data.result, function(){
			// 	alert(this['id'] + " " + this['name'] + " " + this['email'] + " " + this['phone'] + " " + this['password']);
			// 	// alert(ata.result[0]);
			// });
			var nme = data.result[0]['name'];
			
			var pass = data.result[0]['password'];
			var emil = data.result[0]['email'];
			var phn = data.result[0]['phone'];
			// alert(pass);

			text.html(nme);
			username.val(nme);
			password.val(pass);
			password2.val(pass);
			email.val(emil);
			phone.val(phn);

		});


	});


// $('#name').html("hello");
// $.getJSON("getData.php", success = function(data){
// 	alert(data[0]['Name']);
// 	// $('.textLabel').html(data[0]['Name']);

// });

$('.tab').hide();

$('.home').on('click',function(){
	body.css("background-color","#1697d1");
	homePage.show();
	profile.hide();
});

$('.profile').on('click',function(){
	body.css("background-color","#33434f");
	homePage.hide();
	profile.show();
});


$('.goBack').on('click', function(){
	$('.directionPanel').hide();
	$('.inputPanel').show();
});

$('.home').click();



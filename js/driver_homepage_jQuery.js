/*
var text = $('#name');
var tabs = $('.tabs');
var body = $('body');
var homePage = $('#homePage');
var profile = $('#profilePage');
var history = $('#historyPage');
var username = $('input[name = "usr"]');
var password = $('input[name = "pwd"]');
var password2 = $('input[name = "pwd2"]');
var email = $('input[name = "email"]');
var phone = $('input[name = "phone"]');
*/

$(document).ready(function() {
		// Animate loader off screen
		$('.se-pre-con').fadeOut(3000);
		/*
		// $(".se-pre-con").hide();
		$.getJSON('js/getData.php', function(data){
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
			*/

		});




// $('#name').html("hello");
// $.getJSON("getData.php", success = function(data){
// 	alert(data[0]['Name']);
// 	// $('.textLabel').html(data[0]['Name']);

// });

/*

$('.tab').hide();

$('.home').on('click',function(){
	body.css("background-color","#1697d1")
	homePage.show();
	profile.hide();
	history.hide();
});

$('.profile').on('click',function(){
	body.css("background-color","#33434f")
	homePage.hide();
	profile.show();
	history.hide();
});

$('.history').on('click',function(){
	body.css("background-color","#ee2e24")
	homePage.hide();
	profile.hide();
	history.show();
});

$('.goBack').on('click', function(){
	$('.directionPanel').hide();
	$('.inputPanel').show();
});

$('.home').click();

*/
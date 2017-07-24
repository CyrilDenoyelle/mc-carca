(function(){

	var details=[];

	function detailsGeneration(data){
		console.log(data);
		for(var i=0; i<50; i++){
			var d = data.value[i];
			details.push(d.joke)
		}
	}

	$.ajax({
		type: "GET",
		url: "http://api.icndb.com/jokes/random/50?limitTo=[nerdy]",
		dataType: "json",
		success: detailsGeneration,
		error: function() {
			alert("404 Not Found - Oops something went wrong ! api question");
		}
	})

	// var details=[
	// 'Lorem ipsum dolor sit amet.',
	// 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, nam!',
	// 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, itaque eaque rem a alias nam!',
	// 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta at, quasi eligendi quia vel enim eaque ad! Totam, repellendus, eaque.', 
	// 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, officiis, sit. Laborum.',
	// 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure quas amet sunt voluptas eum voluptatibus eligendi officiis rerum soluta delectus, iste aliquid assumenda nesciunt itaque cumque velit animi, quidem, totam omnis minus.',
	// 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
	// 'Lorem ipsum dolor.', 
	// 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo blanditiis exercitationem ab, atque in. Reiciendis, nam architecto quod at laboriosam vel atque iusto est non? Quaerat reprehenderit, eligendi nesciunt quos ea delectus repudiandae consectetur omnis eaque, voluptatum cupiditate sunt sequi, recusandae consequatur repellendus vel! Dolorem delectus error totam iste dolore ipsa, cumque, nam consequatur at officia magnam ab sequi, nostrum temporibus repellat necessitatibus? Quaerat a ipsa rem et, nisi nulla.'];

	var prev = undefined;
	function displayDetails (){
		if(!prev){
			prev = $(this);
			$(this).css('border', 'solid white 1px');
		}else{
			$(this).css('border', 'solid white 1px');
			prev.css('border', 'none')
			prev = $(this);
		}
		$('#textDetails').hide().html(details[$(this).attr('key')]).fadeIn('slow');

	}

	function imgObj(n){
		return $('.mosaic').append($('<img/>').attr('key', n).attr('id', 'img'+n).attr('src', 'https://unsplash.it/200/200?image='+n).addClass('mosaicImg'))
	}

	function imgGeneration (n, reve){
		$('.mosaic').html('');
		if(!reve){
			for(var i=0; i<n; i++){
				imgObj(i);
			}
			$('.mosaicImg').on('click', displayDetails);
		}else{
			for(var i=n-1; i>=0; i--){
				imgObj(i);
			}
			$('.mosaicImg').on('click', displayDetails);
		}
	}
	imgGeneration(9);

	var shuffled = false;
	function imgShuffler(){
		if(!shuffled){
			var tablImgKey = [];
			$('.mosaicImg').each(function(){
				tablImgKey.push(parseInt($(this).attr('key')));
			});
			// console.log(tablImgKey);

			var tablImgKeyShuffled = [];
			while (tablImgKey.length !== tablImgKeyShuffled.length) {
				do{
					rand = Math.floor(Math.random()*tablImgKey.length);
					// console.log(rand);
				}while(tablImgKeyShuffled.indexOf(rand) !== -1)
				tablImgKeyShuffled.push(rand);
			}
			// console.log(tablImgKeyShuffled)

			$('.mosaic').html('');
			for(var i=0; i<parseInt($('#number').val()); i++){
				imgObj(tablImgKeyShuffled[i])
			}
			$('.mosaicImg').on('click', displayDetails);
		}else{
			imgGeneration($('#number').val());
		}
		shuffled = !shuffled;
	}


	function imgNumber(){
		imgGeneration($('#number').val());
		if($(':checkbox#shuffle').is(':checked')){
			shuffled = !shuffled;
			imgShuffler();
		}
	}

	var reversed = false;
	$(':checkbox#reverse').on('click', function(){

		if(!reversed){
			imgGeneration($('#number').val(), !reversed);
			reversed = true;
		}else{
			reversed = false;
			imgGeneration($('#number').val(), reversed);
		}

		// if($('.mosaic')[0].outerHTML.indexOf('reverse') !==-1){
		// 	$('.mosaic').css('flex-flow', 'row wrap');
		// }else{
		// 	$('.mosaic').css('flex-flow', 'row wrap-reverse');
		// }
	});

	$(':checkbox#shuffle').on('click', imgShuffler);

	$('#number').on('click', imgNumber)

	$('#link1').on('click', function(){
		alert('coucou tu veux voir ma...');
		alert('...bible ?');
		alert('RTFM');
	});
	
	$('#link2').on('click', function(){
		alert('Read the f*king manual');
	});

	var k = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
	n = 0;
	$(document).keyup(function (e) {
		if (e.keyCode === k[n++]) {
			if (n === k.length) {
				window.location.href = 'http://metalplay.io'
				n = 0;
				return false;
			}
		}
		else {
			n = 0;
		}
	});

}())
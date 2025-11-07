/* Steve jobs' book */

var screentype = 'double';
var w = window.innerWidth;
var h = window.innerHeight;
var insidew = 460;
var insideh = 649;
var adjustw=480;
var adjusth=669;
var depthscaleh = 7;
var depthscaletop = 8;
var shiftvalue = 20;
var turningvar = true;
var laptop = true;



// WAIT FOR PAGE TO LOAD
setTimeout(function(){
    document.querySelector('#loading-screen').style.opacity="0";
	setTimeout(function(){
		document.querySelector('#loading-screen').style.display="none";
		document.querySelector('.navbar').style.opacity="1";
		document.querySelector('#canvas').style.opacity="1";
	}, 500)
},10000);

function resize() {
	location.reload();
}	
window.onresize = resize;

// function playvideo(){
// 	let videos = document.querySelectorAll('.livevideo');
// 	console.log(videos);
// 	for(i=0; i<videos.length; i++){
// 		videos[i].play();
// 	}
// }
// window.onload = playvideo;

let actionTimeout = null;

function turning(number){
	let el
	if (number%2==0){
		const selector1 = `#page${number} .introimage`;
		const selector2 = `#page${number+1} .introimage`;
		const page1 = document.querySelectorAll(selector1);
		const page2 = document.querySelectorAll(selector2)
		const array1 = Array.from(page1);
        const array2 = Array.from(page2);
		el = [...array1, ...array2];
	}
	else if (number%2!=0){
		const selector1 = `#page${number} .introimage`;
		const selector2 = `#page${number-1} .introimage`;
		const page1 = document.querySelectorAll(selector1);
		const page2 = document.querySelectorAll(selector2)
		const array1 = Array.from(page1);
        const array2 = Array.from(page2);
		el = [...array1, ...array2];
	}
	try {
		// Clear the timeout to prevent the opacity change
		if (actionTimeout !== null) {
			clearTimeout(actionTimeout);
			actionTimeout = null;
		}
		// Immediately set the opacity back to 0
		
		for(i=0; i<el.length; i++){
			el[i].style.opacity = "0";
		}
	} catch (error) {
		console.error("Error in cancel action:", error);
	}
}

function reset_animation(number) {	
	let el
	if (number%2==0){
		const selector1 = `#page${number} .introimage`;
		const selector2 = `#page${number+1} .introimage`;
		// const selector3 = `#page${number} .livevideo`;
		// const selector4 = `#page${number+1} .livevideo`;
		const page1 = document.querySelectorAll(selector1);
		const page2 = document.querySelectorAll(selector2);
		// const page3 = document.querySelectorAll(selector3);
		// const page4 = document.querySelectorAll(selector4);
		console.log(page1)
		const array1 = Array.from(page1);
        const array2 = Array.from(page2);
		// const array3 = Array.from(page3);
        // const array4 = Array.from(page4);
		el = [...array1, ...array2];
		// livevideos = [...array3, ...array4];
	}
	else if (number%2!=0){
		const selector1 = `#page${number} .introimage`;
		const selector2 = `#page${number-1} .introimage`;
		// const selector3 = `#page${number} .livevideo`;
		// const selector4 = `#page${number+1} .livevideo`;
		const page1 = document.querySelectorAll(selector1);
		const page2 = document.querySelectorAll(selector2);
		// const page3 = document.querySelectorAll(selector3);
		// const page4 = document.querySelectorAll(selector4);
		const array1 = Array.from(page1);
        const array2 = Array.from(page2);
		// const array3 = Array.from(page3);
        // const array4 = Array.from(page4);
		el = [...array1, ...array2];
		// livevideos = [...array3, ...array4];
	}
	console.log(el);

	if (actionTimeout !== null) {
		clearTimeout(actionTimeout);
		actionTimeout = null;
	}

	for(i=0; i<el.length; i++){
		try {
			el[i].style.opacity = "1";
		} catch (error) {
			console.log(error)
		}
	}
	actionTimeout = setTimeout(function(){
		for(i=0; i<el.length; i++){
			el[i].style.opacity = "0";
		};
		actionTimeout = null;
	}, 3000)
}

function updateDepth(book, newPage) {

	var page = book.turn('page'),
		pages = book.turn('pages'),
		depthWidth = 16*Math.min(1, page*2/pages);

		newPage = newPage || page;

	if ((newPage>3)&&screentype=="single") {
		document.querySelector('.p85').style.display = "block";
	} 

	if ((newPage<pages-3)&&screentype=="single") {
		document.querySelector('.p85').style.display = "none";
	}

	if (newPage>3)
		$('.sj-book .p2 .depth').css({
			width: depthWidth,
			left: shiftvalue - depthWidth,
		});
	else
		$('.sj-book .p2 .depth').css({width: 0});

		depthWidth = 16*Math.min(1, (pages-page)*2/pages);

	if (newPage<pages-3)
		$('.sj-book .p85 .depth').css({
			width: depthWidth,
			right: shiftvalue - depthWidth
		});
	else
		$('.sj-book .p85 .depth').css({width: 0});

}

function loadPage(page) {

	$.ajax({url: 'pages/page' + page + '.html'}).
		done(function(pageHtml) {
			$('.sj-book .p' + page).html(pageHtml.replace('samples/steve-jobs/', ''));
		});

}

function addPage(page, book) {

	var id, pages = book.turn('pages');

	if (!book.turn('hasPage', page)) {

		var element = $('<div />',
			{'class': 'own-size',
				css: {width: insidew, height: insideh}
			}).

			html('<div class="gradient"></div><div class="loader"></div>');

		if (book.turn('addPage', element, page)) {
			loadPage(page);
		}

	}
}

function numberOfViews(book) {

	return book.turn('pages') / 2 + 1;

}

function getViewNumber(book, page) {

	return parseInt((page || book.turn('page'))/2 + 1, 10);

}


function moveBar(yes) {
	if (Modernizr && Modernizr.csstransforms) {
		$('#slider .ui-slider-handle').css({zIndex: yes ? -1 : 10000});
	}
}


function updatePage(page) {
	const pageNumberInput = document.getElementById('pageNumber');
	if (screentype=="single"){
		pageNumberInput.value = (page-2);
	}
	else{
		if (page==1){
			pageNumberInput.value = 0;
		}
		else if (page%2==0){
			pageNumberInput.value = (page-2) + "-" + (page+1-2);
		}
		else if (page%2!=0){
			pageNumberInput.value = (page-1-2) + "-" + (page-2);
		}
	}
}

function isChrome() {

	// Chrome's unsolved bug
	// http://code.google.com/p/chromium/issues/detail?id=128488

	return navigator.userAgent.indexOf('Chrome')!=-1;

}


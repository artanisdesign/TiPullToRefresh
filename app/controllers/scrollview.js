var sp = 0, startpos = 0, isEnd = true, lastw = 0, proxy, progressIndicator, pW = Ti.Platform.displayCaps.platformWidth, pH = Ti.Platform.displayCaps.platformHeight, pDf = Ti.Platform.displayCaps.logicalDensityFactor;

$.scrollView.addEventListener("touchend", function(e) {
	deanim();
});

/*
 function tbend(e) {
 //Ti.API.info("table: " + $.myrow.rect.y);
 }
 */
$.scrollView.addEventListener("touchmove", function(e) {
	if (!sp) {
		if (isEnd) {
			startpos = e.y;
			isEnd = false;
		} else {

			//Ti.API.info(": " + (e.y - startpos));
			var w = e.y - startpos;

			$.loader.width = pW * (w / (pH - 200));

			//Ti.API.info($.loader.width);

			if ($.loader.width >= pW / pDf) {
				showIt();
				$.loader.width = 0;
			}
		}
	} else {
		deanim();
	}
});

$.scrollView.addEventListener("scroll", function(e) {
	//Ti.API.info("scroll: " + e.y);
	sp = e.y;
	//sp = e.firstVisibleItem;
	e.cancelBubble = true;
});

function init() {

	var TiSmoothProgressBar = require('com.artanisdesign.tismoothprogressbar');
	Ti.API.info("module is => " + TiSmoothProgressBar);

	proxy = TiSmoothProgressBar.createSmoothProgressBar({
		height : Ti.UI.SIZE,
		top : -6,
		left : 0,
		width : Ti.UI.FILL,
		zIndex : 5,
		interpolator : TiSmoothProgressBar.ACCELERATE,
		strokeWidth : 11
	});

	$.scrollWindow.add(proxy);

	proxy.hide();

}

function showIt() {
	proxy.show();

	setTimeout(function() {
		hideIt();
		$.myLabel.text = "Well done..";
	}, 2000);
}

function hideIt() {
	var animation = Titanium.UI.createAnimation({
		opacity : 0,
		duration : 120
	});

	var animationHandler = function() {
		animation.removeEventListener('complete', animationHandler);
		proxy.hide();
		proxy.opacity = 1;
	};

	animation.addEventListener('complete', animationHandler);
	proxy.animate(animation);
}

function deanim() {

	var animation = Titanium.UI.createAnimation({
		opacity : 0,
		duration : 120
	});

	var animationHandler = function() {
		animation.removeEventListener('complete', animationHandler);
		isEnd = true;
		startpos = 0;
		$.loader.opacity = 1;
		$.loader.width = 0;
	};

	animation.addEventListener('complete', animationHandler);
	$.loader.animate(animation);
}

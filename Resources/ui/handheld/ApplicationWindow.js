//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
		//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});

	var PageFlip = require('org.bcbhh.IosFlipView');

	function createPage(number) {
		var container = Ti.UI.createView();
		var label = Ti.UI.createLabel({text:'Mein Label'});
		var button =  Ti.UI.createButton({
			title : 'p' + number,
			backgroundColor : '#fff'
		});
	//	button.addEventListener('click', function () {
	//		Ti.API.info('User clicked button in flipview 1');
	//	});

//        container.add(label);
//        container.add(button);
		return button;
	}

	var pages = [],
	    count;
	var button1, button2 ,button3;
	button1 = createPage(1);
		button1.addEventListener('click', function () {
			Ti.API.info('User clicked button in flipview 1');
		});
	pages.push(button1);
	button2 = createPage(2);
		button2.addEventListener('click', function () {
			Ti.API.info('User clicked button in flipview 2');
		});
	pages.push(button2);
	button3 = createPage(3);
	pages.push(button3);

	var pageflip = PageFlip.createView({
		/* All Options: TRANSITION_FLIP [default], TRANSITION_SLIDE, TRANSITION_FADE, TRANSITION_CURL */
		pages : pages ,
		bounceRatio : 0.3,
		rubberBandRatio: 0.9,
		transitionDuration: 0.3,
		swipeEscapeVelocity: 300,
		swipeThreshold:50
	});
	self.add(pageflip);
	//self.add(button1);

	function updateWindowTitle() {
		self.title = 'Views, 1 < ' + (pageflip.currentPage + 1) + ' > ' + pageflip.pageCount;
	}

	updateWindowTitle();

	pageflip.addEventListener('change', function(evt) {
		// evt.currentPage
		Ti.API.info('TI Info change Event from flipper!' + evt.currentPage + " " + evt.pageCount);
		updateWindowTitle();
	});

	pageflip.addEventListener('tap', function(evt) {
		// evt.currentPage
		Ti.API.info('User tapped inside the paging margins! Maybe we should show them an overlay menu?');
	});
	pageflip.addEventListener('flipStarted', function(evt) {
		Ti.API.info('TI Info flip started!');
	});
	
	pageflip.bounceBackward({});
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;

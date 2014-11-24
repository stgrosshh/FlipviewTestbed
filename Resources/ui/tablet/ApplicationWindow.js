//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
		//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
    Ti.API.info('App Window created');

	var PageFlip = require('org.bcbhh.IosFlipView');

	function createPage(number) {
		var container = Ti.UI.createWindow();
		var label = Ti.UI.createLabel({text:'Mein Label'});
		var button =  Ti.UI.createButton({
			title : 'p' + number,
			backgroundColor : '#fff'
		});
		button.addEventListener('click', function () {
			Ti.API.info('User clicked button in flipview');
		});

        container.add(label);
        container.add(button);
		return button;
	}

	var pages = [],
	    count;
	for ( count = 1; count <= 10; count++) {
		pages.push(createPage(count));
	}

	var pageflip = PageFlip.createView({
		/* All Options: TRANSITION_FLIP [default], TRANSITION_SLIDE, TRANSITION_FADE, TRANSITION_CURL */
		pages : pages
	});
	self.add(pageflip);
			setTimeout(function() {
			try {
				pageflip.changeCurrentPage(5,true);
				pageflip.bounceForward({});
			} catch(E) {
			}
		}, 1000);


	function updateWindowTitle() {
		self.title = 'Views, 1 < ' + (pageflip.currentPage + 1) + ' > ' + pageflip.pageCount;
	}

	updateWindowTitle();

	pageflip.addEventListener('change', function(evt) {
		// evt.currentPage
		updateWindowTitle();
	});

	pageflip.addEventListener('tap', function(evt) {
		// evt.currentPage
		Ti.API.info('User tapped inside the paging margins! Maybe we should show them an overlay menu?');
	});
	pageflip.addEventListener('flipStarted', function(evt) {
		Ti.API.info('flip started!');
	});
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;

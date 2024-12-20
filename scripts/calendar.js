var myCal = document.getElementById("adventCal");
var currentDate = new Date();
var popupFactory = $().popup;

allThePopups = [];

function Door(calendar, day) {

    this.width = ((calendar.width - 0.1 * calendar.width) / 4) * 0.95;
    this.height = ((calendar.height - 0.1 * calendar.height) / 6) * 0.95;
    this.adventMessage =  messages[day - 1];

    this.x = ( 0.04 * calendar.width + ((day- 1) % 4) * (1.1 * this.width) );
    this.y = - ( 0.96 * calendar.height - Math.floor((day - 1) / 4) * (1.1 * this.height) );

    allThePopups[day] = popupFactory({ title: 'Day ' + day, content: this.adventMessage });
    this.day = day;

    this.content = function() { 

	var node = document.createElement("li");
	document.getElementById("adventDoors").appendChild(node);
	node.id = "door" + day;
	node.style.cssText = "width: " + this.width + "px; height: " + this.height + "px; top: " + this.y + "px; left: " + this.x + "px;";

	var innerNode = document.createElement("a");
	document.getElementById("door" + day).appendChild(innerNode);
	innerNode.innerHTML = day;
	innerNode.href = "#";

	if( ( currentDate.getMonth() + 1 ) < 12 || currentDate.getDate() < day ) {
	    innerNode.className = "disabled";
	    innerNode.onclick = function() {
		return false;
	    }
	} else {
	    var thisDay = this.day;
	    var adventMessage = this.adventMessage;
	    innerNode.onclick = function() {
		popupFactory({ title: 'Day ' + thisDay, content: adventMessage }).openPopup();
		return false;
	    }
	}
    };
}

(function() {
    var doors = [];

    for(var i = 0; i < 24; i++) {

	doors[i] = new Door(myCal, i + 1);
	doors[i].content();

    }

    return doors;
})();

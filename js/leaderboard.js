const container = document.querySelector('container');

let leaderBoard = [	"Robert", "3", "16", "0:25" ];
const leaderBoardHeaders = ["Name", "Total Stars", "Total Moves", "Time"];

function makeGrid() {

var table = document.createElement('table');

	var tHead = document.createElement('thead');
	var tr = document.createElement("tr");

	for(let i = 0; i < leaderBoardHeaders.length; i++) {
		let th = document.createElement('th');
		let thText = document.createTextNode('');
		th.appendChild(thText);
		tr.appendChild(th);
		tHead.appendChild(tr);
		table.appendChild(tHead);
	}

	var tBody = document.createElement('tbody');
	
	for (var i = 0; i < leaderBoard.length + 1; i++) {
	    var tr = document.createElement('tr');
	    tr.id = ("row" + i);   

	   	for(let j = 0; j < leaderBoardHeaders.length; j++) {
	
		    var td = document.createElement('td');
		    var text1 = document.createTextNode('');
	    	td.appendChild(text1);
	    	tr.appendChild(td);
    	}
	    tBody.appendChild(tr);
	    table.appendChild(tBody);
	}
	document.body.appendChild(table);
};

function fillTables() {

	let ths = document.querySelectorAll("th");
	for(let i = 0; i < leaderBoardHeaders.length; i++) {
		ths[i].innerHTML = leaderBoardHeaders[i];
	}

	let tds = document.querySelectorAll("td");
	for(let i = 0; i < leaderBoard.length; i++) {
		tds[i].innerHTML = leaderBoard[i];
	}
}

makeGrid();
fillTables();
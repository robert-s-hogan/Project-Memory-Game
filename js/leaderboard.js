const container = document.querySelector('container');

let leaderBoard = ["apple", "basdf", "casdf", "dasdf", "eadsf", "fasdf", "gasdf", "hasdf", "iasdf", "jasdf"];
const leaderBoardHeaders = ["Name", "Total Stars", "Total Moves", "Time"];

function makeGrid() {

var table = document.createElement('table');

	for (var i = 0; i < totalScores; i++) {

	    var tr = document.createElement('tr');
	    tr.id = ("row" + i);   

	    for(let j = 0; j < totalScores; j++) {

		    var td1 = document.createElement('td');
		    var text1 = document.createTextNode('');
		    td1.appendChild(text1);
	    }

	    tr.appendChild(td1);
	    table.appendChild(tr);
	}
	document.body.appendChild(table);
};

function fillTables() {

	let tds = document.querySelectorAll("td");
	for(let i = 0; i < leaderBoard.length; i++) {
		tds[i].innerHTML = leaderBoard[i];
		console.log(tds[i]);
	}
}

makeGrid();
fillTables();
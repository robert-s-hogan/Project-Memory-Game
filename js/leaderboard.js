const container = document.querySelector('container');

let leaderBoard = [	"Robert", "3", "16", "0:25", 
					"Jessica", "3", "16", "0:25",
					"Dominic", "2", "20", "0:30" ];
const leaderBoardHeaders = ["Name", "Total Stars", "Total Moves", "Time"];

function makeGrid() {

	var table = document.createElement('table');
	table.classList.add("table", "table-sm", "table-hover");

	var tHead = document.createElement('thead');
	// tHead.classList.add("thead-dark");
	var tr = document.createElement("tr");
	tr.classList.add('table-info');

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
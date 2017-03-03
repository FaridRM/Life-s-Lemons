var lemons = 0;//Our currency in the game
var upgrades = 1;
var pickers = 0; 
var farmers = 0;

var increment = 1;
var union = 1;
var tool = 1;

function lemonClick(number){//Everytime the button is pressed, this function activates. "Number" is the 1 in the html document. So by pressing the button, the currency is increased by 1.
	lemons = lemons + number;//Remember, the = sign in programing does not mean "Equals." It means, assign the value on the right to the value on the left.
	document.getElementById('lemons').innerHTML = lemons;
};

//function clickIncrement(){
	//document.getElementById('upgrade').onclick = function() { lemonClick(increment); }
	//increment++;
//};

function clickIncrement(){
	var clickerCost = Math.floor(10 * Math.pow(1.5,increment));
	if(lemons >= clickerCost){
		document.getElementById('upgrade').onclick = function() { lemonClick(increment); }
		increment++;
		lemons = lemons - clickerCost;
		document.getElementById('clicker').innerHTML = increment -1;
		document.getElementById('lemons').innerHTML = lemons;
		document.getElementById('CPS').innerHTML = increment;
	};
	var nextCost = Math.floor(10 * Math.pow(1.5,increment));
	document.getElementById('clickerCost').innerHTML = nextCost;
};

function clickTool(){
	var toolLemonCost = Math.floor(100 * Math.pow(1.1,tool));
	var toolPickerCost = Math.floor(10 * Math.pow(1.1,tool));
	if(lemons >= toolLemonCost && pickers >= toolPickerCost){
		tool++;
		lemons = lemons - toolPickerCost;
		pickers = pickers - toolPickerCost;
		document.getElementById('tools').innerHTML = tool;
		document.getElementById('lemons').innerHTML = lemons;
		document.getElementById('toolPS').innerHTML = tool;
		document.getElementById('pickers').innerHTML = tool;
		document.getElementById('pickerPS').innerHTML = pickers * tool;
	};
	var nextLemonCost = Math.floor(100 * Math.pow(1.1,tool));
	var nextPickerCost = Math.floor(10 * Math.pow(1.1,tool));
	document.getElementById('toolLemonCost').innerHTML = nextLemonCost;
	document.getElementById('toolPickerCost').innerHTML = nextPickerCost;
};

function clickUnion(){
	var unionLemonCost = Math.floor(1000 * Math.pow(1.1,union));
	var unionFarmerCost = Math.floor(10 * Math.pow(1.1,union));
	if(lemons >= unionLemonCost && farmers >= unionFarmerCost){
		union++;
		lemons = lemons - unionFarmerCost;
		farmers = farmers - unionFarmerCost;
		document.getElementById('union').innerHTML = union;
		document.getElementById('lemons').innerHTML = lemons;
		document.getElementById('unionPS').innerHTML = union;
		document.getElementById('farmer').innerHTML = farmers;
		document.getElementById('farmerPS').innerHTML = farmers * (10 * union);
	};
	var nextLemonCost = Math.floor(1000 * Math.pow(1.1,union));
	var nextFarmerCost = Math.floor(10 * Math.pow(1.1,union));
	document.getElementById('unionLemonCost').innerHTML = nextLemonCost;
	document.getElementById('unionFarmerCost').innerHTML = nextFarmerCost;
};

function buyPicker(){
	var pickerCost = Math.floor(10 * Math.pow(1.1,pickers));
	if(lemons >= pickerCost){
		pickers++;
		lemons = lemons - pickerCost;
		document.getElementById('pickers').innerHTML = pickers;
		document.getElementById('pickerPS').innerHTML = pickers * tool;
		document.getElementById('lemons').innerHTML = lemons;
	};
	var nextCost = Math.floor(10 * Math.pow(1.1,pickers));
	document.getElementById('pickerCost').innerHTML = nextCost;
};

function buyFarmer(){
	var farmerCost = Math.floor(100 * Math.pow(1.1,farmers));
	if(lemons >= farmerCost){
		farmers++;
		lemons = lemons - farmerCost;
		document.getElementById('farmer').innerHTML = farmers;
		document.getElementById('lemons').innerHTML = lemons;
		document.getElementById('farmerPS').innerHTML = farmers * (10 * union);
	};
	var nextCost = Math.floor(100 * Math.pow(1.1,farmers));
	document.getElementById('farmerCost').innerHTML = nextCost;
};



function wipeSave(){
	localStorage.removeItem("save")
	
};


function save(){
	var save = {
		lemons: lemons,
		pickers: pickers,
		farmers: farmers,
		increment: increment,
		union: union,
		tool: tool,
		
		
		//prestige: prestige
	};
	localStorage.setItem('save',JSON.stringify(save));
};

function load(){
	var savegame = JSON.parse(localStorage.getItem('save'));
	if (typeof savegame.lemons !== "undefined") lemons = savegame.lemons
	if (typeof savegame.pickers !== "undefined") pickers = savegame.pickers
	if (typeof savegame.farmers !== "undefined") farmers = savegame.farmers
	if (typeof savegame.increment !== "undefined") increment = savegame.increment
	if (typeof savegame.union !== "undefined") union = savegame.union
	if (typeof savegame.tool !== "undefined") tool = savegame.tool
//	if (!Date.now){
		
//	};
	//if (typeof savegame.SOMETHING !== "undefined") SOMETHING = savegame.SOMETHING
}

window.onload = function(){
	load();
	document.getElementById('pickers').innerHTML = pickers;
	document.getElementById('lemons').innerHTML = lemons;
	document.getElementById('pickerPS').innerHTML = pickers;
	document.getElementById('farmer').innerHTML = farmers;
	document.getElementById('farmerPS').innerHTML = farmers;
	document.getElementById('clicker').innerHTML = increment -1;
	document.getElementById('CPS').innerHTML = increment;
	document.getElementById('union').innerHTML = union;
	document.getElementById('unionPS').innerHTML = union;
	document.getElementById('tools').innerHTML = tool;
	document.getElementById('toolPS').innerHTML = tool;
	if(increment > 1){
		document.getElementById('upgrade').onclick = function() { lemonClick(increment); };
	}
	//document.getElementById('pickerCost').innerHTML = nextCost;
}

window.setInterval(function(){
	//Date.now();
	lemonClick(pickers * tool);
	lemonClick(farmers * (10 * union));
	save();
}, 1000);
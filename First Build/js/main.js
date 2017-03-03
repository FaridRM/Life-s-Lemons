var lemons = 0;//Our currency in the game
var buildings = {pickers:0, farmers:0};
var upgrades = {increment:1, union:1, tool:1};

//var upgrades.increment = 1;
//var upgrades.union = 1;
//var upgrades.tool = 1;

function lemonClick(number){//Each time the player clicks, they gain a lemon.
	lemons = lemons + number;//Initially this gives the player one lemon. Combined with clickIncrement however, it increases how many lemons the player receives with each click.
	document.getElementById('lemons').textContent = lemons;
};

function clickIncrement(){
	var clickerCost = Math.floor(10 * Math.pow(1.5,upgrades.increment));
	if(lemons >= clickerCost){
		document.getElementById('upgrade').onclick = function() { lemonClick(upgrades.increment); }//Increases the amount of lemons each click gives.
		upgrades.increment++;
		lemons = lemons - clickerCost;
		document.getElementById('clicker').textContent = upgrades.increment -1;
		document.getElementById('lemons').textContent = lemons;
		document.getElementById('CPS').textContent = upgrades.increment;
	};
	var nextCost = Math.floor(10 * Math.pow(1.5,upgrades.increment));
	document.getElementById('clickerCost').textContent = nextCost;
};

function clickTool(){
	var toolLemonCost = Math.floor(100 * Math.pow(1.1,upgrades.tool));
	var toolPickerCost = Math.floor(10 * Math.pow(1.1,upgrades.tool));
	if(lemons >= toolLemonCost && buildings.pickers >= toolPickerCost){
		upgrades.tool++;
		lemons = lemons - toolPickerCost;
		buildings.pickers = buildings.pickers - toolPickerCost;
		document.getElementById('tools').textContent = upgrades.tool;
		document.getElementById('lemons').textContent = lemons;
		document.getElementById('toolPS').textContent = upgrades.tool;
		document.getElementById('picker').textContent = upgrades.tool;
		document.getElementById('pickerPS').textContent = buildings.pickers * upgrades.tool;
	};
	var nextLemonCost = Math.floor(100 * Math.pow(1.1,upgrades.tool));
	var nextPickerCost = Math.floor(10 * Math.pow(1.1,upgrades.tool));
	document.getElementById('toolLemonCost').textContent = nextLemonCost;
	document.getElementById('toolPickerCost').textContent = nextPickerCost;
};

function clickUnion(){
	var unionLemonCost = Math.floor(1000 * Math.pow(1.1,upgrades.union));
	var unionFarmerCost = Math.floor(10 * Math.pow(1.1,upgrades.union));
	if(lemons >= unionLemonCost && buildings.farmers >= unionFarmerCost){
		upgrades.union++;
		lemons = lemons - unionFarmerCost;
		buildings.farmers = buildings.farmers - unionFarmerCost;
		updateBuilding('union','unionPS', upgrades.union,1,1);
		updateBuilding('farmer','farmerPS', buildings.farmers,upgrades.union,10);
	};
	var nextLemonCost = Math.floor(1000 * Math.pow(1.1,upgrades.union));
	var nextFarmerCost = Math.floor(10 * Math.pow(1.1,upgrades.union));
	document.getElementById('unionLemonCost').textContent = nextLemonCost;
	document.getElementById('unionFarmerCost').textContent = nextFarmerCost;
};

function buyPicker(){//This is the first building function. The cost
	//buyBuilding(pickerCost,buildings.pickers,upgrades.tool,1, 'buildings.pickers','pickerPS','pickerCost');
	var pickerCost = Math.floor(10 * Math.pow(1.1,buildings.pickers));
	if(lemons >= pickerCost){
		buildings.pickers++;
		lemons = lemons - pickerCost;
		updateBuilding('picker','pickerPS', buildings.pickers,upgrades.tool,1);
	};
	var nextCost = Math.floor(10 * Math.pow(1.1,buildings.pickers));
	document.getElementById('pickerCost').textContent = nextCost;
};

function buyFarmer(){
	var farmerCost = Math.floor(100 * Math.pow(1.1,buildings.farmers));
	if(lemons >= farmerCost){
		buildings.farmers++;
		lemons = lemons - farmerCost;
		updateBuilding('farmer','farmerPS', buildings.farmers,upgrades.union,10);
	};
	var nextCost = Math.floor(100 * Math.pow(1.1,buildings.farmers));
	document.getElementById('farmerCost').textContent = nextCost;
};

function buyOrchard(){
	var cost = Math.floor(1000 * Math.pow(1.1,orchards));
	if(lemons >= cost){
		orchards++;
		lemons = lemons - cost;
		updateBuilding('orchard','orchardPS', orchards,1,100)
	};
	var nextCost = Math.floor(1000 * Math.pow(1.1,orchards));
	document.getElementById('orchardCost').textContent = nextCost;
};

/*function buyBuilding(cost,building,upgrade,adjustPS, buildingHTML,buildPSHTML,buildCostHTML){
	cost = Math.floor(10 * Math.pow(1.1,building));
	if(lemons >= cost){
		lemons = lemons - cost;
		building++;
		updateBuilding(buildingHTML,buildPSHTML, building,upgrade,adjustPS);
		return building;
	};
	var nextCost = Math.floor(10 * Math.pow(1.1,building));
	document.getElementById(buildCostHTML).textContent = nextCost;

};*/


function wipeSave(){
	localStorage.removeItem("save")

};


function save(){
	var save = {
		lemons: lemons,
		'buildings.pickers': buildings.pickers,
		'buildings.farmers': buildings.farmers,
		'upgrades.increment': upgrades.increment,
		'upgrades.union': upgrades.union,
		'upgrades.tool': upgrades.tool,


		//prestige: prestige
	};
	localStorage.setItem('save',JSON.stringify(save));
};

function load(){
	var savegame = JSON.parse(localStorage.getItem('save'));
	if (typeof savegame.lemons !== "undefined") lemons = savegame.lemons
	if (typeof savegame['buildings.pickers'] !== "undefined") buildings.pickers = savegame['buildings.pickers']
	if (typeof savegame['buildings.farmers'] !== "undefined") buildings.farmers = savegame['buildings.farmers']
	if (typeof savegame['upgrades.increment'] !== "undefined") upgrades.increment = savegame['upgrades.increment']
	if (typeof savegame['upgrades.union'] !== "undefined") upgrades.union = savegame['upgrades.union']
	if (typeof savegame['upgrades.tool'] !== "undefined") upgrades.tool = savegame['upgrades.tool']
	//if (typeof savegame.SOMETHING !== "undefined") SOMETHING = savegame.SOMETHING
}

window.onload = function(){
	load();
	document.getElementById('picker').textContent = buildings.pickers;
	document.getElementById('lemons').textContent = lemons;
	document.getElementById('pickerPS').textContent = buildings.pickers * upgrades.tool;
	document.getElementById('farmer').textContent = buildings.farmers;
	document.getElementById('farmerPS').textContent = buildings.farmers * (10 * upgrades.union);
	document.getElementById('clicker').textContent = upgrades.increment -1;
	document.getElementById('CPS').textContent = upgrades.increment;
	document.getElementById('union').textContent = upgrades.union;
	document.getElementById('unionPS').textContent = upgrades.union;
	document.getElementById('tools').textContent = upgrades.tool;
	document.getElementById('toolPS').textContent = upgrades.tool;
	if(upgrades.increment > 1){
		document.getElementById('upgrade').onclick = function() { lemonClick(upgrades.increment); };
	}
	//document.getElementById('pickerCost').textContent = nextCost;
}

window.setInterval(function(){
	//Date.now();
	lemonClick(buildings.pickers * upgrades.tool);
	lemonClick(buildings.farmers * (10 * upgrades.union));
	save();
}, 1000);

function updateBuilding(buildingHTML,buildPSHTML, building,upgrade,adjustPS){
	document.getElementById(buildingHTML).textContent = building;
	document.getElementById(buildPSHTML).textContent = building * (adjustPS * upgrade);
	document.getElementById('lemons').textContent = lemons;
};

function buildingCost(cost, building){
	var cost = Math.floor(10 * Math.pow(1.1,building));
	return cost;
};

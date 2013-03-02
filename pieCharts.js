$(document).ready(function() {
	loadALLDistrictTotalPieChart(allDistrictsJSON);
});

function loadALLDistrictTotalPieChart(sortedDistrictData) {
	for(data in sortedDistrictData) {
		var chart = setupForSpecificDistrict(sortedDistrictData);

		var combinedRates = sortedDistrictData[data].rates;
		var maleRates = sortedDistrictData[data].male_rates;
		var femaleRates = sortedDistrictData[data].female_rates;

		var processedCombinedRates = processRates(combinedRates);
		var rateArray = [];
		for(var i=1;i<processedCombinedRates.length;i++) {
			rateArray.push(processedCombinedRates[i].value);
			console.log(processedCombinedRates[i].value);
		}
		var processedMaleRates = processRates(maleRates);
		var processedFemaleRates = processRates(femaleRates);
		
		var totalCombinedLearners = processedCombinedRates[0].value;
		var totalMaleLearners = processedMaleRates[0].value;
		var totalFemaleLearners = processedFemaleRates[0].value;

		showCombinedRatesDetailChart(chart, rateArray, totalCombinedLearners);

		var malePassRate = calculatePassRate(processedMaleRates);
		var femalePassRate = calculatePassRate(processedFemaleRates);

		loadMaleFemaleComparisonCharts(malePassRate, femalePassRate, totalMaleLearners, totalFemaleLearners);
		
	}
}

function setupForSpecificDistrict(dataForDistrict) {
		d3.select("body")
		.append("div")
		.attr("class", "lead")
		.text(dataForDistrict[data].district + " " + dataForDistrict[data].year);
	
}

function showCombinedRatesDetailChart(chart, combinedRateData, totalLearnersInDistrict) {

var dataset = {
	combined : combinedRateData
};

var width = 560,
    height = 500,
    radius = Math.min(width, height) / 2;

	var color = d3.scale.ordinal()
    .range(["#dd514c", "#faa732", "#7b6888", "#9773b0", "#bc85df", "#4bb1cf", "#5eb95e"]);

	var pie = d3.layout.pie()
	    .sort(null);

	var arc = d3.svg.arc()
	    .innerRadius(radius - 100)
	    .outerRadius(radius - 20);

	var svg = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


	var g = svg.selectAll("path")
	    .data(pie(dataset.combined))
	  	.enter()
		  	.append("path")
		    .attr("fill", function(d, i) { 
		    	return color(i); })
		    .attr("d", arc)
		    
    g.append("div") 
	    .style("text-anchor", "middle")
    	.text("boo");

}

function loadMaleFemaleComparisonCharts(malePassRate, femalePassRate, totalMaleLearners, totalFemaleLearners) {
	var dataset = {
	combined : [(360*(malePassRate/totalMaleLearners)), (360*(femalePassRate/totalFemaleLearners))]
};


var width = 560,
    height = 500,
    radius = Math.min(width, height) / 2;

	var color = d3.scale.ordinal()
    .range(["#4bb1cf", "#5eb95e"]);

	var pie = d3.layout.pie()
	    .sort(null);

	var arc = d3.svg.arc()
	    .innerRadius(radius - 100)
	    .outerRadius(radius - 20);

	var svg = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


	var g = svg.selectAll("path")
	    .data(pie(dataset.combined))
	  	.enter()
		  	.append("path")
		    .attr("fill", function(d, i) { 
		    	return color(i); })
		    .attr("d", arc)
		    
    g.append("div") 
	    .style("text-anchor", "middle")
    	.text("boo");


	
}

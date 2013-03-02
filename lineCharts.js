$(document).ready(function() {
	loadALLDistrictTotalBarChart(allDistrictsJSON);
});

function loadALLDistrictTotalBarChart(sortedDistrictData) {
	for(data in sortedDistrictData) {
		var chart = setupForSpecificDistrict(sortedDistrictData);

		var combinedRates = sortedDistrictData[data].rates;
		var maleRates = sortedDistrictData[data].male_rates;
		var femaleRates = sortedDistrictData[data].female_rates;

		var processedCombinedRates = processRates(combinedRates);
		var processedMaleRates = processRates(maleRates);
		var processedFemaleRates = processRates(femaleRates);
		
		var totalCombinedLearners = processedCombinedRates[0].value;
		var totalMaleLearners = processedMaleRates[0].value;
		var totalFemaleLearners = processedFemaleRates[0].value;

		showCombinedRatesDetailChart(chart, processedCombinedRates, totalCombinedLearners);

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
		
	var chart = d3.select("body")
		.append("div")
		.attr("class", "chart progress")
		.style("width", "1000px");

	return chart;
}

function showCombinedRatesDetailChart(chart, combinedRateData, totalLearnersInDistrict) {
	chart.selectAll("div")
		.data(combinedRateData)
			.enter()
			.append("div")
			.attr("class", function(d) {
				if(d.title!="learners_wrote") {
				 	return d.title + " bar";
				 }
			})
			.style("width", function(d) { 
				if(d.title=="learners_wrote") {
					totalLearnersInDistrict = d.value;
				}
				else return ((d.value/totalLearnersInDistrict)*1000) + "px"; })
			.attr("title", function(d) { return d.value + " learners"})
			.text(function(d) { 
				 if(d.title!="learners_wrote") {
				 	return d.title + ": " + parseInt((d.value/totalLearnersInDistrict)*100) + "%";
				 }
			});

}

function loadMaleFemaleComparisonCharts(malePassRate, femalePassRate, totalMaleLearners, totalFemaleLearners) {
	var maleFemaleComparisonBar = d3.select("body")
			.append("div")
			.attr("class", "progress chart")
			.style("width", "1000px")

		maleFemaleComparisonBar
			.append("div")
			.attr("class", "bar pass_60_69")
			.style("width", parseInt(500*(malePassRate/totalMaleLearners)) + "px")
			.text(parseInt((malePassRate/totalMaleLearners)*100) + "% males passed");
				
		maleFemaleComparisonBar
			.append("div")
			.attr("class", "bar pass_80_100")
			.style("width", parseInt(500*(femalePassRate/totalFemaleLearners)) + "px")
			.text(parseInt((femalePassRate/totalFemaleLearners)*100) + "% females passed");
}

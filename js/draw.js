var mapData = {};
var curYear = 2011;
/* generate bar chart */
var barchart = d3.select("#barchart").append("svg");
barchart.attr("height", "200px").attr("width", "1000px").attr("id", "barchart_svg");


/* generate map */
var map = new Datamap({
    scope: 'world',
    element: document.getElementById('map'),
    fills: {
        // default color is the country without data
        defaultFill: 'rgba(200,200,200,0.5)'
    },
    geographyConfig: {
        highlightFillColor: '#4F75B4', // dark blue
        popupTemplate: function(geo, data) {
            if (mapData[geo.id])
                return '<div class="hoverinfo"><strong>'+geo.id + ' : ' + geo.properties.name +'</strong><br/>cpi : '+mapData[geo.id]+ 
                        '<br/>year : ' + curYear +'</div>';
            else
                return '<div class="hoverinfo"><strong>'+geo.id + ' : ' + geo.properties.name +'</strong><br/>cpi : N/A<br/>year : ' + curYear + '</div>';
        }
    }
});

function updateMap(year) {
    var dataset = {};
    d3.csv("data/csv/cpi" + year + ".csv", function(data){
        for (i = 0; i < data.length; i++) {
            dataset[data[i].ID] = colorScale(data[i].CPI);
            mapData[data[i].ID] = data[i].CPI;
            //console.log(dataset);
        }
        map.updateChoropleth(dataset);
    });
    
}

function colorScale(cpi) {
    var colorScaleGYR = d3.scale.linear().domain([0,5,10]).range(["#fc8d59","#ffffbf","#91cf60"]);
    //console.log(colorScaleGYR(cpi));
    return colorScaleGYR(cpi);
}

function drawBarChart(countryID) {
    var dataset = {};
    var height =200;
    var width = 1000;
    var xScale = d3.scale.linear().domain([1995,2015]).range([30, 800]);
    var yScale = d3.scale.linear().domain([0,10]).range([200, 20]);
    for (y = 1995; y < 2015; y++) {
        d3.csv("data/csv/cpi" + y + ".csv", function(csv){
            for(i = 0; i < csv.length; i++) {
                var entry = csv[i];
                if (entry.ID == countryID) {
                    d3.select("#barchart_svg")
                        .append("rect")
                        .attr("x", function(){
                            return (width / 20) * (entry.Year - 1995) * 0.95 + 30;
                        })
                        .attr("y", function(){
                            return yScale(entry.CPI);
                        })
                        .attr("height", function(){
                            return 180 - yScale(entry.CPI);
                        })
                        .attr("width", function(){
                            return 0.90 * width / 20;
                        })
                        .attr("fill", '#4F75B4')
                } 
            }
        });
    }
    var xAxis = d3.svg.axis().scale(xScale);
    var yAxis = d3.svg.axis().scale(yScale);
    yAxis.orient("left");
    var xAxisSel = 
    d3.select("svg") // or something else that selects the SVG element in your visualizations
        .append("g") // create a group node
        .attr("transform", "translate(0, 180)")
        .call(xAxis); // call the axis generator

    d3.select("svg") // or something else that selects the SVG element in your visualizations
        .append("g") // create a group node
        .attr("transform", "translate(30, -20)")
    .call(yAxis); // call the axis generator
}


drawBarChart("USA");
updateMap(2011);



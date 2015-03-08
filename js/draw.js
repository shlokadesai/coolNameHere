var mapData = {};
var curYear = 2011;
/* generate bar chart */
var barchart = d3.select("#barchart").append("svg");
barchart.attr("height", "200px").attr("width", "500px").attr("id", "barchart_svg");

/* generate map */
var map = new Datamap({
    scope: 'world',
    element: document.getElementById('map'),
    fills: {
        // default color is the country without data
        defaultFill: 'rgba(200,200,200,0.5)'
    },
    done: function(datamap) {
        datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
            drawBarChart(geography.id);
        });
    },
    geographyConfig: {
        highlightFillColor: '#4F75B4', // dark blue
        popupTemplate: function(geo, data) {
            if (mapData[geo.id])
                return '<div class="hoverinfo"><strong>'+geo.id + ' : ' + geo.properties.name +'</strong><br/>cpi : '+mapData[geo.id]+ 
                        '<br/>year : ' + curYear +'</div><script>drawBarChart('+geo.id+');</script>';
            else
                return '<div class="hoverinfo"><strong>'+geo.id + ' : ' + geo.properties.name +'</strong><br/>cpi : N/A<br/>year : ' + curYear + '</div>';
        }
    }
});

function updateMap(year) {
    var dataset = {};
    d3.csv("data/rapeDataTest.csv", function(data){
        var max = d3.max(data, function(row){
            return +row.Count;
        });
        //console.log(max);
        var colorScaleGYR = d3.scale.linear().domain([0,Math.log(max)/2,Math.log(max)]).range(["#ffeda0","#feb24c", "#f03b20"]);
        for (i = 0; i < data.length; i++) {
            if(data[i].Year == year)
            {
                if (data[i].Count >= 0) {
                    dataset[data[i].ID] = colorScaleGYR(Math.log(data[i].Count));
                    mapData[data[i].ID] = data[i].Count;
                }
            }
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
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;
    d3.csv("data/rapeDataTest.csv", function(csv){
        //console.log("hello!");
        var yearExtent = d3.extent(csv, function(row){ return +row.Year; })
        var maxCount = d3.max(csv, function(row){return +row.Count;}); 
        var xScale = d3.scale.ordinal().domain(csv.map(function(d){return d.Year;})).rangeBands([54, width]);
        var yScale = d3.scale.linear().domain([0,maxCount]).range([height,0]);
        var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
        var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);;
        
        for(i = 0; i < csv.length; i++) {
            var entry = csv[i];
            //console.log(entry);
            if (entry.ID == countryID && entry.Count >= 0) {
                d3.select("#barchart_svg")
                    .append("rect")
                    .attr("x", function(){
                        return xScale(entry.Year)+0.02*xScale.rangeBand();
                    })
                    .attr("y", function(){
                        return yScale(entry.Count);
                    })
                    .attr("height", function(){
                        return height - yScale(entry.Count);
                    })
                    .attr("width", function(){
                        return xScale.rangeBand()*0.96;
                    })
                    .attr("fill", '#4F75B4')
                    .attr("id", entry.Year)
            } 
        }
        var xAxisSel = 
        d3.select("svg") // or something else that selects the SVG element in your visualizations
            .append("g") // create a group node
            .attr("transform", "translate(0, "+height+")")
            .attr("class", "axis")
            .call(xAxis); // call the axis generator
        var yAxisSel =
        d3.select("svg") // or something else that selects the SVG element in your visualizations
            .append("g") // create a group node
            .attr("transform", "translate(60,0)")
            .attr("class", "axis")
            .call(yAxis); // call the axis generator
    });
}

drawBarChart("USA");
updateMap(2010);



var mapData = {};
var curYear = 2012;
var margin = {top: 20, right: 20, bottom: 0, left: 40},
    width = 1000 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom;
/* generate bar chart */
var barchart = d3.select("#barchart").append("svg");
barchart.attr("height", "150px").attr("width", "1000px").attr("id", "barchart_svg");
d3.csv("static/data/rapeDataSum.csv", function(data){
    var max = d3.max(data, function(row){
        //console.log(row);
        return +row.Count;
    });
    console.log(max);
    var xScale = d3.scale.ordinal().domain(data.map(function(d){return d.Year;})).rangeBands([54, width]);
    var yScaleSum = d3.scale.linear().domain([0,max]).range([height,0]);
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    var yAxis = d3.svg.axis().scale(yScaleSum).orient("left").ticks(4);
    for(i = 0; i < data.length; i++) {
        var entry = data[i];
        //console.log(entry);
        d3.select("#barchart_svg")
            .append("rect")
            .attr("x", function(){
                return xScale(entry.Year)+0.2*xScale.rangeBand();
            })
            .attr("y", function(){
                return yScaleSum(entry.Count);
            })
            .attr("height", function(){
                return height - yScaleSum(entry.Count);
            })
            .attr("width", function(){
                return xScale.rangeBand()*0.6;
            })
            .attr("fill", '#4F75B4')
            .attr("id", "b" + entry.Year)
            .attr("class", "bar")
            .on("click", function(){
                updateMap(this.id.substring(1));
                curYear = +this.id.substring(1);
                d3.select("#yIndicator").transition().attr("x", xScale(curYear)+0.2*xScale.rangeBand());
            })
    }
    var xAxisSel = 
    d3.select("svg") // or something else that selects the SVG element in your visualizations
        .append("g") // create a group node
        .attr("transform", "translate(0, "+height+")")
        .attr("class", "axis")
        .attr("id", "x-axis")
        .call(xAxis); // call the axis generator
    var yAxisSel =
    d3.select("svg") // or something else that selects the SVG element in your visualizations
        .append("g") // create a group node
        .attr("transform", "translate(60,0)")
        .attr("class", "axis")
        .attr("id", "y-axis")
        .call(yAxis) // call the axis generator
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Count");
    d3.select("svg").append("rect").attr("id", "yIndicator").attr("x", xScale(curYear)+0.2*xScale.rangeBand())
    .attr("y", height).attr("width",xScale.rangeBand()*0.6).attr("height", 5)
});

/* draw year indicator */
updateMap(2012);


function click() {
    console.log("click")
}

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
            d3.select("#cIndicator").text(geography.properties.name);
            updateBarChart(geography.id);
        });
    },
    geographyConfig: {
        highlightFillColor: '#4F75B4', // dark blue
        popupTemplate: function(geo, data) {
            if (mapData[geo.id])
                return '<div class="hoverinfo"><strong>'+geo.id + ' : ' + geo.properties.name +'</strong><br/>counts : '+mapData[geo.id]+ 
                        '<br/>year : ' + curYear +'</div><script>drawBarChart('+geo.id+');</script>';
            else
                return '<div class="hoverinfo"><strong>'+geo.id + ' : ' + geo.properties.name +'</strong><br/>counts : N/A<br/>year : ' + curYear + '</div>';
        }
    }
});

function updateMap(year) {
    console.log(year);
    var dataset = {};
    d3.selectAll(".datamaps-subunit").attr("fill","rgba(200,200,200,0.5)");
    d3.csv("static/data/rapeDataTest.csv", function(data){
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
                if (data[i].Count < 0) {
                    dataset[data[i].ID] = "rgba(200,200,200,0.5)";
                }
            }
            //console.log(dataset);
        }
        var g = d3.select("#map").select("svg").append("g")
        .attr("class", "key")
        .attr("transform", "translate( 20 , 200)");
        var o = d3.scale.ordinal().domain(d3.range(50)).rangePoints([0,Math.log(max)])
        var legendData = o.range();;
        g.selectAll("rect")
            .data(legendData)
          .enter().append("rect")
            .attr("height", function(d,i) {return 150 - 3 * i; })
            .attr("x", 100)
            .attr("width", 25)
            .style("fill", function(d) {return colorScaleGYR(d); });
        g.append("text").text("high").attr("x", 75)
         g.append("text").text("low").attr("x", 75).attr("y", 160);
        map.updateChoropleth(dataset);
    });
    
}


function updateBarChart(countryID) {
    d3.csv("static/data/rapeDataTest.csv", function(csv){
        var yearExtent = d3.extent(csv, function(row){ return +row.Year; })
        var maxCount = d3.max(csv, function(row){
            if(row.ID == countryID)
                return +row.Count;
            else
                return -1; 
            });
        if (maxCount < 0) {
            maxCount = 0;
            d3.selectAll(".bar").attr("y", function(){return 0;}).attr("height", function(){return height;}).attr('fill', 'rgba(200,200,200,0.5)');
        }
        var xScale = d3.scale.ordinal().domain(csv.map(function(d){return d.Year;})).rangeBands([54, width]);
        var yScale = d3.scale.linear().domain([0,maxCount]).range([height,0]);
        var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(4);
        d3.select("#y-axis").transition().ease("sin-in-out").call(yAxis);
        for(i = 0; i < csv.length; i++) {
            var entry = csv[i];
            if (entry.ID == countryID) {
                if (entry.Count > 0){
                    d3.select("#b" + entry.Year).transition().attr("y", function(){return yScale(entry.Count);})
                    .attr("height", function(){return height - yScale(entry.Count);}).attr("fill", '#4F75B4');
                }
                else {
                    d3.select("#b" + entry.Year).attr("y", function(){return yScale(maxCount);})
                    .attr("height", function(){return height - yScale(maxCount);}).attr('fill', 'rgba(200,200,200,0.5)');
                }
            } 
        }

        
    });
}



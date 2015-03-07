var mapData = {};
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
            //console.log(geo);
            if (mapData[geo.id])
                return '<div class="hoverinfo"><strong>'+geo.id + ' : ' + geo.properties.name +'</strong><br/>cpi : '+mapData[geo.id]+'</div>';
            else
                return '<div class="hoverinfo"><strong>'+geo.id + ' : ' + geo.properties.name +'</strong><br/>cpi : N/A</div>';
        }
    }
});

function updateMap(year) {
    dataset = {};
    d3.csv("data/csv/cpi" + year + ".csv", function(data){
        for (i = 0; i < data.length; i++) {
            //console.log(data[i]);
            dataset[data[i].ID] = colorScale(data[i].CPI);
            mapData[data[i].ID] = data[i].CPI;
            console.log(dataset);
        }
        console.log(dataset + "!");
        map.updateChoropleth(dataset);
    });
    
}

function colorScale(cpi) {
    console.log(cpi);
    var colorScaleGYR = d3.scale.linear().domain([0,5,10]).range(["#fc8d59","#ffffbf","#91cf60"]);
    console.log(colorScaleGYR(cpi));
    return colorScaleGYR(cpi);
}

updateMap(2011);



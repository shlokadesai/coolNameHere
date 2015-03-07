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
            console.log(geo);
            return '<div class="hoverinfo"><strong>'+geo.id + ' : ' + geo.properties.name+'</strong></div>';
        }
    }
});



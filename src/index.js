d3.json("https://data.cityofchicago.org/resource/ijzp-q8t2.geojson?location_zip", function(error, cityofchicago) {
    if (error) throw error;

    console.log(cityofchicago);


});
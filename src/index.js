d3.json("https://data.cityofchicago.org/resource/ijzp-q8t2.geojson?location_zip", function(error, cityofchicago) {
    if (error) throw error;

    console.log(cityofchicago);

    //Width and height
    var width = 900;
    var height = 500;

    // create a first guess for the projection
    var center = d3.geo.centroid(cityofchicago)
    var scale = 100;
    var projection = d3.geo.mercator().scale(scale).center(center);
    //Define path generator
    var path = d3.geo.path()
                    .projection(projection);

    // using the path determine the bounds of the current map and use
    // these to determine better values for the scale and translation
    var bounds = path.bounds(cityofchicago);
    var hscale = scale * width / (bounds[1][0] - bounds[0][0]);
    var vscale = scale * height / (bounds[1][1] - bounds[0][1]);
    var scale = (hscale < vscale) ? hscale : vscale;
    var offset = [width - (bounds[0][0] + bounds[1][0]) / 2,
                     height - (bounds[0][1] + bounds[1][1]) / 2];

    // new projection
    projection = d3.geo.mercator().center(center)
     .scale(scale * 0.9).translate(offset);
    path = path.projection(projection);

    //Create SVG element
    var svg = d3.select(".chart")
               .attr("width", width)
               .attr("height", height)

    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
      .data(cityofchicago.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "zipcode");
});
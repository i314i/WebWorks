$(document).ready(function(){
    var width = 640,
    height = 500,
    centered;

    var projection = d3.geo.mercator().center([120.979531, 23.978567]).scale(5000);
    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("svg#svgMap");
    svg.attr("width", width)
        .attr("height", height);

    svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height)
        .on("click", clicked);

    var g = svg.append("g");

    d3.json("json/twCounty2010.topo.json", function(error, us) {
        if (error) throw error;

        g.append("g")
            .attr("id", "states")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.layer1).features)
            .enter().append("path")
            .attr("d", path)
            .on("click", clicked);
    });

    function clicked(d) {
        var x, y, k;

        if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;
        } else {
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
        }

        g.selectAll("path")
            .classed("active", centered && function(d) { return d === centered; });

        g.selectAll("text").remove();
        g.transition()
            .duration(750)
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
            .style("stroke-width", 1.5 / k + "px");
        if(centered!==null){
            setTimeout(function(){
                g.append("text")
                    //.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + 0.1 + ")translate(" + x + "," + -y + ")")
                    .attr("transform", "translate("+x+","+y+")scale(0.3)")
                    .attr("dy", ".35em")
                    .style("text-anchor", "middle")
                    .text(function(d) { return "一切安好" });
            },750);
        }
    }
});

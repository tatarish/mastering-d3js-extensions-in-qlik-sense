define(["https://d3js.org/d3.v4.min.js"],
    function (d3) {
        return {
            initialProperties: {
                qHyperCubeDef: {
                    qInitialDataFetch: [{
                        qWidth: 2,
                        qHeight: 5000
                    }]
                }
            },
            definition: {
                type: "items",
                component: "accordion",
                items: {
                    dimensions: {
                        uses: "dimensions",
                        min: 1,
                        max: 1
                    },
                    measures: {
                        uses: "measures",
                        min: 1,
                        max: 1
                    }
                }
            },
            paint: function ($element, layout) {

                var hypercube = layout.qHyperCube;
                console.log(hypercube);

                var data = [];

                hypercube.qDataPages[0].qMatrix.forEach(function (qData) {
                    data.push({
                        "salesperson": qData[0].qText,
                        "sales": qData[1].qNum
                    })
                });

                console.log(data);

                //• 1 Delete the D3 testing code generated in previous lesson
                //var x = d3.scaleBand(); / debugger line
                // > Move to 2

                //-------------------------------------------               
                // START d3
                //-------------------------------------------
                //• 2 - Past the D3 code (from <script> to </script> excluded)
                // > F12: Console: there are Errors - Move to 3

                var margin = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40
                },
                    width = $element.width() - margin.left - margin.right,
                    height = $element.height() - margin.top - margin.bottom;

                var x = d3.scaleBand()
                    .range([0, width])
                    .padding(0.1);
                var y = d3.scaleLinear()
                    .range([height, 0]);

                var id = "ID_D3" + layout.qInfo.qId 
                
                //• 4 - The extension is empty, looking at the F12 "Element" select div.ng-scope we realize that the main svg is missing 
                // This is the main conteiner of our extension - svg is an html language to define 2D graphics - D3 will basically create and transform 2d graphic elements (vectors) to draw the chart
                // Instead of the body ( var svg = d3.select("body").append("svg")), we need to append the svg to your $element
                // > Use the element selector tool of F12 to show our element wrapper which is a div with the class ng-scope
                // D3 can select by claass (ng-scope in our case), but this is not good as there might be many element sharing the same class
                // As the method d3.select cannot select a jquery object definition, we set an "id" to it in order to identify it uniqly 
                // > F12: Elements:  The div ng-scope has the new id
                $element.attr("id", id); //assign to $element the attribute id set as "ID_D3"
                $('#' + id).empty()

                //• 5 - replace "body" with #ID_D3 - select the object with id (# stands for id) equal to "ID_D3"" which we have assigned earlier - then append a new svg element
                // > The chart appears! It's oversized and black and has other issues, will fix next lesson.
                var svg = d3.select('#' + id).append("svg") //d3
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

                //• 3a Identify the data.cvs and delete it (comment the last "})" as well in 3b
                // > F12: Console:no erors, extansion empty - Move to 4

                // get the data
                //d3.csv("sales.csv", function(error, data) {
                //if (error) throw error;

                data.forEach(function (d) {
                    d.sales = +d.sales;
                });

                x.domain(data.map(function (d) {
                    return d.salesperson;
                }));
                y.domain([0, d3.max(data, function (d) {
                    return d.sales;
                })]);


                svg.selectAll(".bar")  //A - for each object named "bar" inside <svg> apply the following
                    .data(data) // B1 - for each datapoint
                    .enter().append("rect") //B2 - create a rect element
                    .attr("class", "bar") // B3 - assign a class of bar 
                    .attr("x", function (d) {
                        return x(d.salesperson);
                    })
                    .attr("width", x.bandwidth()) //C - Define other properties
                    .attr("y", function (d) {
                        return y(d.sales);
                    })
                    .attr("height", function (d) {
                        return height - y(d.sales);
                    });

                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));

                svg.append("g")
                    .call(d3.axisLeft(y));

                //• 3b comment "})"
                //});


                //-------------------------------------------
                // END D3
                //-------------------------------------------
            }
        };
    });



/*---------------------------------------------------------------------------
Prep:
Left: Chrome with the app and the d3 source code
Right: Visual studio code on the previous state

Previous:
we loaded the d3 library

Goals:
Integrate the d3 code with your data array and plot the chart 

Lessons learned:
Basics of the d3 code integration
we plotted the chart

Next:
Will refine it making the chart responsive and make sure that the extension works properly (at this stage it has some issues..)

---------------------------------------------------------------------------*/
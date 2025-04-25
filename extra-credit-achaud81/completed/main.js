const tooltip = d3.select(".tooltip");

function pokemonDAG(data) {
    d3.select("#graph svg").remove();

    
    const hierarchy = { name: "Pokeball", children: [] };
    const types = {};

    data.forEach(entry => {
        const { Name, "Type 1": type1 } = entry;

        if (!types[type1]) {
            types[type1] = { name: type1, children: [] };
        }
        types[type1].children.push({ name: Name });
    });

    for (const type in types) {
        hierarchy.children.push(types[type]);
    }

    const width = 1200,
        height = 800;

    const root = d3.hierarchy(hierarchy).sum(d => (d.children ? d.children.length : 1));
    const nodes = root.descendants();
    const links = root.links();

    
    const colorScale = d3.scaleOrdinal()
        .domain(Object.keys(types))
        .range([
            "#7AC74C", "#EE8130", "#6390F0", "#A6B91A", "#A8A77A", "#A33EA1",
            "#F7D02C", "#E2BF65", "#D685AD", "#C22E28", "#F95587", "#B6A136",
            "#735797", "#96D9D6", "#6F35FC", "#705746", "#B7B7CE", "#A98FF3"
        ]);

    
    const sizeScale = d3.scaleSqrt()
        .domain([0, d3.max(nodes, d => d.value || 1)])
        .range([5, 20]);

    
    
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).distance(20).strength(0.8))
        .force("charge", d3.forceManyBody().strength(-30))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide(d => sizeScale(d.value || 1) + 5));

    
        
    const svg = d3.select("#graph")
        .append("svg")
        .attr("width", width )
        .attr("height", height )
        .call(d3.zoom()
            .scaleExtent([0.5, 3])
            .on("zoom", event => container.attr("transform", event.transform)))
        .append("g");

    

    const container = svg.append("g");

   
    const link = container.selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .style("stroke", "#aaa");

 
    const node = container.selectAll(".node")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("r", d => sizeScale(d.value || 1))
        .style("fill", d => {
            if (d.depth === 0) {
               
                return "red";
            } else if (d.depth === 1) {
              
                const parentColor1 = colorScale(d.data.name);
                return d3.color(parentColor1).brighter(0.4).formatHex();
            } else if (d.depth === 2) {
               
                return colorScale(d.parent.data.name);
            } else {
                return "#ddd"; 
            }
        })
        .call(drag(simulation))
        .on("mouseover", (event, d) => {
            let tooltipText = "";
        
          
            if (d.depth === 0) {
                tooltipText = `<b>${d.data.name}</b><br>Total Pokémon: ${d.value}`;
            } else if (d.depth === 1) {
                tooltipText = `<b>${d.data.name}</b><br>Pokémon Count: ${d.data.children ? d.data.children.length : 0}`;
            } else if (d.depth === 2) {
                tooltipText = `<b>${d.data.name}</b><br>Type: ${d.parent.data.name}`;
            }
        
            d3.select(".tooltip").transition()
                .duration(200)
                .style("opacity", 0.9);
            d3.select(".tooltip").html(tooltipText)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
            d3.select(".tooltip").transition()
                .duration(500)
                .style("opacity", 0);
        })
        .on("click", (event, d) => {
            if (d.depth === 1) {
                const typeName = d.data.name;
                const typeColor = colorScale(d.data.name); // Get the color of the selected type
                const pokemons = data.filter(pokemon => pokemon["Type 1"] === typeName);
                createBarChart(typeName, pokemons, typeColor); // Pass typeColor to the bar chart
            }
        });


    simulation.on("tick", () => {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("cx", d => d.x)
            .attr("cy", d => d.y);
    });


    function drag(simulation) {
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.5).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }
}

d3.csv("Pokemon.csv").then(data => {
    pokemonDAG(data);
});



// Function to create the bar chart
function createBarChart(typeName, pokemons, typeColor) {
    // Clear the previous bar chart
    d3.select("#barchart").select("svg").remove();

    // Set dimensions for the bar chart
    const margin = { top: 20, right: 50, bottom: 100, left: 30 },
        width = 1400 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // Create SVG container for the bar chart
    const svg = d3.select("#barchart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Extract data for bar chart
    const data = pokemons.map(pokemon => ({
        name: pokemon["Name"],
        total: +pokemon["Total"]
    }));

    // Set scales
    const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.total)])
        .nice()
        .range([height, 0]);

    // Add axes
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", "10px");

    svg.append("g")
        .call(d3.axisLeft(y));

        svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.total))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.total))
        .style("fill", typeColor) // Use the color passed from DAG
        .on("mouseover", function (event, d) {
            d3.select(".tooltip")
                .style("opacity", 0.9)
                .html(`<b>${d.name}</b><br>Total: ${d.total}`)
                .style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", function () {
            d3.select(".tooltip").style("opacity", 0);
        });
}




// URL for json data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });

  // Initializes the page with a default plot
function init() {
  
  // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
    d3.json(url).then((data) => {  
  
      let names = data.names;

        names.forEach((id) => {
          console.log(id);

          dropdownMenu.append("option").text(id).property("value",id);
        });

      let firstSample = names[0];

      console.log(firstSample);

      buildBar(firstSample);
      buildBubble(firstSample);
      buildMeta(firstSample);
  });
};

  // Bar chart
function buildBar(sampleData) {

  d3.json(url).then((data) => {
  
    let sampleShown = data.samples;
    let value = sampleShown.filter(result => result.id == sampleData);
    let valueShown = value[0];
  
    let otu_ids = valueShown.otu_ids;
    let otu_labels = valueShown.otu_labels;
    let sample_values = valueShown.sample_values;

    console.log(otu_ids,otu_labels,sample_values);  
  
    let trace1 = {
      x:sample_values.slice(0,10).reverse(),
      y:otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
      text:otu_labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    };
  
    let layout = {
      title: "Top 10 OTUs Found"
    };

    Plotly.newPlot("bar", [trace1], layout);
  })};
  
  
  
    // Bubble chart
function buildBubble(sampleData) {
  
  d3.json(url).then((data) => {
  
    let sampleShown = data.samples;
    let value = sampleShown.filter(result => result.id == sampleData);
    let valueShown = value[0];
  
    let otu_ids = valueShown.otu_ids;
    let otu_labels = valueShown.otu_labels;
    let sample_values = valueShown.sample_values;

    console.log(otu_ids,otu_labels,sample_values);
  
    let trace2 = {
      x:otu_ids,
      y:sample_values,
      text:otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    };
  
    let layout = {
      title: 'Bacteria in Each Sample',
      showlegend: false,
      xaxis: {title: "OTU ID"},
    };
        
    Plotly.newPlot("bubble", [trace2], layout);
  
  });
};

// Metadata
function buildMeta(sampleData) {

  d3.json(url).then((data) => {
  
    let sampleMeta = data.metadata;
    let value = sampleMeta.filter(result => result.id == sampleData);
    console.log(value)
    let valueShown = value[0];

    d3.select("#sample-metadata").html("");

    Object.entries(valueShown).forEach(([key,value]) => {

      console.log (key, value);

      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
  });
};

function optionChanged(value){
  console.log(value);

  buildBar(value);
  buildBubble(value);
  buildMeta(value);

};

init();

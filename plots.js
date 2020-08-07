function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample)
    });
      
      // Load data on startup for 940
      var startupId = sampleNames[0];
      buildMetadata(startupId);
      buildCharts(startupId);
    }
)};

init();


function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text(["id: " + result.id]);
    PANEL.append("h6").text(["ethnicity: " + result.ethnicity]);
    PANEL.append("h6").text(["gender: " + result.gender]);
    PANEL.append("h6").text(["age: " + result.age]);
    PANEL.append("h6").text(["location: " + result.location]);
    PANEL.append("h6").text(["bbtype: " + result.bbtype]);
    PANEL.append("h6").text(["wfreq: " + result.wfreq]);
  });
}



//data for Charts
function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var filter = samples.filter(object => object.id.toString() === sample);
      var result = filter[0];
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;

     //Bar Chart
      var trace = {
          x: sample_values.slice(0, 10).reverse(),
          y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h"
      };
      var data = [trace];
      var layout = {
         title: 'Top 10',
         margin: { l: 100, r: 100, t: 100, b: 100 }
      };
      Plotly.newPlot("bar", data, layout);


      // bubble chart

      var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          color: otu_ids,
          size: sample_values
        }
      };
      
      var data = [trace1];
      var layout = {
        showlegend: false,
      };
      
      Plotly.newPlot('bubble', data, layout);

  });
}
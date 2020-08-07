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
      PANEL.append("h6").text("ID - " + result.id);
      PANEL.append("h6").text("Ethnicity - " + result.ethnicity);
      PANEL.append("h6").text("Gender - " + result.gender);
      PANEL.append("h6").text("Age - " + result.age);
      PANEL.append("h6").text("Location - " + result.location);
      PANEL.append("h6").text("BBTYPE - " + result.bbtype);
      PANEL.append("h6").text("WFREQ - " + result.wfreq);
    
    
    
    });
//Build Charts
function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var filter = samples.filter(object => object.id.toString() === sample);
      var result = filter[0];
      var sample_values = result.sample_values;
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var gaugeValue = resultArray[0];



      //Bubble Chart
      var trace1 = {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: 'markers',
          marker: {
              color: otu_ids,
              size: sample_values,

          }
      };
      var data = [trace1];
      var layout = {
          showlegend: false,
          xaxis: {title: "OTU ID"},
          margin: { t: 30 }
      };
      Plotly.newPlot("bubble", data, layout);

      //Bar Chart
      var trace2 = {
          x: sample_values.slice(0, 10).reverse(),
          y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          name: "Greek",
          type: "bar",
          orientation: "h"
      };
      var data = [trace2];
      var layout = {
         margin: { l: 100, r: 100, t: 100, b: 100 }
      };
      Plotly.newPlot("bar", data, layout);

      //Gauge Chart
      var trace3 = {
          domain: { x: [0, 1], y: [0, 1] },
          title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
          type: "indicator",
          mode: "gauge+number",
          value: gaugeValue.wfreq,
          gauge: {
            axis: { range: [0, 10], tickwidth: 1, tickcolor: "darkblue" },
            steps: [
              {range: [0, 1], color: "#F7F7EF"},
              {range: [1, 2], color: "#EFEFE9"},
              {range: [2, 3], color: "#D8EEEA"},
              {range: [3, 4], color: "#B6F0E6"},
              {range: [4, 5], color: "#3CE3C4"},
              {range: [5, 6], color: "#70CAE5"},
              {range: [6, 7], color: "#20B2DE"},
              {range: [7, 8], color: "#5D77E0"},
              {range: [8, 9], color: "#011B83"},
              {range: [9, 10], color: "#FCFC04"}
            ]}
        };
      var data = [trace3];
      var layout = {
        width: 600, 
        height: 500, 
        margin: { t: 0, b: 0 },
        font: { color: "darkblue", family: "Arial" }
            };
      Plotly.newPlot('gauge', data, layout);
  });
}
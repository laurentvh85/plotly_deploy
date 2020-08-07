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





    var trace = {
      x: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita", "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
      y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
      type: "bar"
     };
     var data = [trace];
     var layout = {
      title: "'Bar' Chart",
      xaxis: { title: "Drinks"},
      yaxis: { title: "% of Drinks Ordered"}
     };
     Plotly.newPlot("plotArea", data, layout);
  
  }
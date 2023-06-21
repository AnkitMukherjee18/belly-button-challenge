// Import JSON file
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
  let sampleNames = data.names;
  let sampleMetadata = data.metadata;
  let samples = data.samples;
  let sampleNumber = 940;
  let resultsArray = samples.filter((sampleObj) => sampleObj.id == sampleNumber);

  let firstResult = resultsArray[0];

  let otu_labels = firstResult.otu_labels;
  let otu_ids = firstResult.otu_ids;
  let sample_values = firstResult.sample_values;

  // Initialize the dashboard at start up
  function initializeDashboard() {
    let dropDownMenu = d3.select("#selDataset");

    sampleNames.forEach((name) => {
      dropDownMenu.append("option").text(name).property("value", name);
    });

    let sampleOne = sampleNames[0];

    // Log the value of sampleOne
    console.log(sampleOne);

    // Build the initial plots
    updateDashboard(sampleOne);
    selectedSample(sampleOne);
    barChartData(sampleOne);
    gaugeChartData(sampleOne);
    bubbleChartData(sampleOne);
  }

  // Function that updates dashboard when sample is changed
  function optionChanged(value) {
    // Log the new value
    console.log(value);

    // Build the updated plots
    updateDashboard(value);
    selectedSample(value);
    barChartData(value);
    gaugeChartData(value);
    bubbleChartData(value);
  }

  function updateDashboard(sample) {
    let metadataContainer = document.getElementById("sample-metadata");
    let metadataHtml = "";
  
    let selectedMetadata = sampleMetadata.find(
      (metadataObj) => metadataObj.id == sample
    );
  
    if (selectedMetadata) {
      Object.entries(selectedMetadata).forEach(([key, value]) => {
        metadataHtml += `<p><b>${key}: </b>${value}</p>`;
      });
  
      metadataContainer.innerHTML = metadataHtml;
    }
  
    // Retrieve the selected sample data
    let selectedSample = samples.find((sampleObj) => sampleObj.id == sample);
  
    if (selectedSample) {
      otu_labels = selectedSample.otu_labels;
      otu_ids = selectedSample.otu_ids;
      sample_values = selectedSample.sample_values;

// Create the Bar Chart
let barChartData = [
  {
    x: sample_values.slice(0, 10).reverse(),
    y: otu_ids
      .slice(0, 10)
      .map((id) => `OTU ${id}`)
      .reverse(),
    text: otu_labels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h",
  },
];

let barLayout = {
  title: "Top 10 OTUs Present",
  height: 500,
};

Plotly.newPlot("bar", barChartData, barLayout);

// Create Bubble Chart
let bubbleChartData = [
  {
    x: otu_ids,
    y: sample_values,
    mode: "markers",
    marker: {
      color: otu_ids,
      size: sample_values,
      colorscale: "Earth",
    },
    text: otu_labels,
  },
];

let bubbleLayout = {
  title: "Samples of Bacteria",
  xaxis: { title: "OTU IDs" },
  yaxis: { title: "Sample Values" },
  height: 600,
  width: 1300,
};

Plotly.newPlot("bubble", bubbleChartData, bubbleLayout);

 // Create a Gauge Chart
 let gaugeChartData = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: selectedMetadata.wfreq || 0,
    title: { text: "Belly Button scrubs per week", font: { size: 24 } },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
      axis: { range: [null, 9] },
      bar: { color: "black" },
      steps: [
        { range: [0, 1], color: "white" },
        { range: [1, 2], color: "white" },
        { range: [2, 3], color: "lightyellow" },
        { range: [3, 4], color: "lightyellow" },
        { range: [4, 5], color: "yellow" },
        { range: [5, 6], color: "yellow" },
        { range: [6, 7], color: "lightgreen" },
        { range: [7, 8], color: "lightgreen" },
        { range: [8, 9], color: "green" },
      ],
    },
  },
];

let gaugeLayout = {
  width: 500,
  height: 400,
  margin: { t: 25, r: 25, l: 25, b: 25 },
  paper_bgcolor: "lavender",
  font: { color: "darkblue", family: "Arial" },
};

Plotly.newPlot("gauge", gaugeChartData, gaugeLayout);

    }
  }

  // Call the initialize function
  initializeDashboard();
});

